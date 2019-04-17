class Mantenimiento{
    
    guardaReporte(){
        
        var txtReporte = document.getElementById("txtReporte");
        
        firebase.auth().onAuthStateChanged(user =>{
            if(user){
                firebase.database().ref("Buzon/").once('value', function(snapshot) {
                    var xId = snapshot.numChildren() + 1; 
                    console.log("index: " +xId);
                    firebase.database().ref("Buzon/"+xId).set({
                        estado: "Abierto",
                        idUsuario: user.email,                    
                        etiqueta: "Mantenimiento",
                        reporte: txtReporte.value
                    });
                });
            }else
                alert("Usuario no reconocido");
        });
        
    }
    
    traeMisReportes(){
        firebase.auth().onAuthStateChanged(user =>{
            if(user){
                var mantenimiento = new Mantenimiento();
                mantenimiento.traeDudas(user.email, "Asignado"); 
            }else
                alert("Usuario no reconocido");
        });
    }
    
    traeDudas(usr, estado){
        
        console.log("traeDudas: "+" usuario: " +usr+" estado: "+estado);
        
        let mantenimiento = new Mantenimiento();
        var arrayDudas = [];
        
        firebase.database().ref("Buzon").on("value", function(querySnapshot) {
            
          mantenimiento.limpiar();
          arrayDudas = [];
          
          querySnapshot.forEach((duda) =>{
              
                var newDuda = duda.val();
                
                var dudaObj = {
                    id: duda.key,
                    reporte: newDuda.reporte,
                    idUsuario: newDuda.idUsuario,
                    usuarioAsignado: newDuda.usuarioAsignado,
                    estado: newDuda.estado,
                    etiqueta: newDuda.etiqueta
                  };
                  
                    if(dudaObj.etiqueta === "Mantenimiento" && !(dudaObj.reporte === undefined)){
                        //los de mantenimiento (gerente y programador) reciben las dudas con un reporte definido 
                            if(dudaObj.estado === "Mantenimiento" && dudaObj.usuarioAsignado === usr){
                                //Para traer misReportes deben estar asignados a mi y tener estado matenimiento
                                arrayDudas.push(dudaObj);
                            }else
                                if(dudaObj.estado === estado && usr === "Gerente de Mantenimiento"){
                                    //Siendo gerente de mantenimiento puedo traer los reportes con estado abierto-mantenimiento(asigno), en proceso-solucionado(terminar)
                                    arrayDudas.push(dudaObj);
                                }
                    }
           });
           
           mantenimiento.imprimeDudas(arrayDudas, usr, estado);
           
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });
    }
    
    limpiar(){
        var d = document.getElementById("contenedorDudas");
        while (d.hasChildNodes())
        d.removeChild(d.firstChild);
    }
    
    imprimeDudas(array, usr, est){
        
        console.log("hol");
        console.log(array);
        
        var arrayDuda = array;
        let mantenimiento = new Mantenimiento();
        
        //-------------DISEÑO-------------
        var totalRegistros = arrayDuda.length;
        var noSumar;
        if(totalRegistros === 1 || totalRegistros === 0){
            noSumar = 0;
        }else{
            noSumar = 130/(totalRegistros-1);
        }
        var bande = 12;
        //--------------------------------
        
        for(let i = 0; i<arrayDuda.length; i++){
            
            var conteFaqs = document.getElementById("contenedorDudas");
            var divDuda = document.createElement("div");
            
            //-------------DISEÑO-------------
                divDuda.style.border = "rgb("+bande+",144,12) 3px solid";
                divDuda.style.backgroundColor = "rgba("+bande+",144,12,0.66)";
                
                bande = bande + noSumar;
            //--------------------------------
            
            conteFaqs.appendChild(divDuda);
            
            
            if(arrayDuda[i].estado === "Mantenimiento" && arrayDuda[i].usuarioAsignado === usr){
                //Para traer misReportes deben estar asignados a mi y tener estado matenimiento
                //A mis reportes les pondre un campo para poner como solucione el problema y un boton para guardar los cambios
                
                divDuda.innerHTML = "<p>"+arrayDuda[i].reporte+"</p>";
                
                
                var txtSolucion = document.createElement("input");
                var btnGSolucion = document.createElement("input");
                
                
                txtSolucion.type="text";
                btnGSolucion.type="button";
                txtSolucion.id = "div"+i;
                
                txtSolucion.placeholder = "Escribe aqui como solucionaste el problema";
                btnGSolucion.value="GUARDA CAMBIOS";
                
                btnGSolucion.onclick = function(){
                    var solu = document.getElementById("div"+i);
                    mantenimiento.modificaEnProceso(arrayDuda[i].id, solu);
                };
                
                conteFaqs.insertBefore(txtSolucion, divDuda.nextSibling);
                conteFaqs.insertBefore(btnGSolucion, txtSolucion.nextSibling);
                
            }else
                if(arrayDuda[i].estado === "En Proceso" && "Gerente de Mantenimiento" === usr){
                    //Siendo gerente de mantenimiento puedo traigo los reportes con estado en proceso-solucionado(terminar)
                    //para aceptar o rechazar la solucion pongo 2 botones
                    
                    divDuda.innerHTML = "<p>"+arrayDuda[i].reporte+"</p>";
                    
                    var btnAcepta = document.createElement("input");
                    var btnRechaza = document.createElement("input");
                    
                    btnAcepta.type="button";
                    btnRechaza.type="button";
                    
                    btnAcepta.value="ACEPTAR"
                    btnRechaza.value="RECHAZAR"
                    
                    btnAcepta.onclick = function(){
                        firebase.database().ref("Buzon/"+arrayDuda[i].id+"/estado").set("Solucionado");
                    };
                    
                    btnRechaza.onclick = function(){
                        firebase.database().ref("Buzon/"+arrayDuda[i].id+"/estado").set("Mantenimiento");
                    };
                    
                    conteFaqs.insertBefore(btnAcepta, divDuda.nextSibling);
                    conteFaqs.insertBefore(btnRechaza, divDuda.nextSibling);
                    
                }else
                        if(arrayDuda[i].usuarioAsignado === undefined && "Gerente de Mantenimiento" === usr){
                            //Siendo gerente de mantenimiento puedo traigo los reportes que no tienen ingenierosAsignador para asignarles uno cambiando tambien el estado a mantenimiento
                            //para asignarlos pongo botones con el nombre de los programadores, mas un boton para asignarmelo a mi
                            
                            divDuda.innerHTML = "<p>"+arrayDuda[i].reporte+"</p>";
                            
                            var btnProgUno = document.createElement("input");
                            var btnProgDos = document.createElement("input");
                            var btnProgTres = document.createElement("input");
                            var btnYo = document.createElement("input");
                            
                            btnProgUno.type = "button";
                            btnProgDos.type = "button";
                            btnProgTres.type = "button";
                            btnYo.type = "button";
                            
                            btnProgUno.value = "CONSUELO";
                            btnProgDos.value = "DANIEL";
                            btnProgTres.value = "ZENELY";
                            btnYo.value = "YO";
                            
                            //-----EVENTO ON CLICK A BOTONES-----
                                btnProgUno.addEventListener("click", function(){
                                    mantenimiento.asignaUsuario(arrayDuda[i].id, "consuelo@kep.com");
                                });
                                btnProgDos.addEventListener("click", function(){
                                    mantenimiento.asignaUsuario(arrayDuda[i].id, "daniel@kep.com");
                                });
                                btnProgTres.addEventListener("click", function(){
                                    mantenimiento.asignaUsuario(arrayDuda[i].id, "zenely@kep.com");
                                });
                                btnYo.addEventListener("click", function(){
                                    mantenimiento.asignaUsuario(arrayDuda[i].id, "gerente_mantenimiento@kep.com");
                                });
                            //-------------------------------
                            
                            conteFaqs.appendChild(btnProgUno);
                            conteFaqs.appendChild(btnProgDos);
                            conteFaqs.appendChild(btnProgTres);
                            conteFaqs.appendChild(btnYo);
                        }
                    
        }
   }
   
    modificaEnProceso(id, solucion){
        firebase.database().ref("Buzon/"+id+"/respuesta").set(solucion.value);
        firebase.database().ref("Buzon/"+id+"/estado").set("En Proceso");
    }
    
    abreReporte(id, reporte, etiqueta){
        firebase.database().ref("Buzon/"+id+"/reporte").set(reporte);
        firebase.database().ref("Buzon/"+id+"/estado").set("Abierto");
        firebase.database().ref("Buzon/"+id+"/etiqueta").set(etiqueta);
    }
    
    asignaUsuario(id, usr){
        firebase.database().ref("Buzon/"+id+"/usuarioAsignado").set(usr);
        firebase.database().ref("Buzon/"+id+"/estado").set("Mantenimiento");
    }
    
    traeReportesAbiertos(){
        firebase.auth().onAuthStateChanged(user =>{
            if(user){
                var mantenimiento = new Mantenimiento();
                if(user.email === "gerente_mantenimiento@kep.com"){
                    mantenimiento.traeDudas("Gerente de Mantenimiento", "Abierto");
                }
            }else
                //El usuario no esta autentificado
                alert("Usuario no reconocido");
        });
    }
}
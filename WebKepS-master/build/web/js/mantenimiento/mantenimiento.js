class Mantenimiento{
    
    guardaReporte(){
        
        var txtReporte = document.getElementById("txtReporte");
        
        if(txtReporte.value === ""){
            alert("Escribe un reporte");
        }else{
            firebase.auth().onAuthStateChanged(user =>{
            if(user){
                firebase.database().ref("Buzon/").once('value', function(snapshot) {
                    var xId = snapshot.numChildren() + 1; 
                    firebase.database().ref("Buzon/"+xId).set({
                        estado: "Abierto",
                        idUsuario: user.email,                    
                        etiqueta: "Mantenimiento",
                        reporte: txtReporte.value
                    });
                }).then(refDoc =>{
                    alert("Registro Exitoso");
                }).catch(error=>{
                    alert("Algo fallo");
                    console.log("mantenimiento.js | guardaReporte: "+error);
                });
            }else
                alert("Usuario no reconocido");
            });
        }
        
    }
    
    traeMisReportes(){
        var user = firebase.auth().currentUser;
        if (user) {
            var mantenimiento = new Mantenimiento();
            mantenimiento.traeDudas(user.email, "Mantenimiento"); 
        } else {
            console.log("mantenimiento.js | traeMisReportes: "+"No existe el usuario");
        }
    }
    
    traeDudas(usr, estado){
        firebase.database().ref("Buzon").off();
        
        let mantenimiento = new Mantenimiento();
        var arrayDudas = [];
        
        firebase.database().ref("Buzon").on("value", function(querySnapshot) {
            
          mantenimiento.limpiar();
          arrayDudas = [];
          
          querySnapshot.forEach((duda) =>{
              
                var newDuda = duda.val();
                
                var dudaObj = {
                    id: duda.key,
                    duda: newDuda.duda,
                    estado: newDuda.estado,
                    etiqueta: newDuda.etiqueta,
                    idUsuario: newDuda.idUsuario,
                    reporte: newDuda.reporte,
                    respuesta: newDuda.respuesta,
                    usuarioAsignado: newDuda.usuarioAsignado
                };
                  
                    if(!(dudaObj.reporte === undefined)){
                        //los de mantenimiento (gerente y programador) reciben las dudas con un reporte definido 
                            if(dudaObj.estado === "Mantenimiento" && dudaObj.usuarioAsignado === usr){
                                //Para traer misReportes deben estar asignados a mi y tener estado matenimiento
                                arrayDudas.push(dudaObj);
                            }else
                                if(dudaObj.estado === estado && usr === "Gerente de Mantenimiento" && !(dudaObj.etiqueta === "Soporte")){
                                    //Siendo gerente de mantenimiento puedo traer los reportes con estado abierto-mantenimiento(asigno), en proceso-solucionado(terminar)
                                    arrayDudas.push(dudaObj);
                                }
                    }else
                        if(dudaObj.etiqueta === "Ticket" && dudaObj.estado === estado && usr === "Gerente de Mantenimiento"){
                            //si viene de soporte y el usuario asignado es mantenimiento
                            //Esto es para tickets
                            arrayDudas.push(dudaObj);
                        }
                        if(dudaObj.estado === "Cerrado" && usr === "No importa"){
                            arrayDudas.push(dudaObj);
                        }
           });
           
           mantenimiento.imprimeDudas(arrayDudas, usr, estado);
           
        }, function (errorObject) {
            console.log("mantenimiento.js | traeDudas: "+errorObject.code);
        });
    }
    
    limpiar(){
        var d = document.getElementById("contenedorDudas");
        while (d.hasChildNodes())
        d.removeChild(d.firstChild);
    }
    
    imprimeDudas(array, usr, est){
        
        var arrayDuda = array;
        let mantenimiento = new Mantenimiento();
        
        //-------------DISEÑO-------------
        
        var totalRegistros = arrayDuda.length;
        var noSumar;
        if(totalRegistros === 1 || totalRegistros === 0){
            noSumar = 0;
        }else{
            noSumar = 132/(totalRegistros-1);
        }
        var bande = 0;
        //--------------------------------
        
        for(let i = 0; i<arrayDuda.length; i++){
            
            var conteFaqs = document.getElementById("contenedorDudas");
            var divDuda = document.createElement("div");
            
            //-------------DISEÑO-------------
                divDuda.style.border = "rgb("+bande+",0,132) 3px solid";
                divDuda.style.backgroundColor = "rgba("+bande+",0,132,0.66)";
                
                bande = bande + noSumar;
            //------------------------------
            
            
            if(arrayDuda[i].estado === "Mantenimiento" && arrayDuda[i].usuarioAsignado === usr){
                //Para traer misReportes deben estar asignados a mi y tener estado matenimiento
                //A mis reportes les pondre un campo para poner como solucione el problema y un boton para guardar los cambios
                conteFaqs.appendChild(divDuda);
                divDuda.innerHTML = "<p class='repoTxt'>"+arrayDuda[i].reporte+"</p>";
                
                var txtSolucion = document.createElement("input");
                var btnGSolucion = document.createElement("input");
                
                txtSolucion.type="text";
                btnGSolucion.type="button";
                txtSolucion.id = "div"+i;
                
                txtSolucion.className = "txtSolucion";
                btnGSolucion.className= "btnSolucion";
                
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
                    var divSolu = document.createElement("div");
                    conteFaqs.appendChild(divDuda);
                    conteFaqs.appendChild(divSolu);
                    divDuda.innerHTML = "<p class='repoTxt'>"+arrayDuda[i].reporte+"</p>";
                    divSolu.innerHTML = "<p class='soluTxt'>"+arrayDuda[i].respuesta+"</p>";
                    
                    var btnAcepta = document.createElement("input");
                    var btnRechaza = document.createElement("input");
                    
                    btnAcepta.type="button";
                    btnRechaza.type="button";
                    
                    btnAcepta.value="ACEPTAR";
                    btnRechaza.value="RECHAZAR";
                    
                    btnAcepta.className="btnRes";
                    btnRechaza.className="btnRes";
                    
                    btnAcepta.onclick = function(){
                        firebase.database().ref("Buzon/"+arrayDuda[i].id+"/estado").set("Solucionado").catch(error =>{
                            console.log("mantenimiento.js | imprimeDudas: "+error);
                        });
                    };
                    
                    btnRechaza.onclick = function(){
                        firebase.database().ref("Buzon/"+arrayDuda[i].id+"/estado").set("Mantenimiento").catch(error =>{
                            console.log("mantenimiento.js | imprimeDudas: "+error);
                        });
                    };
                    
                    conteFaqs.insertBefore(btnAcepta, divSolu.nextSibling);
                    conteFaqs.insertBefore(btnRechaza, divSolu.nextSibling);
                    
                }else
                    if(arrayDuda[i].usuarioAsignado === undefined && "Gerente de Mantenimiento" === usr){
                        //Siendo gerente de mantenimiento puedo traigo los reportes que no tienen ingenierosAsignador para asignarles uno cambiando tambien el estado a mantenimiento
                        //para asignarlos pongo botones con el nombre de los programadores, mas un boton para asignarmelo a mi
                        conteFaqs.appendChild(divDuda);
                        divDuda.innerHTML = "<p class='repoTxt'>"+arrayDuda[i].reporte+"</p>";

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
                        
                        btnProgUno.className = "btnPersona";
                        btnProgDos.className = "btnPersona";
                        btnProgTres.className = "btnPersona";
                        btnYo.className = "btnPersona";
                        
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
                    }else
                        if(arrayDuda[i].etiqueta === "Ticket" && arrayDuda[i].estado === "Asignado" && usr === "Gerente de Mantenimiento"){
                            //Siendo gerente de mantenimiento puedo traigo los reportes que no tienen ingenierosAsignador para asignarles uno cambiando tambien el estado a mantenimiento
                            //para asignarlos pongo botones con el nombre de los programadores, mas un boton para asignarmelo a mi
                            //esto es para tickets
                            conteFaqs.appendChild(divDuda);
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
                        }else
                            if(arrayDuda[i].estado === est && usr === "No importa"){
                                    var divExpe = document.createElement("div");
                                        divExpe.innerHTML = "<p> <b> Estado: </b>"+arrayDuda[i].estado+"</p>"+
                                            "<hr style='border: hsla("+bande+",100%,47%,.6) .5px solid'>"+
                                            "<p> <b> Etiqueta: </b>"+arrayDuda.etiqueta+"</p>"+
                                            "<hr style='border: hsla("+bande+",100%,47%,.6) .5px solid'>"+
                                            "<p> <b> Usuario: </b>"+arrayDuda[i].idUsuario+"</p>"+
                                            "<hr style='border: hsla("+bande+",100%,47%,.6) .5px solid'>"+
                                            "<p> <b> Reporte: </b>"+arrayDuda[i].reporte+"</p>"+
                                            "<hr style='border: hsla("+bande+",100%,47%,.6) .5px solid'>"+
                                            "<p> <b> Solución: </b>"+arrayDuda[i].respuesta+"</p>"+
                                            "<hr style='border: hsla("+bande+",100%,47%,.6) .5px solid'>"+
                                            "<p> <b> Encargado: </b>"+arrayDuda[i].usuarioAsignado+"</p>"+
                                            "<hr style='border: hsla("+bande+",100%,47%,.6) .5px solid'>";   
                                        conteFaqs.appendChild(divExpe);                                    
                            }
                    
        }
   }
   
    modificaEnProceso(id, solucion){
        if(solucion.value === ""){
            alert("Escribe como solucionaste el problema");
        }else{
            firebase.database().ref("Buzon/"+id+"/respuesta").set(solucion.value);
            firebase.database().ref("Buzon/"+id+"/estado").set("En Proceso");
        }
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
        var user = firebase.auth().currentUser;
        if (user) {
            var mantenimiento = new Mantenimiento();
            if(user.email === "gerente_mantenimiento@kep.com"){
                mantenimiento.traeDudas("Gerente de Mantenimiento", "Abierto");
            }
        } else {
            console.log("mantenimiento.js | traeMisReportes: "+"No existe el usuario");
        }
    }
    
    traeTickets(){
        var user = firebase.auth().currentUser;
        if (user) {
            var mantenimiento = new Mantenimiento();
            if(user.email === "gerente_mantenimiento@kep.com"){
                mantenimiento.traeDudas("Gerente de Mantenimiento", "Asignado");
            }
        } else {
            console.log("mantenimiento.js | traeMisReportes: "+"No existe el usuario");
        }
    }
    
    traeExpediente(){
        var mantenimiento = new Mantenimiento();
        mantenimiento.traeDudas("No importa", "Cerrado");
    }
}
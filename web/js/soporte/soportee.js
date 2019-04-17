class Soporte{
    
    traeDudas(usr, estado){
        
        console.log("traeDudas: "+" usuario: " +usr+" estado: "+estado);
        
        let soporte = new Soporte();
        var arrayDudas = [];
        
        firebase.database().ref("Buzon").on("value", function(querySnapshot) {
            
          soporte.limpiar();
          arrayDudas = [];
          
          querySnapshot.forEach((duda) =>{
              
                var newDuda = duda.val();
                
                var dudaObj = {
                    id: duda.key,
                    duda: newDuda.duda,
                    reporte: newDuda.reporte,
                    idUsuario: newDuda.idUsuario,
                    usuarioAsignado: newDuda.usuarioAsignado,
                    estado: newDuda.estado,
                    etiqueta: newDuda.etiqueta
                  };
                  
                    if(dudaObj.etiqueta === "Soporte" && !(dudaObj.reporte === undefined)){
                        //los de soporte (gerente e ingeniero) reciben las dudas con un reporte definido por el operador
                            if(dudaObj.estado === "Asignado" && dudaObj.usuarioAsignado === usr){
                                //Para traer misReportes deben estar asignados a mi y tener estado asignado
                                arrayDudas.push(dudaObj);
                            }else
                                if(dudaObj.estado === estado && usr === "Gerente de Soporte"){
                                    //Siendo gerente de sopote puedo traer los reportes con estado abierto parar asignarlo y solucionado para cerrarlo
                                    arrayDudas.push(dudaObj);
                                }
                    }else
                        if(dudaObj.estado === undefined && usr === "operador" ){
                            //los operadores reciben los reportes sin estado, ya que ellos abren el reporte
                            arrayDudas.push(dudaObj);
                        }
                  
           });
           
           soporte.imprimeDudas(arrayDudas, usr, estado);
           
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });
    }
    
    imprimeDudas(array, usr, est){
        
        var arrayDuda = array;
        let soporte = new Soporte();
        
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
            
            
            if(arrayDuda[i].estado === "Asignado" && arrayDuda[i].usuarioAsignado === usr){
                //Para traer misReportes deben estar asignados a mi y tener estado asignado
                //A mis reportes les pondre un campo para poner como solucione el problema y un boton para guardar los cambios
                
                divDuda.innerHTML = "<p>"+arrayDuda[i].reporte+"</p>";
                
                var txtSolucion = document.createElement("input");
                var btnGSolucion = document.createElement("input");
                
                txtSolucion.type="text";
                btnGSolucion.type="button";
                
                txtSolucion.placeholder = "Escribe aqui como solucionaste el problema";
                btnGSolucion.value="GUARDA CAMBIOS";
                
                btnGSolucion.onclick = function(){
                    soporte.modificaSolucion(arrayDuda[i].id, txtSolucion);
                };
                
                conteFaqs.insertBefore(txtSolucion, divDuda.nextSibling);
                conteFaqs.insertBefore(btnGSolucion, txtSolucion.nextSibling);
                
            }else
                if(arrayDuda[i].estado === "Solucionado" && "Gerente de Soporte" === usr){
                    //Siendo gerente de sopote puedo traigo los reportes solucionados para cerrarlos
                    //para aceptar o rechazar la solucion pongo 2 botones
                    
                    divDuda.innerHTML = "<p>"+arrayDuda[i].reporte+"</p>";
                    
                    var btnAcepta = document.createElement("input");
                    var btnRechaza = document.createElement("input");
                    
                    btnAcepta.type="button";
                    btnRechaza.type="button";
                    
                    btnAcepta.value="ACEPTAR"
                    btnRechaza.value="RECHAZAR"
                    
                    btnAcepta.onclick = function(){
                        firebase.database().ref("Buzon/"+arrayDuda[i].id+"/estado").set("Cerrado");
                    };
                    
                    btnRechaza.onclick = function(){
                        firebase.database().ref("Buzon/"+arrayDuda[i].id+"/estado").set("Asignado");
                    };
                    
                    conteFaqs.insertBefore(btnAcepta, divDuda.nextSibling);
                    conteFaqs.insertBefore(btnRechaza, divDuda.nextSibling);
                    
                }else
                    if(usr === "operador"){
                        
                        divDuda.innerHTML = "<p>"+arrayDuda[i].duda+"</p>";
                        
                        //----------------TRAYENDO CAMPOS PARA REPORTE--------------------
                        var txtEstado = document.getElementById("txtEstado");
                        var txtDuda = document.getElementById("txtDuda");
                        var txtIdUsuario = document.getElementById("txtIdUsuario");
                        var txtRespuesta = document.getElementById("txtRespuesta");
                        var txtEncargado = document.getElementById("txtEncargado");
                        var txtReporte = document.getElementById("txtReporte");
                        var btnGuardaReporte = document.getElementById("btnGuardaReporte");
                        //----------------------------------------------------------------
                        
                        //-----EVENTO ON CLICK A DIV-----
                            divDuda.addEventListener("click", function(){
                                txtEstado.disabled = true;
                                txtDuda.value = arrayDuda[i].duda;
                                txtDuda.disabled = true;
                                txtIdUsuario.value = arrayDuda[i].idUsuario;
                                txtIdUsuario.disabled = true;
                                txtRespuesta.disabled = true;
                                txtEncargado.disabled = true;

                                btnGuardaReporte.onclick = function(){
                                    soporte.abreReporte(arrayDuda[i].id, txtReporte.value, "Soporte");
                                };
                                
                            });
                        //-------------------------------
                        
                    }else
                        if(arrayDuda[i].usuarioAsignado === undefined && "Gerente de Soporte" === usr){
                            //Siendo gerente de sopote puedo traigo los reportes que no tienen ingenierosAsignador para asignarles uno
                            //para asignarlos pongo botones con el nombre de los ingenieros, mas un boton para asignarmelo a mi
                            
                            divDuda.innerHTML = "<p>"+arrayDuda[i].reporte+"</p>";
                            
                            var btnProgUno = document.createElement("input");
                            var btnProgDos = document.createElement("input");
                            var btnProgTres = document.createElement("input");
                            var btnYo = document.createElement("input");
                            
                            btnProgUno.type = "button";
                            btnProgDos.type = "button";
                            btnProgTres.type = "button";
                            btnYo.type = "button";
                            
                            btnProgUno.value = "AYLIN";
                            btnProgDos.value = "CAROLINA";
                            btnProgTres.value = "LUCIA";
                            btnYo.value = "YO";
                            
                            //-----EVENTO ON CLICK A BOTONES-----
                                btnProgUno.addEventListener("click", function(){
                                    soporte.asignaUsuario(arrayDuda[i].id, "aylin@kep.com");
                                });
                                btnProgDos.addEventListener("click", function(){
                                    soporte.asignaUsuario(arrayDuda[i].id, "carolina@kep.com");
                                });
                                btnProgTres.addEventListener("click", function(){
                                    soporte.asignaUsuario(arrayDuda[i].id, "lucia@kep.com");
                                });
                                btnYo.addEventListener("click", function(){
                                    soporte.asignaUsuario(arrayDuda[i].id, "gerente_soporte@kep.com");
                                });
                            //-------------------------------
                            
                            conteFaqs.appendChild(btnProgUno);
                            conteFaqs.appendChild(btnProgDos);
                            conteFaqs.appendChild(btnProgTres);
                            conteFaqs.appendChild(btnYo);
                        }
        }
   }
   
    modificaSolucion(id, solucion){
        firebase.database().ref("Buzon/"+id+"/respuesta").set(solucion.value);
        firebase.database().ref("Buzon/"+id+"/estado").set("Solucionado");
    }
    
    abreReporte(id, reporte, etiqueta){
        firebase.database().ref("Buzon/"+id+"/reporte").set(reporte);
        firebase.database().ref("Buzon/"+id+"/estado").set("Abierto");
        firebase.database().ref("Buzon/"+id+"/etiqueta").set(etiqueta);
    }
    
    asignaUsuario(id, usr){
        firebase.database().ref("Buzon/"+id+"/usuarioAsignado").set(usr);
        firebase.database().ref("Buzon/"+id+"/estado").set("Asignado");
    }

    limpiar(){
        var d = document.getElementById("contenedorDudas");
        while (d.hasChildNodes())
        d.removeChild(d.firstChild);
    }
    
    traeMisReportes(){
        firebase.auth().onAuthStateChanged(user =>{
            if(user){
                var soporte = new Soporte();
                soporte.traeDudas(user.email, "Asignado"); 
            }else
                alert("Usuario no reconocido");
        });
    }
    
    traeReportesAbiertos(){
        firebase.auth().onAuthStateChanged(user =>{
            if(user){
                var soporte = new Soporte();
                if(user.email === "gerente_soporte@kep.com"){
                    soporte.traeDudas("Gerente de Soporte", "Abierto");
                }
            }else
                //El usuario no esta autentificado
                alert("Usuario no reconocido");
        });
    }
    
}
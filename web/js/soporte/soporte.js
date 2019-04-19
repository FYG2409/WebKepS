class Soporte{
    
    traeDudas(usr, estado){
        firebase.database().ref("Buzon").off();
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
                    estado: newDuda.estado,
                    etiqueta: newDuda.etiqueta,
                    idUsuario: newDuda.idUsuario,
                    reporte: newDuda.reporte,
                    respuesta: newDuda.respuesta,
                    usuarioAsignado: newDuda.usuarioAsignado
                  };
                                    
                    if(dudaObj.etiqueta === "Soporte" && !(dudaObj.reporte === undefined)){
                        //los de soporte (gerente e ingeniero) reciben las dudas con un reporte definido por el operador
                            if(dudaObj.estado === estado && dudaObj.usuarioAsignado === usr){
                                //Para traer misReportes deben estar asignados a mi y tener estado asignado
                                arrayDudas.push(dudaObj);
                            }else
                                if(dudaObj.estado === estado && usr === "Gerente de Soporte"){
                                    //Siendo gerente de sopote puedo traer los reportes con estado abierto parar asignarlo y solucionado para cerrarlo
                                    arrayDudas.push(dudaObj);
                                }
                    }else
                        if(dudaObj.etiqueta === estado && usr === "Gerente de Soporte" && !(dudaObj.estado === "Cerrado")){
                            //si viene de soporte y el usuario asignado es mantenimiento
                            //Esto es para tickets
                            arrayDudas.push(dudaObj);
                        }
                        if(dudaObj.estado === undefined && usr === "operador" ){
                            //los operadores reciben los reportes sin estado, ya que ellos abren el reporte
                            arrayDudas.push(dudaObj);
                        }
                        if(dudaObj.estado === "Cerrado" && usr === "No importa"){
                            arrayDudas.push(dudaObj);
                        }
                  
            });
           
            soporte.imprimeDudas(arrayDudas, usr, estado);
           
        }, function (errorObject) {
            console.log("soporte.js | traeDudas: "+errorObject.code);
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
            //--------------------------------
            
            
            if(arrayDuda[i].estado === "Asignado" && arrayDuda[i].usuarioAsignado === usr){
                //Para traer misReportes deben estar asignados a mi y tener estado asignado
                //A mis reportes les pondre un campo para poner como solucione el problema y un boton para guardar los cambios
                conteFaqs.appendChild(divDuda);
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
                    soporte.modificaSolucion(arrayDuda[i].id, solu);
                };
                
                conteFaqs.insertBefore(txtSolucion, divDuda.nextSibling);
                conteFaqs.insertBefore(btnGSolucion, txtSolucion.nextSibling);
                
            }else
                if((arrayDuda[i].estado === "Solucionado" && "Gerente de Soporte" === usr && arrayDuda[i].etiqueta === "Soporte")){
                    //Siendo gerente de sopote puedo traigo los reportes solucionados para cerrarlos
                    //BOTON REPORTES POR VALIDAR
                    //para aceptar o rechazar la solucion pongo 2 botones
                    //la segunda validacion, es decir despues del || es para tickets
                    var divSolu = document.createElement("div");
                    conteFaqs.appendChild(divDuda);
                    conteFaqs.appendChild(divSolu);
                    divDuda.innerHTML = "<p>"+arrayDuda[i].reporte+"</p>";
                    divSolu.innerHTML = "<p>"+arrayDuda[i].respuesta+"</p>";
                    
                    var btnAcepta = document.createElement("input");
                    var btnRechaza = document.createElement("input");
                    
                    btnAcepta.type="button";
                    btnRechaza.type="button";
                    
                    btnAcepta.value="ACEPTAR";
                    btnRechaza.value="RECHAZAR";
                    
                    btnAcepta.onclick = function(){
                        firebase.database().ref("Buzon/"+arrayDuda[i].id+"/estado").set("Cerrado");
                    };
                    
                    btnRechaza.onclick = function(){
                        firebase.database().ref("Buzon/"+arrayDuda[i].id+"/estado").set("Asignado");
                    };
                    
                    conteFaqs.insertBefore(btnAcepta, divSolu.nextSibling);
                    conteFaqs.insertBefore(btnRechaza, divSolu.nextSibling);
                    
                }else
                    if(usr === "operador"){
                        //BOTON PARA CREAR NUEVO REPORTE
                        conteFaqs.appendChild(divDuda);
                        divDuda.innerHTML = "<p>"+arrayDuda[i].duda+"</p>";
                        
                        divDuda.addEventListener("click", function(){
                            soporte.abreReporte(arrayDuda[i].id, "Soporte", arrayDuda[i].duda, arrayDuda[i].idUsuario);
                        });
                                
                    }else
                        if(usr === "Gerente de Soporte" && arrayDuda[i].usuarioAsignado === undefined && arrayDuda[i].estado === "Abierto"){
                            //Siendo gerente de soporte traigo los reportes que no tienen ingeniero asignado para asignarles uno, asignarmelos a mi o mandarlo a mantenimiento
                            //BOTON REPORTES
                            conteFaqs.appendChild(divDuda);
                            divDuda.innerHTML = "<p>"+arrayDuda[i].reporte+"</p>";
                            
                            var btnUno = document.createElement("input");
                            var btnDos = document.createElement("input");
                            var btnTres = document.createElement("input");
                            var btnYo = document.createElement("input");
                            var btnMantenimiento = document.createElement("input");
                            
                            btnUno.type = "button";
                            btnDos.type = "button";
                            btnTres.type = "button";
                            btnYo.type = "button";
                            btnMantenimiento.type = "button";
                            
                            btnUno.value = "AYLIN";
                            btnDos.value = "CAROLINA";
                            btnTres.value = "LUCIA";
                            btnYo.value = "YO";
                            btnMantenimiento.value = "MANTENIMIENTO";
                            
                            //-----EVENTO ON CLICK A BOTONES-----
                                btnUno.addEventListener("click", function(){
                                    soporte.asignaUsuario(arrayDuda[i].id, "aylin@kep.com");
                                });
                                btnDos.addEventListener("click", function(){
                                    soporte.asignaUsuario(arrayDuda[i].id, "carolina@kep.com");
                                });
                                btnTres.addEventListener("click", function(){
                                    soporte.asignaUsuario(arrayDuda[i].id, "lucia@kep.com");
                                });
                                btnYo.addEventListener("click", function(){
                                    soporte.asignaUsuario(arrayDuda[i].id, "gerente_soporte@kep.com");
                                });
                                btnMantenimiento.addEventListener("click", function(){
                                    soporte.iniciaTicket(arrayDuda[i].id);
                                });
                            //-------------------------------
                            
                            conteFaqs.appendChild(btnUno);
                            conteFaqs.appendChild(btnDos);
                            conteFaqs.appendChild(btnTres);
                            conteFaqs.appendChild(btnYo);
                            conteFaqs.appendChild(btnMantenimiento);
                        }else
                            if(arrayDuda[i].estado === est && usr === "No importa"){
                                var divExpe = document.createElement("div");
                                divExpe.innerHTML = "<p> duda: "+arrayDuda[i].duda+"</p>"+
                                                    "<p> estado: "+arrayDuda[i].estado+"</p>"+
                                                    "<p> etiqueta: "+arrayDuda[i].etiqueta+"</p>"+
                                                    "<p> idUsuario: "+arrayDuda[i].idUsuario+"</p>"+
                                                    "<p> reporte: "+arrayDuda[i].reporte+"</p>"+
                                                    "<p> respuesta: "+arrayDuda[i].respuesta+"</p>"+
                                                    "<p> usuarioAsignado: "+arrayDuda[i].usuarioAsignado+"</p>";
                                conteFaqs.appendChild(divExpe);                                    
                            }
                            if(arrayDuda[i].etiqueta === est && usr === "Gerente de Soporte"){
                                var divExpe = document.createElement("div");
                                divExpe.innerHTML = "<p> duda: "+arrayDuda[i].duda+"</p>"+
                                                    "<p> estado: "+arrayDuda[i].estado+"</p>"+
                                                    "<p> etiqueta: "+arrayDuda[i].etiqueta+"</p>"+
                                                    "<p> idUsuario: "+arrayDuda[i].idUsuario+"</p>"+
                                                    "<p> reporte: "+arrayDuda[i].reporte+"</p>"+
                                                    "<p> respuesta: "+arrayDuda[i].respuesta+"</p>"+
                                                    "<p> usuarioAsignado: "+arrayDuda[i].usuarioAsignado+"</p>";
                                conteFaqs.appendChild(divExpe);
                                
                                if(arrayDuda[i].estado === "Solucionado"){
                                    var btnAcepta = document.createElement("input");
                                    var btnRechaza = document.createElement("input");

                                    btnAcepta.type="button";
                                    btnRechaza.type="button";

                                    btnAcepta.value="ACEPTAR";
                                    btnRechaza.value="RECHAZAR";

                                    btnAcepta.onclick = function(){
                                        firebase.database().ref("Buzon/"+arrayDuda[i].id+"/estado").set("Cerrado").catch(error =>{
                                            console.log("soporte.js | imprimeDudas: "+error);
                                        });
                                    };

                                    btnRechaza.onclick = function(){
                                        firebase.database().ref("Buzon/"+arrayDuda[i].id+"/estado").set("Asignado").catch(error =>{
                                            console.log("soporte.js | imprimeDudas: "+error);
                                        });
                                    };

                                    conteFaqs.insertBefore(btnAcepta, divExpe.nextSibling);
                                    conteFaqs.insertBefore(btnRechaza, divExpe.nextSibling);
                                }
                            }
        }
   }
   
    modificaSolucion(id, solucion){
        if(solucion.value === ""){
            alert("Escribe como solucionaste el problema");
        }else{
            firebase.database().ref("Buzon/"+id+"/respuesta").set(solucion.value);
            firebase.database().ref("Buzon/"+id+"/estado").set("Solucionado");
        }
    }
    
    abreReporte(id, etiqueta, duda, idUsr){
        //----------------TRAYENDO CAMPOS PARA REPORTE--------------------
            var txtEstado = document.getElementById("txtEstado");
            var txtDuda = document.getElementById("txtDuda");
            var txtIdUsuario = document.getElementById("txtIdUsuario");
            var txtRespuesta = document.getElementById("txtRespuesta");
            var txtEncargado = document.getElementById("txtEncargado");
            var txtReporte = document.getElementById("txtReporte");
            var btnGuardaReporte = document.getElementById("btnGuardaReporte");
        //----------------------------------------------------------------
        
            txtEstado.disabled = true;
            txtDuda.value = duda;
            txtDuda.disabled = true;
            txtIdUsuario.value = idUsr;
            txtIdUsuario.disabled = true;
            txtRespuesta.disabled = true;
            txtEncargado.disabled = true;
            btnGuardaReporte.disabled = false;
            txtReporte.disabled = false;
            
            btnGuardaReporte.onclick = function(){
                console.log("El id fue: "+id);
                firebase.database().ref("Buzon/"+id+"/reporte").set(txtReporte.value);
                firebase.database().ref("Buzon/"+id+"/estado").set("Abierto");
                firebase.database().ref("Buzon/"+id+"/etiqueta").set(etiqueta);
                
                txtEstado.value = "";
                txtDuda.value = "";
                txtIdUsuario.value = "";
                txtRespuesta.value = "";
                txtEncargado.value = "";
                txtReporte.value = "";
                btnGuardaReporte.disabled = true;
                txtReporte.disabled = true;
                
                btnGuardaReporte.onclick = null;
            };
    }
    
    asignaUsuario(id, usr){
        firebase.database().ref("Buzon/"+id+"/usuarioAsignado").set(usr);
        firebase.database().ref("Buzon/"+id+"/estado").set("Asignado");
    }
    
    iniciaTicket(id){
        firebase.database().ref("Buzon/"+id+"/etiqueta").set("Ticket");
        firebase.database().ref("Buzon/"+id+"/estado").set("Asignado");
    }

    limpiar(){
        var d = document.getElementById("contenedorDudas");
        while (d.hasChildNodes())
        d.removeChild(d.firstChild);
    }
    
    traeMisReportes(){
        var user = firebase.auth().currentUser;
        if (user) {
            var soporte = new Soporte();
            soporte.traeDudas(user.email, "Asignado"); 
        } else {
            console.log("soporte.js | traeMisReportes: "+"No existe el usuario");
        }
    }
    
    traeReportesAbiertos(){
        var user = firebase.auth().currentUser;
        if (user) {
            var soporte = new Soporte();
                if(user.email === "gerente_soporte@kep.com"){
                    soporte.traeDudas("Gerente de Soporte", "Abierto");
                }
        } else {
            console.log("soporte.js | traeReportesAbiertos: "+"No existe el usuario");
        }
    }
    
    traeTickets(){
        var user = firebase.auth().currentUser;
        if (user) {
                if(user.email === "gerente_soporte@kep.com"){
                    console.log("Hay x2");
                    var soporte = new Soporte();
                    soporte.traeDudas("Gerente de Soporte", "Ticket");
                }
        } else {
            console.log("soporte.js | traeTickets: "+"No existe el usuario");
        }
    }
    
    traeExpediente(){
        var soporte = new Soporte();
        soporte.traeDudas("No importa", "Cerrado");
    }
    
}
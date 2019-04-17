class Mantenimiento{
    
    imprimeDudas(array, usr, est){
        console.log(array);
        var arrayDuda = [];
        arrayDuda = array;
        var totalRegistros = arrayDuda.length;
        var noSumar;
        if(totalRegistros === 1 || totalRegistros === 0){
            noSumar = 0;
        }else{
            noSumar = 130/(totalRegistros-1);
        }
        var bande = 12;
        
        //TRAYENDO CAMPOS
        var txtEstado = document.getElementById("txtEstado");
        var txtDuda = document.getElementById("txtDuda");
        var txtIdUsuario = document.getElementById("txtIdUsuario");
        var txtRespuesta = document.getElementById("txtRespuesta");
        var txtEncargado = document.getElementById("txtEncargado");
        var btnGuardaReporte = document.getElementById("btnGuardaReporte");
       
        for(let i = 0; i<arrayDuda.length; i++){
            //aquí
            var divDuda = document.createElement("div");
            var txtReporte = document.getElementById("txtReporte");
            
            
            //-------------DISEÑO-------------
                divDuda.style.border = "rgb("+bande+",144,12) 3px solid";
                divDuda.style.backgroundColor = "rgba("+bande+",144,12,0.66)";
                
                bande = bande + noSumar;
            //--------------------------------
            
            var conteFaqs = document.getElementById("contenedorDudas");
            conteFaqs.appendChild(divDuda);
            
            if(arrayDuda[i].estado === "Asignado" && arrayDuda[i].usuarioAsignado === usr){
                divDuda.innerHTML = "<p>"+arrayDuda[i].reporte+"</p>";
                
                var txtSolucion = document.createElement("input");
                var btnGSolucion = document.createElement("input");
                txtSolucion.type="text";
                btnGSolucion.type="button";
                txtSolucion.placeholder = "Escribe aqui como solucionaste el problema";
                btnGSolucion.value="GUARDA CAMBIOS";
                txtSolucion.id = "div"+i;
                
                
                btnGSolucion.addEventListener("click", function(){
                    let soporte = new Soporte();
                    soporte.modificaSolucion(arrayDuda[i].id,i,usr);
                    console.log("mi usuario es: "+usr);
                });
                
                
                conteFaqs.insertBefore(txtSolucion, divDuda.nextSibling);
                conteFaqs.insertBefore(btnGSolucion, txtSolucion.nextSibling);
            }else
                if(arrayDuda[i].estado === "Solucionado" && "Gerente de Soporte" === usr){
                    console.log("FEIK");
                    divDuda.innerHTML = "<p>"+arrayDuda[i].reporte+"</p>";
                    var btnAcepta = document.createElement("input");
                    var btnRechaza = document.createElement("input");
                    btnAcepta.type="button";
                    btnRechaza.type="button";
                    btnAcepta.value="ACEPTAR"
                    btnRechaza.value="RECHAZAR"
                    
                    btnAcepta.addEventListener("click", function(){
                        firebase.database().ref("Buzon/"+arrayDuda[i].id+"/estado").set("Cerrado");
                    });
                    
                    btnRechaza.addEventListener("click", function(){
                        firebase.database().ref("Buzon/"+arrayDuda[i].id+"/estado").set("Asignado");
                    });
                    conteFaqs.insertBefore(btnAcepta, divDuda.nextSibling);
                    conteFaqs.insertBefore(btnRechaza, divDuda.nextSibling);
                }else
                    if(usr === "operador"){
                        divDuda.innerHTML = "<p>"+arrayDuda[i].duda+"</p>";
                        
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
                                let soporte = new Soporte();
                                soporte.modificaReporte(arrayDuda[i].id,txtReporte.value, "Soporte");
                                };
                            });

                        //-------------------------------
                    }else
                        if(arrayDuda[i].usuarioAsignado === undefined){
                            divDuda.innerHTML = "<p>"+arrayDuda[i].reporte+"</p>";
                            
                            var btnProgUno = document.createElement("input");
                            var btnProgDos = document.createElement("input");
                            var btnProgTres = document.createElement("input");
                            var btnYo = document.createElement("input");
                            btnProgUno.type = "button";
                            btnProgDos.type = "button";
                            btnProgTres.type = "button";
                            btnYo.type = "button";
                            
                            if(usr === "Gerente de Soporte"){
                                btnProgUno.value = "Aylin";
                                btnProgDos.value = "Carolina";
                                btnProgTres.value = "Lucia";
                                btnYo.value = "YO";
                                //-----EVENTO ON CLICK A DIV-----
                                btnProgUno.addEventListener("click", function(){
                                    firebase.database().ref("Buzon/"+arrayDuda[i].id+"/usuarioAsignado").set("aylin@kep.com");
                                    firebase.database().ref("Buzon/"+arrayDuda[i].id+"/estado").set("Asignado");
                                });
                                btnProgDos.addEventListener("click", function(){
                                    firebase.database().ref("Buzon/"+arrayDuda[i].id+"/usuarioAsignado").set("carolina@kep.com");
                                    firebase.database().ref("Buzon/"+arrayDuda[i].id+"/estado").set("Asignado");
                                });
                                btnProgTres.addEventListener("click", function(){
                                    firebase.database().ref("Buzon/"+arrayDuda[i].id+"/usuarioAsignado").set("lucia@kep.com");
                                    firebase.database().ref("Buzon/"+arrayDuda[i].id+"/estado").set("Asignado");
                                });
                                btnYo.addEventListener("click", function(){
                                    firebase.database().ref("Buzon/"+arrayDuda[i].id+"/usuarioAsignado").set("gerente_soporte@kep.com");
                                    firebase.database().ref("Buzon/"+arrayDuda[i].id+"/estado").set("Asignado");
                                });
                            //-------------------------------
                            }else
                                if(usr === "Gerente de Mantenimiento"){
                                    btnProgUno.value = "Consuelo";
                                    btnProgDos.value = "Daniel";
                                    btnProgTres.value = "Zenely";
                                    btnYo.value = "YO";
                                    //-----EVENTO ON CLICK A DIV-----
                                    btnProgUno.addEventListener("click", function(){
                                        firebase.database().ref("Buzon/"+arrayDuda[i].id+"/usuarioAsignado").set("consuelo@kep.com");
                                        firebase.database().ref("Buzon/"+arrayDuda[i].id+"/estado").set("Mantenimiento");
                                    });
                                    btnProgDos.addEventListener("click", function(){
                                        firebase.database().ref("Buzon/"+arrayDuda[i].id+"/usuarioAsignado").set("daniel@kep.com");
                                        firebase.database().ref("Buzon/"+arrayDuda[i].id+"/estado").set("Mantenimiento");
                                    });
                                    btnProgTres.addEventListener("click", function(){
                                        firebase.database().ref("Buzon/"+arrayDuda[i].id+"/usuarioAsignado").set("zenely@kep.com");
                                        firebase.database().ref("Buzon/"+arrayDuda[i].id+"/estado").set("Mantenimiento");
                                    });
                                    btnYo.addEventListener("click", function(){
                                        firebase.database().ref("Buzon/"+arrayDuda[i].id+"/usuarioAsignado").set("gerente_mantenimiento@kep.com");
                                        firebase.database().ref("Buzon/"+arrayDuda[i].id+"/estado").set("Mantenimiento");
                                    });
                                //-------------------------------
                                }
                            

                            conteFaqs.appendChild(btnProgUno);
                            conteFaqs.appendChild(btnProgDos);
                            conteFaqs.appendChild(btnProgTres);
                            conteFaqs.appendChild(btnYo);
                        }


                }
            
   }
    
    
    traeDudas(usr, estado){
        console.log("Usuario: "+usr);
        let soporte = new Soporte();
        console.log("entre: "+usr+" Estado: "+estado);
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
                  if(!(dudaObj.estado === "Cerrado")){
                      if(dudaObj.etiqueta === "Soporte" && !(dudaObj.reporte === undefined)){
                            if(dudaObj.estado === estado && dudaObj.usuarioAsignado === usr){
                                arrayDudas.push(dudaObj);
                            }else
                                if(dudaObj.estado === estado && usr === "Gerente de Soporte"){
                                    arrayDudas.push(dudaObj);
                                }
                        }else
                            if(dudaObj.etiqueta === "Mantenimiento"){
                                if(dudaObj.estado === estado && usr === "Gerente de Mantenimiento"){
                                    arrayDudas.push(dudaObj);
                                }else
                                    if(dudaObj.estado === estado && dudaObj.usuarioAsignado === usr){
                                        arrayDudas.push(dudaObj);
                                    }
                            }else
                                if(usr === "operador" && dudaObj.estado === undefined){
                                    arrayDudas.push(dudaObj);
                                }
                  }
                
           });
           soporte.imprimeDudas(arrayDudas, usr, estado);
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });
    }
    
    limpiar(){
        var d = document.getElementById("contenedorDudas");
        while (d.hasChildNodes())
        d.removeChild(d.firstChild);
    }
    
    modificaReporte(id, reporte, etiqueta){
        firebase.database().ref("Buzon/"+id+"/reporte").set(reporte);
        firebase.database().ref("Buzon/"+id+"/estado").set("Abierto");
        firebase.database().ref("Buzon/"+id+"/etiqueta").set(etiqueta);
    }
    
    modificaSolucion(id, index, usr){
        var solucion = document.getElementById("div"+index);
        firebase.database().ref("Buzon/"+id+"/respuesta").set(solucion.value);
        if(usr === "gerente_soporte@kep.com" || usr === "aylin@kep.com" || usr === "carolina@kep.com" || usr === "lucia@kep.com"){
            firebase.database().ref("Buzon/"+id+"/estado").set("Solucionado");
        }else
            if(urs === "gerente_mantenimiento@kep.com"){
                firebase.database().ref("Buzon/"+id+"/estado").set("En proceso");
            }
        
    }
    
    traeMisReportes(){
        firebase.auth().onAuthStateChanged(user =>{
            if(user){
                var soporte = new Soporte();
                console.log("fyg: "+user.email);
                soporte.traeDudas(user.email, "Asignado"); 
            }else
                //El usuario no esta autentificado
                alert("Usuario no reconocido");
        });
    }
    
    guardaReporte(){
        
        var txtReporte = document.getElementById("txtReporte");
        
        
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
                });
            }else
                alert("Usuario no reconocido");
        });
    }
    
    traeReportes(){
        firebase.auth().onAuthStateChanged(user =>{
            if(user){
                var soporte = new Soporte();
                var usr;
                if(user.email === "gerente_soporte@kep.com"){
                    usr = "Gerente de Soporte";
                }else
                    if(user.email === "gerente_mantenimiento@kep.com"){
                       usr = "Gerente de Mantenimiento";
                    }
                soporte.traeDudas(usr, "Abierto");
                alert("usr: "+usr);
            }else
                //El usuario no esta autentificado
                alert("Usuario no reconocido");
        });
    }
}
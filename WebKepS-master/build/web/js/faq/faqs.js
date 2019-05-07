class Faq{
    
    traeDudas(usr, estado){
        firebase.database().ref("Buzon").off();
        
        let faq = new Faq();
        var arrayDudas = [];
        
        firebase.database().ref("Buzon").on("value", function(querySnapshot) {
            
          faq.limpiar();
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

                if(dudaObj.estado === "Cerrado" && usr === "No importa"){
                    arrayDudas.push(dudaObj);
                }
           });
           
           faq.imprimeDudas(arrayDudas, usr, estado);
           console.log("UUUU");
           console.log(arrayDudas);
        }, function (errorObject) {
            console.log("mantenimiento.js | traeDudas: "+errorObject.code);
        });
    }
    
    imprimeDudas(array, usr, est){
        
        var arrayDuda = array;
        let faq = new Faq();
        var colores = [];
        
        //-------------DISEÑO-------------
        
        var totalRegistros = arrayDuda.length;
        var noSumar;
        if(totalRegistros === 1 || totalRegistros === 0){
            noSumar = 0;
        }else{
            noSumar = 100/(totalRegistros-1);
        }
        var bande = 196;
        
        //--------------------------------
        
        for(let i = 0; i<arrayDuda.length; i++){
            
            var conteFaqs = document.getElementById("contenedorFaqs");
            
            if(arrayDuda[i].estado === est && usr === "No importa"){
                var divConte = document.createElement("div");
                var divDuda = document.createElement("div");
                divDuda.id = "div"+i;
                divConte.id = "divj"+i;
                divDuda.innerHTML = "<p>"+arrayDuda[i].duda+"</p>";
                
                conteFaqs.appendChild(divConte);
                divConte.appendChild(divDuda);
                
                //-------------DISEÑO-------------
                divDuda.style.border = "hsla("+bande+",100%,47%,.6) 3px solid";
                divDuda.style.backgroundColor = "hsla("+bande+",100%,47%,.6)";
                
                colores.push(bande);
                bande = bande + noSumar;
                //--------------------------------
                
                divDuda.className = "divPregunta";

                var a = 0;
                divConte.onclick = function(){
                    var DD = document.getElementById("divj"+i);
                    if(a === 0){
                        var D = document.getElementById("div"+i);
                        var divExpe = document.createElement("div");
                        divExpe.id = "divv"+i;
                        divExpe.innerHTML = "<p> <b> Estado: </b>"+arrayDuda[i].estado+"</p>"+
                                            "<hr style='border: hsla("+colores[i]+",100%,47%,.6) .5px solid'>"+
                                            "<p> <b> Etiqueta: </b>"+arrayDuda[i].etiqueta+"</p>"+
                                            "<hr style='border: hsla("+colores[i]+",100%,47%,.6) .5px solid'>"+
                                            "<p> <b> Usuario: </b>"+arrayDuda[i].idUsuario+"</p>"+
                                            "<hr style='border: hsla("+colores[i]+",100%,47%,.6) .5px solid'>"+
                                            "<p> <b> Reporte: </b>"+arrayDuda[i].reporte+"</p>"+
                                            "<hr style='border: hsla("+colores[i]+",100%,47%,.6) .5px solid'>"+
                                            "<p> <b> Solución: </b>"+arrayDuda[i].respuesta+"</p>"+
                                            "<hr style='border: hsla("+colores[i]+",100%,47%,.6) .5px solid'>"+
                                            "<p> <b> Encargado: </b>"+arrayDuda[i].usuarioAsignado+"</p>"+
                                            "<hr style='border: hsla("+colores[i]+",100%,47%,.6) .5px solid'>";                        
                        DD.insertBefore(divExpe, D.nextSibling);
                        a=1;
                    }else
                        if(a === 1){
                            var D = document.getElementById("divv"+i);
                            DD.removeChild(D);
                            a=0;
                        }
                };
                                    
            }     
        }
        console.log(colores);
   }
    
    imprimePreguntas(array){
        var arrayFaq = [];
        var colores = [];
        arrayFaq = array;
        
        var totalRegistros = arrayFaq.length;
        var noSumar;
        if(totalRegistros === 1 || totalRegistros === 0){
            noSumar = 0;
        }else{
            noSumar = 100/(totalRegistros-1);
        }
        var bande = 196;

        for(let i = 0; i<arrayFaq.length; i++){
            //aquí
            var divPregunta = document.createElement("div");
            var divRespuesta = document.createElement("div");
            var btnBorrar = document.createElement("input");
            var conte = document.createElement("div");
            
            btnBorrar.type = "button";
            btnBorrar.value = "ELIMINAR";
            conte.id = "conte"+i;
            
            divPregunta.className = "divPregunta";
            divRespuesta.className = "divRespuesta";
            btnBorrar.className = "btnBorrar";
            
            divPregunta.innerHTML = "<p>"+arrayFaq[i].pregunta+"</p>";
            divRespuesta.innerHTML = "<p>"+arrayFaq[i].respuesta+"</p>";
            
            
            
            //-------------DISEÑO-------------
            
                divPregunta.style.border = "hsla("+bande+",100%,47%,.6) 3px solid";
                divPregunta.style.backgroundColor = "hsla("+bande+",100%,47%,.6)";
                
                colores.push(bande);
                bande = bande + noSumar;
            //--------------------------------
            
            
            //-------------EVENTOS PARA BOTONES-------------
            let faq = new Faq();
            
            conte.ondblclick = function(){
                faq.cambiaVistaModificar(arrayFaq[i].idPregunta, i, arrayFaq[i].pregunta, arrayFaq[i].respuesta, colores[i]);
            };
            
            btnBorrar.addEventListener("click", function(){
               faq.borraPregunta(arrayFaq[i].idPregunta);               
            });
            
            //----------------------------------------------
            var conteFaqs = document.getElementById("contenedorFaqs");
            conteFaqs.appendChild(conte);
            conte.appendChild(divPregunta);
            conte.appendChild(divRespuesta);
            conte.appendChild(btnBorrar);
            
            
        }
            
   }
   
    borraPregunta(id){
       firebase.database().ref("FAQS/"+id).remove().catch(error =>{
            console.log("faq.js | borraPregunta: "+error);
        });
   }
   
    traePreguntas(){
        let faq = new Faq();
        var arrayFaq = [];
        firebase.database().ref("FAQS").off();
        firebase.database().ref("FAQS").on("value", function(querySnapshot) {
          faq.limpiar();
          arrayFaq = [];
          querySnapshot.forEach((faq) =>{
                var newFaq = faq.val();
                //desde aqui
                var faqObj = {
                    idPregunta: newFaq.idPregunta,
                    pregunta: newFaq.pregunta,
                    respuesta: newFaq.respuesta
                  };
                arrayFaq.push(faqObj);

           });
           faq.imprimePreguntas(arrayFaq);
           return arrayFaq;
        }, function (errorObject) {
            console.log("faq.js | traePreguntas: "+errorObject.code);
        });
            return arrayFaq;
    }
    
    limpiar(){
        var d = document.getElementById("contenedorFaqs");
        while (d.hasChildNodes())
        d.removeChild(d.firstChild);
    }
    
    guardaPregunta(){
        var txtnuevaPregunta = document.getElementById("txtnuevaPregunta").value;
        var txtnuevaRespuesta = document.getElementById("txtnuevaRespuesta").value;
        if(txtnuevaPregunta === "" || txtnuevaRespuesta === ""){
            alert("Tienes un campo vacio");
        }else{
            var xId = firebase.database().ref("FAQS/").push().getKey();
            firebase.database().ref("FAQS/"+xId).set({
                idPregunta: xId,
                pregunta: txtnuevaPregunta,
                respuesta: txtnuevaRespuesta
            }).then(refDoc =>{
                alert("Registro Exitoso");
            }).catch(error=>{
                alert("Algo fallo");
                console.log("faq.js | guardaPregunta: "+error);
            });
        }
    }
    
    cambiaVistaModificar(id, index, pregunta, respuesta, bande){
        //INICIANDO
        var d = document.getElementById("conte"+index);
        
        //LIMPIANDO
        while (d.hasChildNodes())
        d.removeChild(d.firstChild);
    
        //AÑADIENDO NUEVOS ELEMENTOS
        var nuevaPregunta = document.createElement("input");
        var nuevaRespuesta = document.createElement("input");
        var btnListo = document.createElement("input");
                
        
        nuevaPregunta.type = "text";
        nuevaRespuesta.type = "text";
        btnListo.type = "button";
        
        btnListo.className = "btnBorrar";
        
        btnListo.value = "GUARDAR CAMBIOS";
        
        nuevaPregunta.className = "txtNuevaPregunta";
        nuevaRespuesta.className = "txtNuevaRespuesta";
        nuevaPregunta.style.border = "hsla("+bande+",100%,47%,.6) 3px solid";
        
        nuevaPregunta.value = pregunta;
        nuevaRespuesta.value = respuesta;
        
        d.appendChild(nuevaPregunta);
        d.appendChild(nuevaRespuesta);
        d.appendChild(btnListo);
            
        btnListo.addEventListener("click", function(){
            let faq = new Faq();
            faq.modificaPregunta(nuevaPregunta.value, nuevaRespuesta.value, id);
        });
    }
    
    modificaPregunta(pregunta, respuesta, id){
        firebase.database().ref("FAQS/"+id).set({
            idPregunta: id,
            pregunta: pregunta,
            respuesta: respuesta
        }).then(refDoc =>{
                var faq = new Faq();
                faq.traePreguntas();
        }).catch(error=>{
            alert("Algo fallo");
            console.log("faq.js | modificaPregunta: "+error);
        });
    }
    
    traeExpediente(){
        var faq = new Faq();
        faq.traeDudas("No importa", "Cerrado");
    }
    
    
}




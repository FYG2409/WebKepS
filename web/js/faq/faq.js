class Faq{
    
    imprimePreguntas(array){
        var arrayFaq = [];
        arrayFaq = array;
        var totalRegistros = arrayFaq.length;
        var noSumar;
        if(totalRegistros === 1 || totalRegistros === 0){
            noSumar = 0;
        }else{
            noSumar = 132/(totalRegistros-1);
        }
        var bande = 0;

        for(let i = 0; i<arrayFaq.length; i++){
            //aquí
            var divPregunta = document.createElement("div");
            var divRespuesta = document.createElement("div");
            var btnBorrar = document.createElement("input");
            var btnModificar = document.createElement("input");
            var conte = document.createElement("div");
            
            btnBorrar.type = "button";
            btnModificar.type = "button";
            btnBorrar.value = "BORRAR";
            btnModificar.value = "MODIFICAR";
            conte.id = "conte"+i;
            
            divPregunta.innerHTML = "<p>"+arrayFaq[i].pregunta+"</p>";
            divRespuesta.innerHTML = "<p>"+arrayFaq[i].respuesta+"</p>";
            
            
            
            //-------------DISEÑO-------------
                divPregunta.style.border = "rgb("+bande+",0,132) 3px solid";
                divPregunta.style.backgroundColor = "rgba("+bande+",0,132,0.66)";
                
                bande = bande + noSumar;
            //--------------------------------
            
            
            //-------------EVENTOS PARA BOTONES-------------
            let faq = new Faq();
            btnBorrar.addEventListener("click", function(){
               faq.borraPregunta(arrayFaq[i].idPregunta);               
            });
            
            btnModificar.addEventListener("click", function(){
               faq.cambiaVistaModificar(arrayFaq[i].idPregunta, i, arrayFaq[i].pregunta, arrayFaq[i].respuesta);
            });
            
            //----------------------------------------------
            var conteFaqs = document.getElementById("contenedorFaqs");
            conteFaqs.appendChild(conte);
            conte.appendChild(divPregunta);
            conte.appendChild(divRespuesta);
            conte.appendChild(btnBorrar);
            conte.appendChild(btnModificar);
            
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
    
    cambiaVistaModificar(id, index, pregunta, respuesta){
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
        
        btnListo.value = "GUARDAR CAMBIOS";
        
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
        }).catch(error=>{
            alert("Algo fallo");
            console.log("faq.js | modificaPregunta: "+error);
        });
    }
}




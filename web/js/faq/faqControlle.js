var btnFaqs = document.getElementById("btnFaqs");
var btnGuardaFaq = document.getElementById("btnGuardaFaq");

btnFaqs.addEventListener("click", function(){
    var faq = new Faq();
    var arrayFaq = [];
    arrayFaq = faq.traePreguntas();
});

btnGuardaFaq.addEventListener("click", function(){
    var txtnuevaPregunta = document.getElementById("txtnuevaPregunta").value;
    var txtnuevaRespuesta = document.getElementById("txtnuevaRespuesta").value;
    var faq = new Faq();
    faq.guardaPregunta(txtnuevaPregunta, txtnuevaRespuesta);
});




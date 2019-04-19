var btnFaqs = document.getElementById("btnFaqs");
var btnGuardaFaq = document.getElementById("btnGuardaFaq");
var bodyE = document.getElementById("bodyE");

btnFaqs.addEventListener("click", function(){
    var faq = new Faq();
    faq.traePreguntas();
});

btnGuardaFaq.addEventListener("click", function(){
    var faq = new Faq();
    faq.guardaPregunta();
});

bodyE.onload = function(){
    var faq = new Faq();
    faq.traePreguntas();
};






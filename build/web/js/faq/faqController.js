var btnFaqs = document.getElementById("btnFaqs");
var btnGuardaFaq = document.getElementById("btnGuardaFaq");
var bodyE = document.getElementById("bodyE");
btnExpediente = document.getElementById("btnExpediente");
btnAñadir = document.getElementById("btnAñadir");


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

if(!(btnExpediente === null)){
    btnExpediente.addEventListener("click", function(){
        var faq = new Faq();
        faq.traeExpediente();
    });
}






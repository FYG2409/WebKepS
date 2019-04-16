var btnGuardaPersona = document.getElementById("btnGuardaPersona");
var btnTraeBuzon = document.getElementById("btnTraeBuzon");

btnTraeBuzon.addEventListener("click", function(){
    const persona = new Persona();
    persona.traeBuzon();
});
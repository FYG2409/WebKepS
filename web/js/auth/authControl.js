var btnIniciaSesion = document.getElementById("btnIniciaSesion");
var btnCierraSesion = document.getElementById("btnCierraSesion");


btnIniciaSesion.addEventListener("click", function(){
    var correo = document.getElementById("correo").value;
    var contra = document.getElementById("contra").value;
    const auth = new Autenticacion();
    auth.iniciaSesion(correo, contra);
});

btnCierraSesion.addEventListener("click", function(){
    const auth = new Autenticacion();
    auth.cerrarSesion();
});






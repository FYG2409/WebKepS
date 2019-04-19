btnMisReportes = document.getElementById("btnMisReportes");
btnReportes = document.getElementById("btnReportes");
btnPorValidar = document.getElementById("btnPorValidar");
btnTickets = document.getElementById("btnTickets");
btnExpediente = document.getElementById("btnExpediente");
btnReportesO = document.getElementById("btnReportesO");


if(!(btnReportesO === null)){
    btnReportesO.addEventListener("click", function(){
        var soporte = new Soporte();
        soporte.traeDudas("operador");
    });
}

if(!(btnMisReportes === null)){
    btnMisReportes.addEventListener("click", function(){
       var soporte = new Soporte();
       soporte.traeMisReportes();
    });
}

if(!(btnReportes === null)){
    btnReportes.addEventListener("click", function(){
        var soporte = new Soporte();
        soporte.traeReportesAbiertos();
    });
}

if(!(btnPorValidar === null)){
    btnPorValidar.addEventListener("click", function(){
        var soporte = new Soporte();
        soporte.traeDudas("Gerente de Soporte", "Solucionado");
    });
}

if(!(btnTickets === null)){
    btnTickets.addEventListener("click", function(){
        var soporte = new Soporte();
        soporte.traeTickets();
    });
}

if(!(btnExpediente === null)){
    btnExpediente.addEventListener("click", function(){
        var soporte = new Soporte();
        soporte.traeExpediente();
    });
}


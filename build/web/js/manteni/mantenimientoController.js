btnGuardaReporteM = document.getElementById("btnGuardaReporteM");
btnMisReportes = document.getElementById("btnMisReportes");
btnReportes = document.getElementById("btnReportes");
btnPorValidar = document.getElementById("btnPorValidar");
btnTickets = document.getElementById("btnTickets");
bodyGerenteM = document.getElementById("bodyGerenteM");
bodyProgramadorM = document.getElementById("bodyProgramadorM");


if(!(bodyGerenteM === null)){
    bodyGerenteM.onload = function(){
        var mantenimiento = new Mantenimiento();
        mantenimiento.traeReportesAbiertos();
    };
}

if(!(bodyProgramadorM === null)){
    bodyProgramadorM.onload = function(){
        var mantenimiento = new Mantenimiento();
        mantenimiento.traeMisReportes();
    };
}

if(!(btnGuardaReporteM === null)){
    btnGuardaReporteM.addEventListener("click", function(){
        var mantenimiento = new Mantenimiento();
        mantenimiento.guardaReporte();
    });
}

if(!(btnMisReportes === null)){
    btnMisReportes.addEventListener("click", function(){
       var mantenimiento = new Mantenimiento();
       mantenimiento.traeMisReportes();
    });
}

if(!(btnReportes === null)){
    btnReportes.addEventListener("click", function(){
        var mantenimiento = new Mantenimiento();
        mantenimiento.traeReportesAbiertos();
    });
}

if(!(btnPorValidar === null)){
    btnPorValidar.addEventListener("click", function(){
        var mantenimiento = new Mantenimiento();
        mantenimiento.traeDudas("Gerente de Mantenimiento", "En Proceso");
    });
}

if(!(btnTickets === null)){
    btnTickets.addEventListener("click", function(){
        var mantenimiento = new Mantenimiento();
        mantenimiento.traeTickets();
    });
}



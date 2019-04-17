btnMisReportes = document.getElementById("btnMisReportes");
btnReportes = document.getElementById("btnReportes");
bodyGerenteS = document.getElementById("bodyGerenteS");
bodyOperadorS = document.getElementById("bodyOperadorS");
btnPorValidar = document.getElementById("btnPorValidar");
bodyIngenieroS = document.getElementById("bodyIngenieroS");
btnGuardaReporteM = document.getElementById("btnGuardaReporteM");
bodyGerenteM = document.getElementById("bodyGerenteM");


if(!(bodyGerenteS === null)){
    bodyGerenteS.onload = function(){
        var soporte = new Soporte();
        soporte.traeDudas("Gerente de Soporte", "Abierto");
    };
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
       soporte.traeDudas("Gerente de Soporte", "Abierto");
    });
}

if(!(bodyOperadorS === null)){
    bodyOperadorS.onload = function(){
       var soporte = new Soporte();
       soporte.traeDudas("operador");
    };
}

if(!(btnPorValidar === null)){
    btnPorValidar.addEventListener("click", function(){
        var soporte = new Soporte();
        soporte.traeDudas("Gerente de Soporte", "Solucionado");
    });
}

if(!(bodyIngenieroS === null)){
    bodyIngenieroS.onload = function(){
        var soporte = new Soporte();
        soporte.traeMisReportes();
    };
}

if(!(btnGuardaReporteM === null)){
    btnGuardaReporteM.addEventListener("click", function(){
            var soporte = new Soporte();
            soporte.guardaReporte();
    });
}

if(!(bodyGerenteM === null)){
    bodyGerenteM.onload = function(){
        var soporte = new Soporte();
        soporte.traeDudas("Gerente de Mantenimiento", "Abierto");
    };
}

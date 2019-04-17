btnMisReportes = document.getElementById("btnMisReportes");
btnReportes = document.getElementById("btnReportes");
btnPorValidar = document.getElementById("btnPorValidar");
bodyGerenteS = document.getElementById("bodyGerenteS");
bodyOperadorS = document.getElementById("bodyOperadorS");
bodyIngenieroS = document.getElementById("bodyIngenieroS");


if(!(bodyGerenteS === null)){
    bodyGerenteS.onload = function(){
        var soporte = new Soporte();
        soporte.traeReportesAbiertos();
        //aqui
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
       soporte.traeReportesAbiertos();
       //aqui
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

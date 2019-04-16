
function redirige(email){
    var txtEmail = email;
    console.log(txtEmail);

    if(txtEmail === "clasificador@kep.com"){
        alert("Bienvenido Clasificador");
        //Intent intent = new Intent(this, ClasificarActivity.class);
        //startActivity(intent);
    }else
        if(txtEmail === "operador@kep.com"){
            alert("Bienvenido Operador");
            window.location.href = "html/Operador.html";
        }else
            if(txtEmail === "gerente_soporte@kep.com"){
                alert("Bienvenido Gerente de Soporte");
                window.location.href = "html/GerenteSoporte.html";
            }else
                if(txtEmail === "aylin@kep.com"){
                    alert("Bienvenido Ingeniero de Soporte");
                    window.location.href = "html/IngenieroSoporte.html";
                }else
                    if(txtEmail === "gerenteMantenimiento@kep.com"){
                        alert("Bienvenido Gerente de Mantenimiento");
                        //Intent intent = new Intent(this, MantenimientoActivity.class);
                        //intent.putExtra("tipoUsuario", "gerenteMantenimiento");
                        //startActivity(intent);
                    }else
                        if(txtEmail === "asesor@kep.com"){
                            alert("Bienvenido Asesor");
                            //Intent intent = new Intent(this, AsesoriaActivity.class);
                            //startActivity(intent);
                        }else
                            if(txtEmail === "editor@kep.com"){
                                alert("Bienvenido Editor");
                                window.location.href = "html/Editor.html";
                            }else
                                if(txtEmail === "carolina@kep.com"){
                                    alert("Bienvenido Ingeniero de Soporte");
                                    window.location.href = "html/IngenieroSoporte.html";
                                }else
                                    if(txtEmail === "lucia@kep.com"){
                                        alert("Bienvenido Ingeniero de Soporte");
                                        window.location.href = "html/IngenieroSoporte.html";
                                    }

}


function redirige(email){
    var txtEmail = email;
    console.log(txtEmail);

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
                if(txtEmail === "gerente_mantenimiento@kep.com"){
                    alert("Bienvenido Gerente de Mantenimiento");
                    window.location.href = "html/GerenteMantenimiento.html";
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
                            }else
                                if(txtEmail === "consuelo@kep.com"){
                                    alert("Bienvenido Programador")
                                    window.location.href = "html/Programador.html";
                                }else
                                    if(txtEmail === "daniel@kep.com"){
                                        alert("Bienvenido Programador")
                                        window.location.href = "html/Programador.html";
                                    }else
                                    if(txtEmail === "zenely@kep.com"){
                                        alert("Bienvenido Programador")
                                        window.location.href = "html/Programador.html";
                                    }

}

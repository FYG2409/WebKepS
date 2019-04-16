class Autenticacion{
    authEmailPass(email,password){
        
    }
    
    crearCuentaEmailPass(email, password){
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(result =>{
            //El usuario se registro
            result.user.sendEmailVerification().catch(error =>{
               console.log("autenticacion.js: "+error);
            });
            firebase.auth().signOut();
            alert("Por favor verifica tu correo");
        })
            .catch(error =>{
               console.log("autenticacion.js: "+error);
        });
    }
    
    iniciaSesion(email, password){
        firebase.auth().signInWithEmailAndPassword(email, password).then(result =>{
            //El usuario inicio correctamente
            alert("Sesion Iniciada");
        }).catch(error =>{
            console.log("autenticacion.js: "+error);
        });
    }
    
    cerrarSesion(){
        const user = firebase.auth().currentUser;
        if(user){
            //Si la sesion ya esta iniciada
            return firebase.auth().signOut().then(() =>{
                alert("Sesion Cerrada");
            }).catch(error =>{
               console.log("general.js: "+error); 
            });
        }
    }
    
}

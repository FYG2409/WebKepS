class Autenticacion{
    authEmailPass(email,password){
        
    }
    
    iniciaSesion(email, password){
        firebase.auth().signInWithEmailAndPassword(email, password).then(result =>{
            alert("Sesion Iniciada");
            redirige(email);
        }).catch(error =>{
            console.log("autenticacion.js: "+error);
        });
    }
    
    cerrarSesion(){
        var user = firebase.auth().currentUser;
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

//INICIALIZANDO FIREBASE
    firebase.initializeApp(varConfig);
    
//PARA DATABASE
    const database = firebase.database();
    
  
//OBSERVADOR DEL CAMBIO DE EN LA SESION
/*
firebase.auth().onAuthStateChanged(user =>{
    if(user){
        //El usuario esta autentificado
        alert("Usuario autentificado");
    }else
        //El usuario no esta autentificado
        alert("Usuario no autentificado");
});
*/
class Post{
    
    constructor(){
        this.db = firebase.firestore();        
    }
    
    crearPost(uid, autor, titulo, descripcion){
        return this.db.collection('posts').add({
            uid: uid,
            autor : autor,
            titulo: titulo,
            descripcion : descripcion
        })
        .then(refDoc =>{
            console.log('Id del post = > '+refDoc.id);
        }).catch(error=>{
            console.log("post.js: "+error);
        });
    }
    
    consultarTodosPost(){
        this.db.collection('post').get().then((querySnapshot) =>{
            querySnapshot.forEach((post) =>{
                console.log(post.data().titulo);
            });
        }).catch(error =>{
            console.log("post.js: "+error);
        });
    }
}
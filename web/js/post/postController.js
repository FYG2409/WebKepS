var btnGuarda = document.getElementById("btnGuarda");
var btnTodosLosPost = document.getElementById("btnTodosLosPost");

btnGuarda.addEventListener("click", function(){
    
    var autor = document.getElementById("autor").value;
    var titulo = document.getElementById("titulo").value;
    var descripcion = document.getElementById("descripcion").value;
    
    const user = firebase.auth().currentUser;
    
    const post = new Post();
    post.crearPost(user.uid, autor, titulo, descripcion);
});

btnTodosLosPost.addEventListener("click", function(){
    const post = new Post();
    post.consultarTodosPost();
});
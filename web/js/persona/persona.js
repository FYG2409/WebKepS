class Persona{
    
   traeBuzon(){
        firebase.database().ref("Buzon").on("value", function(querySnapshot) {
          querySnapshot.forEach((buzon) =>{
                console.log(buzon.key);
                var newBuzon = buzon.val();
                console.log(newBuzon.duda);
           });
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });
    }
    
}


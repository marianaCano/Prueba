//funcion de registo
function singUp(e){
    event.preventDefault();

    var username = document.getElementById("usuario").value;
    var pass = document.getElementById("contraseña").value;

    var user = {
        usuario: username,
        contraseña: pass,
    };
    
    var json = JSON.stringify(user);
    localStorage.setItem(username, json)
    console.log ("registrado")
    
    if(username == null){
       alert("ingrse un usuario")

     }else {
        alert("Se registró el usuario, ahora inicia sesión")
     }
    
}
//funcion de inicio
function loginFunc(e){
    event.preventDefault();
    
    var username = document.getElementById("usuario").value;
    var pass = document.getElementById("contraseña").value;
    var result = document.getElementById("result");

    var user = localStorage.getItem(username);
    var data = JSON.parse(user);
    console.log(data);

   if(user == null){
      result.innerHTML= "error, escriba un user valido";

   } else if  (username == data.usuario && pass == data.contraseña) {
     window.location.href="index.html";
   }else {
     result.innerHTML= "error";
   }
   
}
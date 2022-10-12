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
}

function loginFunc(e){
    event.preventDefault();
    
    var username = document.getElementById("usuario").value;
    var pass = document.getElementById("contraseña").value;
    var result = document.getElementById("result");
    var user = localStorage.getItem(username);
    var data = JSON.parse(user);
    console.log(data);

 
}
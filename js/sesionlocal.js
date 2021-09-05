//esta funcion se iniciara con el evento onload en cada html
window.onload = validarSesion();

function validarSesion(){
  //Verificamos si no hay sesiones permanentes
  if (!localStorage.getItem("sesionIniciada")) {
    //Si no hay sesiones permanentes se obtiene el tiempo actual para comparar
    //Con el tiempo de la sesion
    var tiempo = new Date().getTime();
    //Se obtiene el tiempo de la sesion
    var tiemposesion = localStorage.getItem("TiempoSesionPorPestaña");
    //si hay tiempo de sesion se procede a comparar
    if (tiemposesion) {
      console.log("Hay tiempo de sesion verificando tiempo")
      if (tiempo > tiemposesion) {
        //si el tiempo actual es mayor al tiempo de la sesion temporal
        //eliminamos la sesion y mandaremos alerta al usuario
        document.getElementById("InicioS").style.display = "block";
        document.getElementById("InfoU").style.display = "none";
        document.getElementById("reClient").style.display = "none";
        document.getElementById("history").style.display = "none";
        borrarDatosSesion();
        alert("Tiempo de sesion superado")
      }
      else{
        //si el tiempo actual es menor o igual se aumentaran otros 2 (o mas) minutos al tiempo
        //para así conseguir mantener la sesion activa
        //mostraremos el nombre del usuario durante esta sesion temporal
        console.log("aumentando tiempo de sesion ya que aun está activo en la pagina")
        localStorage.setItem("TiempoSesionPorPestaña",tiempo+1200000)
        document.getElementById("InicioS").style.display = 'none';
        document.getElementById("InfoU").style.display = "block";
        document.getElementById("reClient").style.display = "block";
        document.getElementById("history").style.display = "block";
        var usuario = obtenerDatosSesion();
        document.getElementById("lblUser").innerHTML = usuario.user || "USUARIO";
      }
    }
    else{
      //se borran los datos si es que no hay alguna sesion activa
      //esta verificacion se la hace para borrar los items que no se usan del localstorage
      console.log("Se borraran datos si no hay ninguna sesion activa")
      document.getElementById("InicioS").style.display="block";
      document.getElementById("InfoU").style.display="none";
        document.getElementById("reClient").style.display = "none";
        document.getElementById("history").style.display = "none";
      borrarDatosSesion();
    }
  }
  else{
    //si la sesion es activa de forma indefinida mostramos el nombre del usuario
    console.log("Sesion activa indefinidamente")
      document.getElementById("InicioS").style.display="none";
      document.getElementById("InfoU").style.display="block";
        document.getElementById("reClient").style.display = "block";
        document.getElementById("history").style.display = "block";
      var usuario = obtenerDatosSesion();
      document.getElementById("lblUser").innerHTML = usuario.user || "USUARIO";
  }
}

function obtenerDatosSesion(){
  //funcion que obtiene los datos del usuario logeado
    var Time = localStorage.getItem("DatosSesion");
    return JSON.parse(Time)||{};
}

function borrarDatosSesion (argument) {
  //Borra todos los datos que se usan para la verificacion de la sesion
    if (localStorage.getItem("sesionIniciada")) {
      localStorage.removeItem("sesionIniciada")
    }
    if (localStorage.getItem("TiempoSesionPorPestaña")) {
      localStorage.removeItem("TiempoSesionPorPestaña")
    }
    if (localStorage.getItem("DatosSesion")) {
      localStorage.removeItem("DatosSesion")
    }
}

function cerrarSesion (argument) {
  //cerrar sesion por medio del boton
  borrarDatosSesion();
  location.href="index.html";
}

//Estas validaciones se pueden hacer de una forma más sencilla con el uso de cookies


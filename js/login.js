////////////Funcion de Logeo/////////////////
function Login(e,object) {
	// e.preventDefault detiene el evento del submit del formulario para poder validar
	e.preventDefault();
	//obtenemos el formulario del objeto
	var form = object.form
	var usuario = {"user":"ADMIN","password":"ADMIMN","email":"ADMIN"};
	if (form.username.value != "admin" || form.password.value != "admin") {
		//consultamos al local storage nuestra "db" obteniendo todos los datos de todos los usarios
		usuarios = obtenerUsuarios()||{};
		//La siguiente linea nos sirve para confirmar si un correo es valido para un usuario
		// usuarios[valor] nos permitirá saber si existe el usuario por medio del username
		//la siguiente concatenacion nos hace validar el primer valor en llegar
		//si llega algun valor que no sea false o null la variable lo tomara
		//si ningun valor llega le asignamos el valor "false"
		usuario = existeCorreo(form.username.value) || usuarios[form.username.value] || false;
		if (!usuario) { 
			//en dado caso que no se encuentre un usuario/correo valido se devuelve el siguiente mensaje
			alert("Usuario no registrado en la base de datos"); 
			return false;
		}
		//una vez encontrado el usuario se valida que la contraseña sea la correcta
		if (form.password.value != usuario.password) {
			alert("Contraseña incorrecta");
			return false;
		}
	}

	//Se verifica si me mantendrá la sesion permanente
	if (form.checkbox.checked) {
		//si se mantiene la sesion guardamos esa informacion en el localStorage
		localStorage.setItem("sesionIniciada",true)
		//Si hay algun tiempo de sesion temporal se borrara
		if (localStorage.getItem("TiempoSesionPorPestaña")) {
			localStorage.removeItem("TiempoSesionPorPestaña")
		}
		console.log("Inicio de sesion permanente")
	}
	else{
		//si el check no está marcado se vendrá por estas funciones
		//si hay alguna sesion permanente iniciada la eliminaremos
		if (localStorage.getItem("sesionIniciada")) {
			localStorage.removeItem("sesionIniciada")
		}
		//obtendremos el tiempo en milisegundos del día de hoy
		var tiempo = new Date().getTime();
		//se le aumentaran 2 (o mas) minutos en el tiempo para que despues de estos se cierre la sesion
		localStorage.setItem("TiempoSesionPorPestaña",tiempo+1200000)
		console.log("Inicio de sesion temporal")
	}

	//Guardaremos los datos del usuario para usarlos a nuestra conveniencia
	localStorage.setItem("DatosSesion",JSON.stringify(usuario))
	alert("Inicio de sesion realizado con éxito")
	location.href="index.html"
}
///////////Fin Logeo //////////////

////////////Funcion de Registro/////////////////
function Registro (e,object) {
	// e.preventDefault detiene el evento del submit del formulario para poder validar
	e.preventDefault();
	//obtenemos el formulario del objeto
	var form = object.form
	//obtenemos los inputs del formulario
	var inputs = form.getElementsByTagName("input")
	//se recorre los inputs en busca de campos vacios
	for (var i = 0; i < inputs.length; i++) {
		var campo = inputs[i].value || "";
		//El .trim() quita espacios en blanco al inicio y final de una cadena
		//permitiendonos saber si el input está vació por completo
		if (campo.trim()==="") {
			alert("Por favor rellene todos los campos")
			return false;
		};
	};
	//obtenemos nuestra "db" de local storage
	var usuarios = obtenerUsuarios() ||{};
	//validamos si ya existe un usuario con el mismo username que se quiere registrar
	if (usuarios[form.username.value] ) {alert("Este usuario ya existe en la base de datos"); return false;};
	//validamos si ya existe un usuario usando el mismo correo que queremos registrar
	if (existeCorreo(form.email.value)) {alert("Este correo ya está siendo usado por otro usuario\nPor favor intente con otro"); return false};
	//validamos que las contraseñas coincidan la una con la otra
	if (form.password.value!=form.password_confirm.value) {alert("Las contraseñas no coinciden");return false};
	//creamos el nuevo usuario en un objeto
	usuario = {'user':form.username.value,'password':form.password.value,'email':form.email.value}
	//ponemos el username del usuario como identificador de nuestra "db"
	usuarios[usuario.user] = usuario;
	//guardamos el usuario
	nuevoUser(usuarios);
	// se redirecciona al login
	location.reload();
}
///////////Fin Registro//////////////

//Funcion para obtener la "db" del localstorage con todos los usuarios
function obtenerUsuarios(){
    var Usuarios = localStorage.getItem("Usuarios");
    return JSON.parse(Usuarios)||{};
};

//Funcion para crear el usuario nuevo
function nuevoUser(usuarios){
	var objetoJSON = JSON.stringify(usuarios);
    localStorage.setItem("Usuarios",objetoJSON);
	alert("Usuario registrado con éxito");
};

//funcion para ver si un correo está siendo usado por un usuario
function existeCorreo (value) {
  	var usuarios = obtenerUsuarios() || {}
  	for (var a in usuarios) {
  		if (usuarios[a].email && usuarios[a].email==value) {
  			//se retorna un usuario con datos para hacer validaciones en caso de que sea cierto
  			//ejemplo en el login para obtener las contraseña si se logea con correo
  			//ejemplo en el registro ya que si el if recibe algo diferente a null o false lo toma como cierto
  			return usuarios[a];
  		};
  	};
  	//se retorna falso en caso de que no sea cierto
  	return false;
}
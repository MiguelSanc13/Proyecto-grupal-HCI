titulos = {}
function Seguir(e,obj) {
	e.preventDefault();
	var form = obj.form
	var inputs = form.getElementsByTagName("input")
	var camposVacios = false;
	var camposIncorrectos = false;

	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].value.trim()==="" && inputs[i].getAttribute("required")) {
			var obj = inputs[i];
			camposVacios=true;
			if (!titulo[obj.name] ) {
				titulo[obj.name] = obj.title || null;
			}
			obj.style.borderColor="#F44336";
			obj.title="Campo Vacío"
			obj.addEventListener("focus", function (argument) {
				this.title = titulo[this.name];
				this.style.borderColor = "#ccc"
			});
		}
	}
	var selects = form.getElementsByTagName("select")
	for (var i = 0; i < selects.length; i++) {
		if (selects[i].value.trim()==="" && selects[i].getAttribute("required")) {
			var obj = selects[i];
			camposVacios=true;
			if (!titulo[obj.name] ) {
				titulo[obj.name] = obj.title || null;
			}
			obj.style.borderColor="#F44336";
			obj.title="Campo Vacío"
			obj.addEventListener("focus", function (argument) {
				this.title = titulo[this.name];
				this.style.borderColor = "#ccc"
			});
		}
	}
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].classList.contains("no-valid")) {
			camposIncorrectos = true
		};
	};
	if (camposVacios) {
		alert("Por favor no deje campos vacíos")
		return false;
	}
	if (camposIncorrectos) {
		alert("Por favor asegurese que todos los campos sean correctos")
		return false;
	}
	var cliente = obtenerCliente();
	if (cliente[form.cedula.value]) {
		alert("Este cliente ya tiene un prestamo registado\nSolo se acepta un prestamo por cliente");
		return false;
	}
	cliente = {
		"cedula":form.cedula.value,
		"nombre":form.nombre.value,
		"apellidos":form.apellidos.value,
		"fnacimiento":form.fnacimiento.value,
		"nacionalidad":form.nacionalidad.value,
		"ecivil":form.ecivil.value,
		"email":form.email.value,
		"tcelular":form.tcelular.value,
		"tdomicilio":form.tdomicilio.value,
		"ttrabajo":form.ttrabajo.value,
		"provincia":form.provincia.value,
		"direccion":form.direccion.value,
		"tcuenta":form.tcuenta.value,
		"ncuenta":form.ncuenta.value
	}
	newTempClient(cliente)
	location.href="prestamo.html";
}

function obtenerCliente(){
    var Clientes = localStorage.getItem("Clientes");
    return JSON.parse(Clientes)||{};
};

//Funcion para crear el usuario nuevo
function newTempClient(Cliente){
	var objetoJSON = JSON.stringify(Cliente);
    localStorage.setItem("Temp-Clientes",objetoJSON);
};
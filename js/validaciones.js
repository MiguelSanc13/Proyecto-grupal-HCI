titulo={}
function vallidarCedula (e,obj) {
	var cedula = obj.value
	var valced = indentificador.validarCedula(cedula);
	if (!valced && obj.value.trim() != "") {
		if (!titulo[obj.name] ) {
			titulo[obj.name] = obj.title || null;
		};
		obj.style.borderColor="#F44336";
		obj.title="Cédula no valida"
		obj.classList.add("no-valid")
	}
	else{
		if (titulo[obj.name]) {
			obj.title=titulo[obj.name]
		};
		obj.style.borderColor="#cncc";
		if (valced) {
			obj.style.borderColor="#4CAF50";
			obj.classList.remove("no-valid")
		};
	}
}
function validarEmail(e,obj){	
	var patt = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	var res = patt.test(obj.value);
	if (!res && obj.value.trim() != "") {
		if (!titulo[obj.name] ) {
			titulo[obj.name] = obj.title || null;
		};
		obj.style.borderColor="#F44336";
		obj.title="Correo no válido"
		obj.classList.add("no-valid")
	}
	else{
		if (titulo[obj.name]) {
			obj.title=titulo[obj.name]
		};
		obj.style.borderColor="#ccc";
		if (res) {
			obj.style.borderColor="#4CAF50";
			obj.classList.remove("no-valid")
		};
	}
}

function validarTexto(e,obj) {
	var patron =/[A-Za-zñáéíóúÁÉÍÓÚ\s]/;
	var text = obj.value
	var validacion = false;
	for (var i = 0; i < text.length; i++) {
		validacion = patron.test(text[i])
		if (!validacion) {break;};
	}
	if (!validacion && text.trim()!="") {
		if (!titulo[obj.name] ) {
			titulo[obj.name] = obj.title || null;
		};
		obj.style.borderColor="#F44336";
		obj.title="Texto no válido"
		obj.classList.add("no-valid")
	}
	else{
		if (titulo[obj.name]) {
			obj.title=titulo[obj.name]
		};
		obj.style.borderColor="#ccc";
		if (validacion) {
			obj.style.borderColor="#4CAF50";
			obj.classList.remove("no-valid")
		};
	}
}
function validarNumero (e,obj) {
	var numero = obj.value
	var validacion = false;
	if (!isNaN(numero)){
		validacion=true;
    }
    if (!validacion && numero.trim()!="") {
		if (!titulo[obj.name] ) {
			titulo[obj.name] = obj.title || null;
		};
		obj.style.borderColor="#F44336";
		obj.title="Número no válido"
		obj.classList.add("no-valid")
	}
	else{
		if (titulo[obj.name]) {
			obj.title=titulo[obj.name]
		};
		obj.style.borderColor="#ccc";
		if (validacion && numero.trim()!="") {
			obj.style.borderColor="#4CAF50";
			obj.classList.remove("no-valid")
		};
	}
}

function soloLetras(e) {
	var patron =/[A-Za-zñáéíóúÁÉÍÓÚ\s]/;
	var text = e.key||""
	var validacion = patron.test(text);
	if (!validacion) {
		e.preventDefault();
	}
}

function soloNumeros (e) {
	var numero = this.value+e.key;
	if (isNaN(numero)){
		e.preventDefault();	
    }
}


var inputs = document.getElementsByTagName("input")
for (var i = 0; i < inputs.length; i++) {
	var sL = inputs[i].getAttribute("soloLetras")
	if (sL!=null && sL.toLowerCase()!="false") {inputs[i].addEventListener("keypress",soloLetras)};
	var sN = inputs[i].getAttribute("soloNumeros")
	if (sN!=null && sN.toLowerCase()!="false") {inputs[i].addEventListener("keypress",soloNumeros)};
};
llenarTabla()
function llenarTabla (argument) {
	 var Clientes = obtenerCliente();
	 cont = 0
	 tabla =''
	 for (var i in Clientes) {
	 	cont ++
	 	tabla+='<tr>'+
	 		'<td>'+cont+'</td>'+
	 		'<td>'+Clientes[i].cedula+'</td>'+
	 		'<td>'+Clientes[i].nombre+'</td>'+
	 		'<td>'+Clientes[i].apellidos+'</td>'+
	 		'<td>'+Clientes[i].email+'</td>'+
	 		'<td>'+Clientes[i].datosPrestamo.tipo+'</td>'+
	 		'<td>'+Clientes[i].datosPrestamo.cap_total+'</td>'+
	 		'<td>'+
	 		'<center>'+
	 			'<button type="button" class="btn btn-success btn-circle" id="'+Clientes[i].datosPrestamo.tbody+'">'+
	 			'<i class="glyphicon glyphicon-eye-open"></i>'+
	 			'</button>'+
	 			'&nbsp;&nbsp;'+
	 			'<button type="button" class="btn btn-warning btn-circle">'+
	 			'<i class="glyphicon glyphicon-pencil"></i>'+
	 			'</button>'+
	 			'&nbsp;&nbsp;'+
	 			'<button type="button" class="btn btn-danger btn-circle">'+
	 			'<i class="glyphicon glyphicon-trash"></i>'+
	 			'</button>'+
 			'</center>'+
 			'</td>'+
	 	'<tr>'
	 }
	 var tbody = document.querySelector("#tbody");
		if (tbody) {
			tbody.innerHTML = tabla
		}
}

var buscador = document.getElementById('buscador');
buscador.addEventListener('keyup',Buscar)

function Buscar (e) {
	var tabla = document.getElementById('tablaPrestamo');
	if(!tabla){console.log("no se encontró la tabla referida"); return false};
	var array = [1,2,3,5]
    var busqueda = this.value;
    busqueda = busqueda.toLowerCase()
    var cellsOfRow="";
    var found=false;
    var compareWith="";
    busqueda = busqueda.trim(busqueda)
    if (busqueda.trim()=="") {
    	for (var i = 1; i < tabla.rows.length; i++) {
            tabla.rows[i].style.display = '';
   		 }
    	return false;
    };

    for (var i = 1; i < tabla.rows.length; i++) {
        cellsOfRow = tabla.rows[i].getElementsByTagName('td');
        found = false;
        for (var j = 0; j < cellsOfRow.length; j++)
        {
        	if (dataTable(j,array)) {
                compareWith = cellsOfRow[j].innerHTML.toLowerCase();
                if (busqueda.length == 0 || (compareWith.indexOf(busqueda) > -1))
                {
                    found = true;
                }
            };
        }
        if(found)
        {
            tabla.rows[i].style.display = '';
        } else {
            tabla.rows[i].style.display = 'none';
        }
    }
}

function dataTable(j,array){
	for (var i = 0; i < array.length; i++) {
		if (j==array[i]) {return true;};
	};
	return false;
}


var botones = document.getElementsByClassName('btn btn-success btn-circle');
for (var i = 0; i < botones.length; i++) {
	botones[i].addEventListener('click',abrirModal)
};

var botones2 = document.getElementsByClassName('btn btn-warning btn-circle');
for (var i = 0; i < botones2.length; i++) {
	botones2[i].addEventListener('click',abrirModal2)
};

var botones3 = document.getElementsByClassName('btn btn-danger btn-circle');
for (var i = 0; i < botones3.length; i++) {
	botones3[i].addEventListener('click',abrirModal3)
};

var modal = document.getElementById('myModal');
var modal2 = document.getElementById('myModal2');
var modal3 = document.getElementById('myModal3');
var btnClose = document.getElementById('buttonClosed');
btnClose.addEventListener("click",cerrarModal)
var btnClose = document.getElementById('buttonClosed2');
btnClose.addEventListener("click",cerrarModal)
var btnClose = document.getElementById('buttonClosed3');
btnClose.addEventListener("click",cerrarModal)

function abrirModal(e) {
	e.preventDefault();
	var tbody = document.getElementById("tbody-table")
	if (tbody) {
		tbody.innerHTML = this.id;
	};
    modal.style.display = "block";
}

function abrirModal2(e) {
	e.preventDefault();
	var tr = this.parentNode.parentNode.parentNode
	var nodo = tr.childNodes
	document.getElementById("cedClient").value = nodo[1].innerHTML;
	document.getElementById("nameClient").value = nodo[2].innerHTML;
	document.getElementById("lastnameClient").value = nodo[3].innerHTML;
	document.getElementById("emailClient").value = nodo[4].innerHTML;
    modal2.style.display = "block";
}

function abrirModal3 (e) {
	e.preventDefault();
	var tr = this.parentNode.parentNode.parentNode
	var nodo = tr.childNodes
	document.getElementById("cedulaMod3").innerHTML = nodo[1].innerHTML;
	document.getElementById("nombresMod3").innerHTML = nodo[2].innerHTML+" "+nodo[3].innerHTML;

    modal3.style.display = "block";
}

function cerrarModal(e) {
	e.preventDefault();
    modal.style.display = "none";
    modal2.style.display = "none";
    modal3.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal || event.target == modal2 || event.target == modal3) {
        modal.style.display = "none";
        modal2.style.display = "none";
        modal3.style.display = "none";
    }
}



function editPrestamo (e,button) {
	e.preventDefault();
	 var Clientes = obtenerCliente();
	var ced = document.getElementById("cedClient").value;
	var name = document.getElementById("nameClient").value;
	var apellido = document.getElementById("lastnameClient").value;
	var email = document.getElementById("emailClient").value;
	if (!Clientes[ced]) {alert("hubo un error al actualizar la informacion"); return false};
	Clientes[ced].nombre =  name;
	Clientes[ced].apellidos = apellido;
	Clientes[ced].email = email;
	saveClients (Clientes);
	location.reload();
}


function borrarPrestamo (e,button) {
	e.preventDefault();
	var Clientes = obtenerCliente();
	var cedula = document.getElementById("cedulaMod3").innerHTML
	if (!Clientes[cedula]) {alert("Ocurrio un error al intentar borrar estos datos");return false;}
	delete Clientes[cedula];
	saveClients (Clientes);
	location.reload();
}

function obtenerCliente(){
    var Clientes = localStorage.getItem("Clientes");
    return JSON.parse(Clientes)||{};
};

function saveClients (Clientes) {
	var objetoJSON = JSON.stringify(Clientes);
    localStorage.setItem("Clientes",objetoJSON);
}
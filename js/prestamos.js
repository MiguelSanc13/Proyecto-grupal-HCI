function imprimir(e){ 
    var contenido= document.getElementById("contenedor").innerHTML;
    var contenidoOriginal= document.body.innerHTML;
    document.body.innerHTML = contenido;
    window.print();
    document.body.innerHTML = contenidoOriginal;
    if (window.matchMedia) {
       var mediaQueryList = window.matchMedia('print');
       mediaQueryList.addListener(function(mql) {
           if (mql.matches) {
           } else {
               console.log(mql)
               afterPrint();
           }
       });
   }
} 

function getTempClient(argument) {
var Temp_Clientes = localStorage.getItem("Temp-Clientes");
return JSON.parse(Temp_Clientes)||{};
}
var afterPrint = function() {
   location.href = "index.html";
};

function llenarCampos (argument) {
   TempClients = getTempClient();
   console.log(Object.keys(TempClients).length + ""+ typeof(TempClients))
   if (typeof(TempClients)!="object" || Object.keys(TempClients).length<1) {location.href="index.html"};
   var nombres = document.querySelector("#name") 
   if (nombres) {nombres.innerHTML = TempClients.nombre+" "+TempClients.apellidos;};
   var nombres = document.querySelector("#nombres") 
   if (nombres) {nombres.innerHTML = "Nombres: "+TempClients.nombre+" "+TempClients.apellidos;};
   var cedula = document.querySelector("#cedula") 
   if (cedula) {cedula.innerHTML = "Cedula: "+TempClients.cedula};
   var nacionalidad = document.querySelector("#nacionalidad") 
   if (nacionalidad) {nacionalidad.innerHTML = "Nacionalidad: "+TempClients.nacionalidad};
   var email = document.querySelector("#email") 
   if (email) {email.innerHTML = "Email: "+TempClients.email};

   var items = localStorage.getItem("contenido-tabla");
   if (items) {
       var tbody = document.querySelector("#tbody");
       if (tbody) {
           tbody.innerHTML = items
       }
   };
}

function guardarTabla (e,button) {
   e.preventDefault();
   var tbody = document.querySelector("#tbody-table");
   var form = button.form
   var child = form.childNodes
   console.log(child)
   var mm = document.querySelector("#monto_mensual").innerHTML
   var mi = document.querySelector("#monto_inicial").innerHTML
   var ti = document.querySelector("#total_interes_apagar").innerHTML
   var ct = document.querySelector("#cap_total").innerHTML
   var tipo = document.querySelector("#tipo").value
   var tempClient = getTempClient();
   var datosP = {
       "monto_mensual":mm,"monto_inicial":mi,"total_interes_apagar":ti,"cap_total":ct,
       "tipo":tipo,"tbody":tbody.innerHTML
   }
   var cliente = tempClient;
   cliente["datosPrestamo"] = datosP;
   var clientes = getClients();
   clientes[cliente.cedula] = cliente
   saveClients (clientes)
   if (tbody) {
       tbody = tbody.innerHTML;
       localStorage.setItem("contenido-tabla",tbody);
   };
   if (confirm("Datos guardados con éxito\nDesea imprimir la tabla de prestamos?")) {
       location.href= "imprimir.html"
   }
   else{
       localStorage.removeItem('Temp-Clientes');
       location.href="registrarCliente.html"
   }
}

function cancelar (e) {
   e.preventDefault();
   localStorage.removeItem('Temp-Clientes');
   location.href="registrarCliente.html"
}

function getClients(argument) {
var Clientes = localStorage.getItem("Clientes");
return JSON.parse(Clientes)||{};
}

function saveClients (Clientes) {
   var objetoJSON = JSON.stringify(Clientes);
   localStorage.setItem("Clientes",objetoJSON);
}
function getTasa(tasa) {
    tasa = tasa / 12 
    tasa = tasa / 100.0
    return tasa;
}

function getValorDeCuotaFija(monto, tasa, cuotas) {
    tasa = getTasa(tasa);
    valor = monto *( (tasa * Math.pow(1 + tasa, cuotas)) / (Math.pow(1 + tasa, cuotas) - 1) );
    return valor.toFixed(2);
}

function getAmortizacion(monto, tasa, cuotas) {
    var valor_de_cuota = getValorDeCuotaFija(monto, tasa, cuotas);
    var saldo_al_capital = monto;
    var items = new Array();

    for (i=0; i < cuotas; i++) {
        interes = saldo_al_capital * getTasa(tasa);
        abono_al_capital = valor_de_cuota - interes;
        saldo_al_capital -= abono_al_capital;
        numero = i + 1;
        
        interes = interes.toFixed(2);
        abono_al_capital = abono_al_capital.toFixed(2);
        saldo_al_capital = saldo_al_capital.toFixed(2);

        item = [numero, interes, abono_al_capital, valor_de_cuota, saldo_al_capital];
        items.push(item);
    }
    return items;
}


function setMoneda(num) {
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num)) num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10) cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + '$' + num + ((cents == "00") ? '' : '.' + cents));
}

function calcular(e) {
    e.preventDefault();
    var monto = document.getElementById("cantidad").value;
    var cuotas = document.getElementById("meses").value;
    var tasa = document.getElementById("porcentaje").value;
    if (!monto) {
        alert('Indique el monto');
        return;
    }
    if (!cuotas) {
        alert('Indique las cuotas');
        return;
    }
    if (!tasa) {
        alert('Indique la tasa');
        return;
    }
    if (parseInt(cuotas) < 1) {
        alert('Las cuotas deben ser de 1 en adelante');
        return;
    }
    if (parseFloat(monto)<5000) {
        alert('El monto ingresado debe ser mayor o igual a 5000');
        return false;
    };
    var items = getAmortizacion(monto, tasa, cuotas);
  
    if (parseInt(cuotas) > 100000) { alert("Ha indicado una cantidad excesiva de cuotas, porfavor reduzcala a menos de 3000"); return; }
        var tbody = document.querySelector("#tbody-table");
        tbody.innerHTML="";
        totalinteres=0
        for (i = 0; i < items.length; i++) {
            item = items[i];
            tr = document.createElement("tr");
            for (e = 0; e < item.length; e++) {
                value = item[e];
                if (e > 0) { value = setMoneda(value); }
                td = document.createElement("td");
                textCell = document.createTextNode(value);
                td.appendChild(textCell);
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
            totalinteres = totalinteres + parseFloat(items[i][1])
        }
    valor = setMoneda(items[0][3]);
    totalapagar = parseFloat(items[0][4])+parseFloat(items[0][2]);
    document.querySelector("#monto_mensual").innerHTML = valor;
    document.querySelector("#monto_inicial").innerHTML = setMoneda(totalapagar);
    document.querySelector("#total_interes_apagar").innerHTML = setMoneda(totalinteres);
    document.querySelector("#cap_total").innerHTML = setMoneda(totalapagar+totalinteres);
    }
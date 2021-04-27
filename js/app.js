const ingresos = [
  new Ingreso('Salario', 2000.00),
  new Ingreso('Consultoría', 300.00)
];

const egresos = [
  new Egreso('AFP-Aporte', 200.00),
  new Egreso('AFP-Administración', 4.60),
  new Egreso('AFP-Seguro', 34.80),
  new Egreso('Alimentación', 250.00),
  new Egreso('Alimentación', 1500.00)
];

let totalIngresos = () => {
  let totalIngreso = 0;
  for (let ingreso of ingresos) {
    totalIngreso += ingreso.valor;
  }
  return totalIngreso;
}

let totalEgresos = () => {
  let totalEgreso = 0;
  for (let egreso of egresos) {
    totalEgreso += egreso.valor;
  }
  return totalEgreso;
}

let cargarApp = () => {
  cargarCabecero();
}

let cargarCabecero = () => {
  let totalIngreso = totalIngresos();
  let totalEgreso = totalEgresos();
  let presupuesto = totalIngreso - totalEgreso;
  let porcentajeEgreso = totalEgreso / totalIngreso;
  document.getElementById('presupuesto').innerHTML = formatoMonedaSoles(presupuesto);
  document.getElementById('porcentajeEgreso').innerHTML = formatoPorcentaje(porcentajeEgreso);
  document.getElementById('totalIngreso').innerHTML = formatoMonedaSoles(totalIngreso);
  document.getElementById('totalEgreso').innerHTML = formatoMonedaSoles(totalEgreso);
}

const formatoMonedaSoles = (valor) => {
  return valor.toLocaleString('es-PE', { style: 'currency', currency: 'PEN', minimumFractionDigits: 2 });
}

const formatoPorcentaje = (valor) => {
  return valor.toLocaleString('en-US', {style: 'percent', minimumFractionDigits: 2 })
}
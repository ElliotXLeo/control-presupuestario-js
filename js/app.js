const ingresos = [
  new Ingreso('Salario', 2000.00),
  new Ingreso('Consultoría', 300.00),
  new Ingreso('Interés', 60.00)
];

const egresos = [
  new Egreso('AFP-Aporte', 200.00),
  new Egreso('AFP-Administración', 4.60),
  new Egreso('AFP-Seguro', 34.80),
  new Egreso('Alimentación', 250.00),
  new Egreso('Departamento', 1500.00)
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

const formatoMonedaSoles = (valor) => {
  return valor.toLocaleString('es-PE', { style: 'currency', currency: 'PEN', minimumFractionDigits: 2 });
}

const formatoPorcentaje = (valor) => {
  return valor.toLocaleString('en-US', { style: 'percent', minimumFractionDigits: 2 })
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

const cargarIngresos = () => {
  let ingresosHtml = '';

  for (let ingreso of ingresos) {
    ingresosHtml += crearIngresoHtml(ingreso);
  }

  document.getElementById('listaIngresos').innerHTML = ingresosHtml;
}

const crearIngresoHtml = (ingreso) => {
  return `
    <div class="elemento limpiarEstilos">
      <div class="elemento_descripcion">
        ${ingreso.descripcion}
      </div>
      <div class="derecha limpiarEstilos">
        <div class="elemento_valor">
          + ${formatoMonedaSoles(ingreso.valor)}
        </div>
        <div class="elemento_eliminar">
          <button class="elemento_eliminar--boton">
            <ion-icon name="close-circle-outline" onclick='eliminarIngreso(${ingreso.id})'></ion-icon>
          </button>
        </div>
      </div>
    </div>
  `
}

const cargarEgresos = () => {
  let egresosHtml = '';

  for (let egreso of egresos) {
    egresosHtml += crearEgresoHtml(egreso);
  }

  document.getElementById('listaEgresos').innerHTML = egresosHtml;
}

const crearEgresoHtml = (egreso) => {
  return `
    <div class="elemento limpiarEstilos">
      <div class="elemento_descripcion">
        ${egreso.descripcion}
      </div>
      <div class="derecha limpiarEstilos">
        <div class="elemento_valor">
          - ${formatoMonedaSoles(egreso.valor)}
        </div>
        <div class="elemento_porcentaje">
          ${formatoPorcentaje(egreso.valor / totalIngresos())}
        </div>
        <div class="elemento_eliminar">
          <button class="elemento_eliminar--boton">
          <ion-icon name="close-circle-outline" onclick='eliminarEgreso(${egreso.id})'></ion-icon>
          </button>
        </div>
      </div>
    </div>
  `
}

let cargarApp = () => {
  cargarCabecero();
  cargarIngresos();
  cargarEgresos();
}

const eliminarIngreso = (id) => {
  let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
  ingresos.splice(indiceEliminar, 1);
  cargarApp();
}

const eliminarEgreso = (id) => {
  let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
  egresos.splice(indiceEliminar, 1);
  cargarApp();
}
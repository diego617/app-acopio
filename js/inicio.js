import Conexion from "./Conexion.js";

async function IncomeByMonths(){
  const tablaBody = document.getElementById('tabla-body');
  const template = document.getElementById('fila-template');
  const conn = new Conexion()
  const datos = await conn.getAllIncomeByMonth()
  //ingresoAcopio(datos)

  const periodo = datos[2024];
  const dato = Object.keys(periodo);
  //console.log(dato);
  dato.forEach(value => {
    const valueDatos = periodo[value]
    console.log(valueDatos.kilos_netos)

    const fila = template.content.cloneNode(true);
    fila.querySelector('.mes').textContent = value;
    fila.querySelector('.kilos').textContent = valueDatos.kilos_netos;
    fila.querySelector('.precio').textContent = valueDatos.total_compra / valueDatos.kilos_netos//`$${dato.precio.toFixed(2)}`;
    fila.querySelector('.total').textContent = valueDatos.total_compra;
    
    tablaBody.appendChild(fila);
  });

}
/*const ingresoAcopio = (datos)=>{
  //console.log("**:",datos);
  const year_25 = datos[2025];
  const data = Object.keys(year_25)
   data.forEach(element => {
    //console.log(element)
   });
}*/
IncomeByMonths();
//console.log("Holaa");
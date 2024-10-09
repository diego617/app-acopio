
function groupMonth(data){
  const nameMonth = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Set','Oct','Nov','Dic']
  let months = {};
  let sumaK = 0;
  let sumaC = 0;
  let total = "Total" 
  data.forEach(value => {
    const [year,month] = value.apfacturafecha.split('-');
    const date = new Date(year,month -1);
    const groupDate = nameMonth[date.getMonth()];
    sumaK += value.apfacturaapneto;
    sumaC += value.apfacturatotal;
    if(!months[groupDate]){
      months[groupDate] = {kilosnetos: 0, totalcompra:0}
    }
    months[groupDate].kilosnetos += value.apfacturaapneto;
    months[groupDate].totalcompra += value.apfacturatotal;
  });
  months[total] = {kilosnetos:sumaK,totalcompra:sumaC};
  listMonth(months);
}
const table = document.getElementById('table-content');

function createElementHtml(datos){
  const cells = document.createElement('td');
  cells.textContent = datos;
  console.log(datos);
}

function listMonth(values){
  
  //console.log(values)
  for(const[key,value] of Object.entries(values)){
    //console.log(value);
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    const cellKg = document.createElement('td');
    const cellPro = document.createElement('td');
    const cellCom = document.createElement('td');
    row.appendChild(cell).textContent = key;
    row.appendChild(cellKg).textContent = value.kilosnetos.toLocaleString('en-US');
    row.appendChild(cellPro).textContent = value.totalcompra / value.kilosnetos
    
    row.appendChild(cellCom).textContent = value.totalcompra.toLocaleString('en-US');
    table.appendChild(row);
   //console.log(value.apfacturaapneto[1])
  }


}


async function conexionAcopio() {
  try {
    const res = await fetch('./db/acopio2024.json');
    const data = await res.json();
    groupMonth(data)
  } catch (error) {
    console.error(error);
  }
    
}

conexionAcopio()
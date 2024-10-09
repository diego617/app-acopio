
function groupMonth(data){
  const nameMonth = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Set','Oct','Nov','Dic']
  let months = {};
  let sumaK = 0;
  let sumaC = 0;
  data.forEach(value => {
    const [year,month] = value.apfacturafecha.split('-');
    const date = new Date(year,month -1);
    const groupDate = nameMonth[date.getMonth()];
    sumaK += value.apfacturaapneto;
    sumaC += value.apfacturatotal;
    let total = "Total" 
    if(!months[groupDate]){
      months[groupDate] = {kilosnetos: 0, totalcompra:0},
      months[total] = {kilosnetos:0,totalcompra:0}
    }
    months[groupDate].kilosnetos += value.apfacturaapneto;
    months[groupDate].totalcompra += value.apfacturatotal;
    months[total].kilosnetos = sumaK;
    months[total].totalcompra = sumaC;
  });
  //console.log(months)
  listMonth(months);
}
const table = document.getElementById('table-content');

function createElementHtml(datos){
  const cells = document.createElement('td');
  cells.textContent = datos;
  console.log(datos);
}

function listMonth(values){
  
  //createElementHtml(values)
  for(const[key,value] of Object.entries(values).sort()){
    let tds = value.kilosnetos;
    createElementHtml(tds)
    //console.log(tds);
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    row.appendChild(cell).textContent = key;
    table.appendChild(row);
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

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
  //let a,b = document.createElement('td')
  const pd = {product:"Teclado",preci:20}
  a = pd.product
  b = pd.preci
  console.log(a,b)
  for(const[key,value] of Object.entries(values)){
    //console.log(key[0],key[1]);
    const promedio = value.totalcompra / value.kilosnetos
    const row = document.createElement('tr');
    let cell = document.createElement('td');
    const cellKg = document.createElement('td');
    console.log(cell);
    const cellPro = document.createElement('td');
    const cellCom = document.createElement('td');
    row.appendChild(cell).textContent = key;
    row.appendChild(cellKg).textContent = value.kilosnetos.toLocaleString('en-US');
    row.appendChild(cellPro).textContent = promedio.toLocaleString('en-US');
    row.appendChild(cellCom).textContent = value.totalcompra.toLocaleString('en-US');
    table.appendChild(row);
    cellCom.style.textAlign = 'right'
    if(key === "Total"){
      row.style.fontWeight = '600'
    }
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
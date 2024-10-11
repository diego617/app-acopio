
function groupMonth(data){
  const nameMonth = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Set','Oct','Nov','Dic']
  let months = {};
  let almacen = {almacenflorida:{kilosnetos:0,totalcompra:0},
                 almacenyurinaki:{kilosnetos:0,totalcompra:0}};
  let kNetos = 0;
  let tCompra = 0;
  data.forEach(value => {
    const [year,month] = value.apfacturafecha.split('-');
    const date = new Date(year,month -1);
    const groupDate = nameMonth[date.getMonth()];
    kNetos += value.apfacturaapneto;
    tCompra += value.apfacturatotal;
 
    if(!months[groupDate]){
      months[groupDate] = {kilosnetos: 0, totalcompra:0}
    }
    months[groupDate].kilosnetos += value.apfacturaapneto;
    months[groupDate].totalcompra += value.apfacturatotal;
    if(value.almacennombre === 'ALMACEN PERGAMINO LA FLORIDA'){
      almacen["almacenflorida"].kilosnetos += value.apfacturaapneto;
      almacen["almacenflorida"].totalcompra += value.apfacturatotal;
    }else{
      almacen["almacenyurinaki"].kilosnetos += value.apfacturaapneto;
      almacen["almacenyurinaki"].totalcompra += value.apfacturatotal;
    }
  });
  chartBar(months)
  months.Total;
  months.Total = {kilosnetos:kNetos,totalcompra:tCompra};
  almacen.total;
  almacen.total = {kilosnetos:kNetos,totalcompra:tCompra};
  listMonth(months);
  listAlmacen(almacen)
  console.log(almacen);
}

function listAlmacen(almcenes){
  const tableCotent = document.getElementById('content-almacen');
  const nameAlmacen = ['Almacen Florida','Almacen Yurinaki','Total'];
  let rows = 0;
  for(const [key,value] of Object.entries(almcenes)){
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    const cell1 = document.createElement('td');
    const cell2 = document.createElement('td');
    const cell3 = document.createElement('td');
    const promedio = value.totalcompra / value.kilosnetos
    row.appendChild(cell).textContent = nameAlmacen[rows];
    row.appendChild(cell1).textContent = value.kilosnetos.toLocaleString('en-US');
    row.appendChild(cell2).textContent = promedio.toFixed(2);
    row.appendChild(cell3).textContent = value.totalcompra.toLocaleString('en-US');
    tableCotent.appendChild(row);
    rows ++;
    cell.style.textAlign = 'left';
    if(key === 'total'){
      row.style.fontWeight = '600';
    }
  }
}

function listMonth(values){
  const table = document.getElementById('table-content');
  for(const[key,value] of Object.entries(values)){
    const promedio = value.totalcompra / value.kilosnetos
    const row = document.createElement('tr');
    let cell = document.createElement('td');
    const cellKg = document.createElement('td');
    const cellPro = document.createElement('td');
    const cellCom = document.createElement('td');
    row.appendChild(cell).textContent = key;
    row.appendChild(cellKg).textContent = value.kilosnetos.toLocaleString('en-US');
    row.appendChild(cellPro).textContent = promedio.toFixed(2)
    row.appendChild(cellCom).textContent = value.totalcompra.toLocaleString('en-US');
    table.appendChild(row);
    cellCom.style.textAlign = 'right';
    cellKg.style.textAlign = 'right';
    if(key === "Total"){
      row.style.fontWeight = '600'
    }
  }
}
function chartBar(datos){
  const ctx = document.getElementById('myChart');
  console.log(datos)
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: Object.keys(datos),
      datasets: [{
        label: '# of Votes',
        data: Object.values(datos).map(value => value.kilosnetos),
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
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
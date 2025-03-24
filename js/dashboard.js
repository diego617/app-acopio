import Connect  from "./Connect.js";


export async function dashboard(){
  const ctx = document.getElementById('myChart');
  const acopio = new Connect()
  const data = await acopio.getAllIncomeByYear();
  const tableMonths = await acopio.getIncomeByMonths();
  const months = acopio.nameMonth;
  const lastMonth = await acopio.lastMonthsAcopio();
  incomeMonth(data);
    
  const anio2024 = months.map((month => data[2024][month]?.kilos_netos || 0));
  //falta desarrollar para que muestre solo los meses que contenga datos, ahora se esta usando slice
  const anio2025 = months.slice(0,3).map((month => data[2025][month]?.kilos_netos || 0));

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [
        {
        label: '2024',
        data: anio2024,
        borderWidth: 2,
        backgroundColor: 'white', 
        borderColor: '#1565c0', 
        pointRadius: 3,
        pointHoverRadius: 10
        },
        {
        label: '2025',
        data: anio2025,
        borderWidth: 2,
        backgroundColor: 'white', 
        borderColor: '#1e8449', 
        pointRadius: 3,
        pointHoverRadius: 10
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks:{
            font:{size:12,family:'Poppins'},
            //color:'#1a5276'
          }
        },
        y: {
          beginAtZero: true,
          ticks:{
            font:{size:12},
            callback: function(value){
              return value.toLocaleString('en-US'); 
            }
          }
        }
      },
      plugins:{
        chartAreaBorder: {
          borderColor: 'rgba(13, 71, 161,0.1)',
          borderWidth: 2,
          borderDash: [5, 10],
          borderDashOffset: 2,
        },
        title:{
          display: true,
          text: 'Ingreso de café pergamino',
          font:{size:16,family:'Poppins'},
          color: '#555555'
        },
        tooltip: {
          callbacks: {
              label: function(context) {
                  return context.raw.toLocaleString('en-US', { minimumFractionDigits: 2 });
              }
          }
        }
      },
      elements:{
        line:{
          tension:0.5
        }
      },
    },
  }); 
}

function incomeMonth(data){
  const tbody = document.getElementById('content-income-month');
  const tfoot = document.getElementById('tfoot');
  const tr = document.createElement('tr');
  const td1 = document.createElement('td');
  const td2 = document.createElement('td');
  const td3 = document.createElement('td');
  const td4 = document.createElement('td');
  let totalKilos = 0;
  let totalCompra = 0;
  let promedioTotal = 0;

  const year25 = data[2025];
  const datos = Object.keys(year25);
  datos.forEach((value)=>{
    const monthData = year25[value]
    const promedio = monthData.total_compra / monthData.kilos_netos;
    const rows = document.createElement('tr');
    const cellMonths = document.createElement('td');
    const cellKG = document.createElement('td');
    const cellPromedio = document.createElement('td');
    const cellTotal = document.createElement('td');
    rows.appendChild(cellMonths).textContent = value;
    tbody.appendChild(rows); 
    if(monthData.kilos_netos === 0 && isNaN(promedio) && monthData.total_compra === 0){
      rows.appendChild(cellKG).textContent = "0.00";
      rows.appendChild(cellPromedio).textContent = "0.00";
      rows.appendChild(cellTotal).textContent = "0.00";
    }else{
      rows.appendChild(cellKG).textContent = monthData.kilos_netos.toLocaleString('en-US');
      rows.appendChild(cellPromedio).textContent = promedio.toFixed(2);
      rows.appendChild(cellTotal).textContent = monthData.total_compra.toLocaleString('en-US');
    }
    totalKilos += monthData.kilos_netos;
    totalCompra += monthData.total_compra;
    promedioTotal += promedio;
    cellKG.style.textAlign = 'right';
    cellTotal.style.textAlign = 'right';
  });
  tr.appendChild(td1).textContent = "Total"
  tr.appendChild(td2).textContent = (totalKilos).toLocaleString('en-US') + ".00";
  tr.appendChild(td3).textContent = (totalCompra / totalKilos).toFixed(2);
  tr.appendChild(td4).textContent = totalCompra.toLocaleString('en-US');
  td3.style.textAlign = 'center';
  tfoot.appendChild(tr);
    
}
/*function incomeMonth(data,year){
  const tbody = document.getElementById('content-income-month');
  const tfoot = document.getElementById('tfoot');
  const tr = document.createElement('tr');
  const td1 = document.createElement('td');
  const td2 = document.createElement('td');
  const td3 = document.createElement('td');
  const td4 = document.createElement('td');
  let totalKilos = 0;
  let totalCompra = 0;
  let promedioTotal = 0;

  for(const[key,datos] of Object.entries(data)){
    const promedio = datos.total_compra / datos.kilos_netos;
    const rows = document.createElement('tr');
    const cellMonths = document.createElement('td');
    const cellKG = document.createElement('td');
    const cellPromedio = document.createElement('td');
    const cellTotal = document.createElement('td');
    rows.appendChild(cellMonths).textContent = key;
    
    if(datos.kilos_netos === 0 && isNaN(promedio) && datos.total_compra === 0){
      rows.appendChild(cellKG).textContent = "0.00";
      rows.appendChild(cellPromedio).textContent = "0.00";
      rows.appendChild(cellTotal).textContent = "0.00";
    }else{
      rows.appendChild(cellKG).textContent = datos.kilos_netos.toLocaleString('en-US');
      rows.appendChild(cellPromedio).textContent = promedio.toFixed(2);
      rows.appendChild(cellTotal).textContent = datos.total_compra.toLocaleString('en-US');
    }
    totalKilos += datos.kilos_netos;
    totalCompra += datos.total_compra;
    promedioTotal += promedio;
    cellKG.style.textAlign = 'right';
    cellTotal.style.textAlign = 'right';
    tbody.appendChild(rows); 
  }
  tr.appendChild(td1).textContent = "Total"
  tr.appendChild(td2).textContent = (totalKilos).toLocaleString('en-US') + ".00";
  tr.appendChild(td3).textContent = (totalCompra / totalKilos).toFixed(2);
  tr.appendChild(td4).textContent = totalCompra.toLocaleString('en-US');
  td3.style.textAlign = 'center';
  tfoot.appendChild(tr);
}*/
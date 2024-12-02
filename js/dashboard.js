
import Connect  from "./Connect.js";


const chartAreaBorder = {
  id: 'chartAreaBorder',
  beforeDraw(chart, args, options) {
    const {ctx, chartArea: {left, top, width, height}} = chart;
    ctx.save();
    ctx.strokeStyle = options.borderColor;
    ctx.lineWidth = options.borderWidth;
    ctx.setLineDash(options.borderDash || []);
    ctx.lineDashOffset = options.borderDashOffset;
    ctx.strokeRect(left, top, width, height);
    ctx.restore();
  }
};

export async function dashboard(){
  const ctx = document.getElementById('myChart');
  const acopio = new Connect()
  const data = await acopio.getIncomeMonths();
  const months = acopio.nameMonth;

  incomeMonth(months,data);

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [
        {
        label: 'KG',
        data: Object.values(data).map(value => value.kilos_netos),
        borderWidth: 2,
        backgroundColor: '#ccc', 
        borderColor: 'rgba(13, 71, 161,0.6)', 
        //pointStyle: 'circle',
        pointRadius: 5,
        pointHoverRadius: 10
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        chartAreaBorder: {
          borderColor: 'rgba(13, 71, 161,0.5)',
          borderWidth: 2,
          borderDash: [5, 5],
          borderDashOffset: 2,
        }
      }
    },
    plugins: [chartAreaBorder]
  }); 
}


function incomeMonth(months,data){
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
}
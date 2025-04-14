import Conexion from './Conexion.js'

export async function showTable(){
  const conexion = new Conexion();
  const data = await conexion.getAllIncomeByMonth();
  const lastmonth = await conexion.lastMonth();
  const months = conexion.months;
  totalQuitales(data);
  showIncomeByMonths(data);
  const datos_2024 = months.map((month => data[2024][month]?.kilos_netos || 0));
  const datos_2025 = months.slice(0,lastmonth).map((month => data[2025][month]?.kilos_netos || 0));
  
  const ctx = document.getElementById('myChart')
  
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
  const datos = {
    labels: months,
    datasets:[
      {
        label: '2024',
        data: datos_2024,
      },
      {
        label: '2025',
        data: datos_2025
      }
    ]
  }
  const configuracion = {
    type:'line',
    data: datos,
    options:{
      responsive: true,
      maintainAspectRatio: true,
      plugins:{
        chartAreaBorder:{
          borderColor: 'green',
          borderWidth: 2,
          borderDash: [5, 5],
          borderDashOffset: 2,
        }
      }
    },
    plugins:[chartAreaBorder]
  };
  new Chart(ctx,configuracion);
}

const totalQuitales = (data)=>{
  const year_25 = data[2025];
  let  quintales = 0;
  for(const value of Object.values(year_25)){
    quintales += value.kilos_netos / 60;
  }
  console.log(quintales);
}
const createTableRow = (month,valueData)=>{
  
  const tfoot = document.getElementById('tfoot');
  const template = document.getElementById('template_tbody');


  const formatter = new Intl.NumberFormat('es-PE');
  const templateContent = template.content.cloneNode(true);

  templateContent.querySelector('[data-id="mes"]').textContent = month;
  templateContent.querySelector('[data-id="kNetos"').textContent = formatter.format(valueData.kilos_netos);
  templateContent.querySelector('[data-id="Promedio"').textContent = (valueData.total_compra / valueData.kilos_netos).toFixed(2);
  return templateContent;
  /*console.log(month);
  console.log(valueData);*/
}

const showIncomeByMonths = (data)=>{
  const tbody = document.getElementById('content-income-month');
  const periodo = data[2025];
  const datos = Object.keys(periodo)
  console.log(datos);
  datos.forEach(month =>{
    const valueData = periodo[month];
    const row = createTableRow(month,valueData);
		tbody.appendChild(row);
    //console.log(value);
    //console.log(valueData);
  });

}
  /*
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
}*/



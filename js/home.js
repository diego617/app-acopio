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
        label: 'Pergamino 2024',
        data: datos_2024,
      },
      {
        label: 'Pergamino 2025',
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

const showIncomeByMonths = (data)=>{
  const contenTable = document.getElementById('content-income-month');

}



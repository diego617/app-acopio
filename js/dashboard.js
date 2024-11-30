
import Connect  from "./Connect.js";


export async function dashboard(){
  const ctx = document.getElementById('myChart');
  const acopio = new Connect()
  const data = await acopio.getIncomeMonths();
  const months = acopio.nameMonth;
   
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [{
        label: 'KG',
        data: Object.values(data).map(value => value.kilos_netos),
        borderWidth: 2,       
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


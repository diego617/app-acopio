
import Connect  from "./Connect.js";
const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Set','Oct','Nov','Dic'];

function mostrar(){
  const arr = [10,25,15,10,50,45]
  return arr;
}

export async function dashboard(){
  const ctx = document.getElementById('myChart');
  const acopio = new Connect()
  const data = await acopio.getIncomeMonths();
 
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: Object.keys(data), //months,
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




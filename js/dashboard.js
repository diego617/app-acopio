
import Connect  from "./Connect.js";
const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Set','Oct','Nov','Dic'];
//const months = ['Feb','Mar','Abr'];

async function mostrar(){
  const acopioKg = new Connect()
  const datos = await acopioKg.getIncomeMonths()
  console.log(Object.keys(datos))
}
mostrar()

export async function dashboard(){
  const ctx = document.getElementById('myChart');
  const acopio = new Connect()
  const data = await acopio.getIncomeMonths();
   
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,//Object.keys(data),
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




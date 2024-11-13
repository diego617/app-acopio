
import Connect  from "./Connect.js";

const nameMonth = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Set','Oct','Nov','Dic'];

 function dashboard(){
  const main = document.getElementById('main');
  const acopio = new Connect();
  acopio.acopioMonth()
    .then(data =>{
      console.log("ldl",data)
      /*data.forEach(item =>{
        const [year,month ] = item.apfacturafecha.split('-');
        //console.log(item.apfacturafecha)
        const date = new Date(year,month -1);
        const groupDate = nameMonth[date.getMonth()];
        const span = document.createElement('span');
        main.appendChild(span).textContent = groupDate;
        console.log(groupDate);
      })*/
    }) 
}

dashboard()
import ConexionJson from "./ConexionJson.js";

const month = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Set','Oct','Nov','Dic'];

export function dashboard(data){
  const main = document.getElementById('main');
  const acopio = new ConexionJson();
  acopio.getData()
    .then(data =>{
      data.forEach(item =>{
        const span = document.createElement('span');
        //main.appendChild(span).textContent = month;
        console.log(item);
      })
    }) 
}


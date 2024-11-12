import ConexionJson from "./ConexionJson.js";


export function dashboard(data){
  const main = document.getElementById('main');
  const acopio = new ConexionJson();
  acopio.getData()
    .then(data =>{
      data.forEach(item =>{
        console.log(item);
      })
    })
  data.forEach(element => {
    console.log(element.mensaje);
  });
  
}


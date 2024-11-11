function dashboard(data){
  const ms = document.getElementById('ms1')
  const ms2 = document.getElementById('ms2')
  const span = document.createElement('span');
  const main = document.getElementById('main');

  /*const res = await fetch("../db/data-2024.json");
  const data = await res.json();*/

  data.forEach(element => {
    console.log(element.mensaje);
    ms.textContent = element.perido;
    ms2.textContent = element.mensaje;
    main.appendChild(span).textContent += "Cargado contenido....";
  });
  
}
export async function conexionDB(){
  const res = await fetch("../db/data-2024.json");
  const data = await res.json();
  dashboard(data)
}
//dashboard()

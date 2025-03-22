
const route = (event) =>{
  window.history.pushState({},"",event.currentTarget.href);
  event.preventDefault();
  handleLocation();
}
const routes = {
  404: "/pages/404.html",
  "#/": "/pages/dashboard.html",
  "#/contratos": "/pages/contratos.html",
  "#/acopio-cafe": "/pages/acopio.html",
  "#/ventas": "/pages/ventas.html"
};

const handleLocation = async () =>{
  const path = window.location.hash || '#/';
  const route = routes[path] || routes[404];
  const html = await fetch(route).then((data) => data.text());
  const content = document.getElementById('main_content');
  content.innerHTML = html;
  importPages(path)
  navigation(path)
}

function importPages(path){
  switch (path){
    case '#/':
      import("../js/dashboard.js")
      .then(module =>{module.dashboard()})
      .catch(error => console.log('Error al cargar dashboard--0000', error));
      break;
    case '#/contratos':
      import("../js/contratos.js")
      .then(module => {module.conexionJson()})
      .catch(error => console.log('Error al cargar productos', error))
      break;
    case '#/acopio-cafe':
      import("../js/home.js")
      .then(module =>{module.showTable()})
      .catch(error => console.log("Error al cargar acopio-pergamino",error));
      break;
     default:
      console.log('Pagina no encontrado ..import');
      break; 
  }
}

function navigation(url){
  const links = document.querySelectorAll('#navigation a');
  links.forEach(link => {
    link.addEventListener('click',() =>{
      links.forEach(item => item.classList.remove('active'));
      link.classList.add('active');
    });
    if(link.getAttribute('href') === url){
      link.classList.add('active');
    }
  });
}

document.addEventListener("DOMContentLoaded", handleLocation);
window.onpopstate = handleLocation;
window.route = route;




 
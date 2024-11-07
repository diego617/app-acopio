
const links = document.querySelectorAll('#navigation a');

const linkMap ={
  'acopio.html': 'js/home.js',
  'contratos.html': 'js/contratos.js',
}

document.addEventListener('DOMContentLoaded',()=>{
  links.forEach(link =>{
    link.addEventListener('click',(event)=>{
      event.preventDefault();
      const url = link.getAttribute('href')
      loadContent(url)
    });
  });

});

function loadContent(url) {
  removePreviousScript()
  fetch(url)
      .then(response => {
          if (!response.ok) {
              throw new Error('Error en la respuesta de la red');
          }
          return response.text();
      })
      .then(data => {
          document.getElementById('main-content').innerHTML = data;
          console.log(data)
          const scriptName = linkMap[url];
            if (scriptName && !document.querySelector(`script[src="${scriptName}"]`)) {
                const script = document.createElement('script');
                script.src = scriptName;
                script.id = 'dynamic-script';
                script.onload = () => {
                    console.log(`${scriptName} ha sido cargado y ejecutado.`);
                };
                document.body.appendChild(script);
              }
      })
      .catch(error => console.error('Error al cargar el contenido:', error));
}
function removePreviousScript() {
  const previousScript = document.getElementById('dynamic-script');
  if (previousScript) {
      previousScript.remove();
  }
}




const menu = document.getElementById('opcion');
const home = document.getElementById('home');
const acopio = document.getElementById('acopio');
const main = document.getElementById('content');
console.log(main)

menu.addEventListener('click',(e)=>{
  main.innerHTML = '<h1>PÁGINA ACOPIO</h1>'
  console.log("pagina acopio")
  console.log(e);
});
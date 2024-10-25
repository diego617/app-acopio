
const acopio = document.querySelector('ul');
const main = document.getElementById('content');
console.log(main)

acopio.addEventListener('click',()=>{
  main.innerHTML = '<h1>PÁGINA ACOPIO</h1>'
  console.log("pagina acopio")
});
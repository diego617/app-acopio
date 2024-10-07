const contrato = {
  productorExp:"Florida",
  acopioQQ:250.00,
  acopioPre:169.87,
  ventaQQ:434.78,
  avance: null,
  centroCos:"FPCONT012",
  contrato:"102970",
  cliente:"BLASER",
  certificado:"Organic Fairtrade",
  FechaEmb:"01/08/2023",
  estatusFijacion:"Fijado",
  nivelFijacion:156.35,
  diferencial:54.00,
  precioFinal:210.35,
  estatusEmb:"Embarcado"
}
const table = document.querySelector('#table-content');
const row = table.insertRow(0);
const avance = ((contrato.acopioQQ / contrato.ventaQQ)*100).toFixed(0);

function listarContrato(){
  const i = 0;
  const cell = row.insertCell(0);
  const cell1 = row.insertCell(1);
  const cell2 = row.insertCell(2);
  const cell3 = row.insertCell(3);
  const cell4 = row.insertCell(4);
  const cell5 = row.insertCell(5);
  const cell6 = row.insertCell(6);
  const cell7 = row.insertCell(7);
  const cell8 = row.insertCell(8);
  const cell9 = row.insertCell(9);
  const cell10 = row.insertCell(10);
  const cell11 = row.insertCell(11);
  const cell12 = row.insertCell(12);
  const cell13 = row.insertCell(13);
  const cell14 = row.insertCell(14);
  cell.innerHTML = contrato.productorExp;
  cell1.innerHTML = contrato.acopioQQ;
  cell2.innerHTML = contrato.acopioPre;
  cell3.innerHTML = contrato.ventaQQ;
  cell4.innerHTML = `<progress max="100" value="${avance}"></progress> <span>${avance}%</span`;
  cell5.innerHTML = contrato.centroCos;
  cell6.innerHTML = contrato.contrato;
  cell7.innerHTML = contrato.cliente;
  cell8.innerHTML = contrato.certificado;
  cell9.innerHTML = contrato.FechaEmb;
  cell10.innerHTML = contrato.estatusFijacion;
  cell11.innerHTML = contrato.nivelFijacion;
  cell12.innerHTML = contrato.diferencial;
  cell13.innerHTML = contrato.precioFinal;
  cell14.innerHTML = contrato.estatusEmb;
}
listarContrato()

/*for(let i in contrato){
  const cell = row.insertCell(-1);
  cell.innerHTML = contrato[i]; 
  if(cell.innerHTML === ''){
      //cell.classList.add('pg');
      //const progress = document.createElement('progress');
      cell.innerHTML = `<progress max="100" value="${avance}">`
     /*const progress = document.createElement('progress')
      cell.classList.add('pg');
      div.classList.add('div')
      cell.innerHTML = div;
      cell.style.width = '160px'
      cell.appendChild(div)
      div.style.width = w
      console.log(w)
      div.innerHTML = avance*/
 // }
//}*/

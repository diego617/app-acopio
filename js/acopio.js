
function agruparAcopioMes(acopio){
  let acopioMes = {};
  const nameMes = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Set','Oct','Nov','Dic']
 
  let acopioAlmacen = {
    almacenFlorida: {acopio: null,compra:null},
    almacenYurinaki: {acopio: null,compra:null}
  }
  acopio.forEach(element => {
    let [year,month] = element.apfacturafecha.split("-");
    let fecha = new Date(year, month -1);
    let mes  = nameMes[fecha.getMonth()];
    let kilosNetos = element.apfacturaapneto
    let totalSoles = element.apfacturatotal
    if(!acopioMes[mes]){
      acopioMes[mes] = {
        kilosNetos:0,
        totalSoles:0
      };
    }
    acopioMes[mes].kilosNetos += kilosNetos;
    acopioMes[mes].totalSoles += totalSoles;

    if(element.almacennombre === 'ALMACEN PERGAMINO LA FLORIDA'){
      acopioAlmacen.almacenFlorida.acopio += kilosNetos;
      acopioAlmacen.almacenFlorida.compra += totalSoles;
    }else{
      acopioAlmacen.almacenYurinaki.acopio += kilosNetos;
      acopioAlmacen.almacenYurinaki.compra += totalSoles;
    }
    
    
  });
  mostrarAcopioMes(acopioMes)   
  mostrarAcopioAlmacen(acopioAlmacen); //,comFlorida,aYurinaki,comYurinaki
  //console.log(acopioAlmacen);
}

function mostrarAcopioMes(acopioMes){
  const table = document.getElementById('table-content');
  let sumaTotalAcopio = 0;
  let sumaTotaCompra = 0;
  let promedio = 0;
  const array = []
    
  for(const[key,datos] of Object.entries(acopioMes)){
    const tr = document.createElement('tr');
    const precioPromedio = datos.totalSoles / datos.kilosNetos;
    const meses = document.createElement('td');
    const kg = document.createElement('td');
    const precio = document.createElement('td');
    const total = document.createElement('td');
    tr.appendChild(meses).textContent = key;
    tr.appendChild(kg).textContent = datos.kilosNetos.toLocaleString('en-US');
    tr.appendChild(precio).textContent = precioPromedio.toFixed(2);
    tr.appendChild(total).textContent = datos.totalSoles.toLocaleString('en-US');
    sumaTotalAcopio += datos.kilosNetos;
    sumaTotaCompra += datos.totalSoles;
    table.appendChild(tr)
  }
  let sumaTotal = document.createElement('tr');
  promedio = sumaTotaCompra / sumaTotalAcopio
  array.push('TOTAL',sumaTotalAcopio,promedio,sumaTotaCompra);
  
  for(let value of array){
    let td = document.createElement('td');
    if( typeof value == 'number'){
      sumaTotal.appendChild(td).textContent = value.toLocaleString('en-US');
    }else{
      sumaTotal.appendChild(td).textContent = value
    }
    table.appendChild(sumaTotal)
  }
}

function mostrarAcopioAlmacen(acopioAlmacen){ 
  const tbody = document.getElementById('ingreso-almacen');
  let resulado = []
  const arr = ['ALMACEN FLORIDA','ALMACEN YURINAKI'];
  let i = 0
  let cant = 0;
  for(const[index,data] of Object.entries(acopioAlmacen)){
    const promedio  = data.compra / data.acopio;
    console.log(promedio)
    const tr = document.createElement('tr');
    const almacen = document.createElement('td');
    const cantidad = document.createElement('td');
    const td = document.createElement('td');
    const compra = document.createElement('td');
    tr.appendChild(almacen).textContent = arr[i];
    tr.appendChild(cantidad).textContent = data.acopio.toLocaleString('en-US');
    tr.appendChild(td).textContent = promedio.toLocaleString('en-US');
    tr.appendChild(compra).textContent = data.compra.toLocaleString('en-US');
    tbody.appendChild(tr);
    i++;
    cant += data.acopio;
    resulado[0] = cant;
  }
  console.log(resulado);
}

async function acopio(){
  try {
    const response  = await fetch('./db/acopio2024.json');
    const acopio = await response.json();
    agruparAcopioMes(acopio);
  } catch (error) {
     console.error(error)
  }
}
acopio()

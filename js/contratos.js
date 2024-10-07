const table = document.getElementById('table-content');

function listTable(data){
  data.forEach(element => {
    const tr = document.createElement('tr');
    const avance = ((element.acopioQQ) / element.ventaQQ * 100).toFixed(0);
    Object.values(element).forEach((value,index) =>{
      const td = document.createElement('td');
      if(value === null){
        const span = document.createElement('span');
        td.classList.add('pg');
        const posgress = document.createElement('progress');
        span.textContent = avance + "%";
        td.appendChild(span);
        posgress.max = 100;
        posgress.value = avance;
        td.appendChild(posgress)
      }else{
        if(typeof value === 'number'){
          console.log(value);
          td.textContent = value.toFixed(2);
        }else{
          td.textContent = value;
        }
      }
      tr.appendChild(td);
    });
    table.appendChild(tr)
  });
}

async function conexionJson(){
  try {
    const response = await fetch('../db/db.json');
    const data = await response.json();
    listTable(data);    
  } catch (error) {
    console.error(error);
  } 
}
conexionJson()
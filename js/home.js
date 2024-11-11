
export function showTable(){
  const tbody = document.querySelector('.table-content');
  const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Set','Oct','Nov','Dic']
  if(tbody){
    tbody.innerHTML = '';
    for(let row of months){
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      tr.appendChild(td).textContent = row;
      //console.log(row)
      tbody.appendChild(tr);
    }
  }else{
    console.error("No se encuentra el elemento tbody")
  }
}



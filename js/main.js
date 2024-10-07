//const ul = document.querySelector('ul')
const table = document.getElementById('table-content')


async function ListAllProducto() {
  try {
      const res = await  fetch('../db/db.json');
      if(!res.ok){
        throw new console.error(`response status: ${res.status}`);
      }
      const json = await res.json();
      json.forEach(element => {
        const tr = document.createElement('tr');
        const avance = ((Object.values(element)[1] / Object.values(element)[3])*100).toFixed(0)
        Object.values(element).forEach((value,index) => {
          const td = document.createElement('td');
          if(value === null){
            const span = document.createElement('span')
            const progress = document.createElement('progress')
            td.appendChild(span).textContent = avance +' %'
            progress.max = 100
            progress.value = avance
            td.appendChild(progress)
          }else{
            td.textContent = value;
          }
          tr.appendChild(td);
        });
        table.appendChild(tr);
      });
  } catch (error) {
      console.error(error);
  }
}
ListAllProducto()


function groupMonth(data){
  const nameMonth = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Set','Oct','Nov','Dic']
  let months = {};
  data.forEach(value => {
    const [year,month] = value.apfacturafecha.split('-');
    const date = new Date(year,month -1);
    const groupDate = nameMonth[date.getMonth()];
    let acopio = value.apfacturaapneto
    months[groupDate] = "dd"
    console.log(acopio)
});
}


async function conexionAcopio() {
  try {
    const res = await fetch('./db/acopio2024.json');
    const data = await res.json();
    groupMonth(data)
  } catch (error) {
    console.error(error);
  }
    
}

conexionAcopio()
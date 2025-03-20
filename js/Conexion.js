/*const datos = [
  {fecha:"2024-01-15",total: 50 },
  {fecha:"2024-02-20",total: 100 },
  {fecha:"2024-02-01",total: 150},
  {fecha:"2024-03-01",total: 80}
]
let obj = {}
const array = ['Ene','Feb','Mar']

datos.forEach(element => {
  const [year,month,day] = element.fecha.split('-');
  let fechas = new Date(year,month -1,day)
  //console.log(fechas);
  let mes = array[fechas.getMonth()];
  let total = element.total
  
  if(!obj[mes]){
    obj[mes] = {total:0}
  }
  obj[mes].total += total

});
//console.log(obj);

const filtrar = array.filter((ms) => ms === 'Ene');
//console.log(filtrar)


let a = 152;
let b = 150;

//producto[almacenFlorida].acopioF = a;
//producto.almacenFlorida.acopioF = a;
//producto.almacenYurinaki.acopioY = b
//producto[almacenYurinaki].acopioY = b;

let acopioAlmacen = {}
acopioAlmacen.name = {number:10};
let arr = ['Alamcen1','Almacen2','Alamcen3']
let index = 0;
let renplazar = 0;
for(const value in acopioAlmacen){
  renplazar = arr[index]
  index++;
  console.log(value)
}
//console.log(acopioAlmacen)

let person = {}
person.Name;
person.Name = {name1: "diego"}
//console.log(person)

function operacion(num1,num2){
  let res = num1 * num2;
  return res;
}

let resultado = operacion(10,5);
let resultado2 = operacion(10,6);
let resultado3 = operacion(8,5);

console.log(resultado);
console.log(resultado2);
console.log(resultado3);*/




/*async function getAll(){
  try {
    const res = await fetch('../db/acopio_pergamino.json');
    const data = await res.json()
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}
getAll()*/


class ConexionJSON{
  constructor(){
    this.url = '../db/acopio_pergamino.json';
    this.months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Set','Oct','Nov','Dic'];
  }
  async conexion() {
    try {
      const res = await fetch(this.url);
      if(!res.ok){
        throw new error(`Error al obtener los datos json ${res.status}`);
      }
      return await res.json();
    } catch (error) {
      console.error("Error de conexion",error)
    }
  }
  async getAllIncomeByMonth(){
    const data = await this.conexion()
    try {
      
    } catch (error) {
      console.log("Error getAllIncomeByMonth",error)
    }
  }
}

async function getAllIncomeByMonth(){
  const conexion =  new ConexionJSON();
  const datos = await conexion.getData();
  console.log(datos);
}
getAllIncomeByMonth()








  






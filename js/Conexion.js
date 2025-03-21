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


export default class Conexion{
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
    const data = await this.conexion();
    let acopio = {};
    try {
      data.forEach(value => {
        const year = value.periodo;
        const month = this.months[value.mes - 1];
        //console.log("#:",month);
        if(!acopio[year]){
          acopio[year] = {};
        }
        if(!acopio[year][month]){
          acopio[year][month] = {kilos_netos:0,total_compra:0};
        }
        acopio[year][month].kilos_netos += value.apfacturaapneto;
        acopio[year][month].total_compra += value.apfacturatotal;
      });
      Object.keys(acopio).forEach(index =>{
        this.months.forEach(mes =>{
          if(!acopio[index][mes]){
            acopio[index][mes] = {kilos_netos:0,total_netos:0}
          }
        });
      });
      return acopio;
    } catch (error) {
      console.log("Error getAllIncomeByMonth",error);
    }
  }
  async getAllIncomeByWarehouse(){
    const data = await this.conexion();
    let warehouse = {};
    data.forEach(value => {
      const year = value.periodo;
      const codAlmacen = value.almacencodigo;
      if(!warehouse[year]){
        warehouse[year] = {};
      }
      if(!warehouse[year][codAlmacen]){
        warehouse[year][codAlmacen] = {kilos_netos:0,total_compra:0};
      }
      warehouse[year][codAlmacen].kilos_netos += value.apfacturaapneto;
      warehouse[year][codAlmacen].total_compra += value.apfacturatotal;
    });
    return warehouse;
  }
}

/*const conexion =  new ConexionJSON();
conexion.getAllIncomeByMonth();
conexion.getAllIncomeByWarehouse();*/









  






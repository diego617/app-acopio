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
            acopio[index][mes] = {kilos_netos:0,total_compra:0}
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
    try {
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
    } catch (error) {
      console.log("Error en getAllIncomeByWarehouse");
    }
  }
  async lastMonth(){
    const data = await this.conexion();
    let last = 0;
    try {
      data.forEach(value =>{
        last =  value.mes;
      });
      //console.log(last);
      return last;
    } catch (error) {
      console.error("error en funcion lastMonth")
    }
  }
}

/*const conexion =  new Conexion();
conexion.lastMonth();
//conexion.getAllIncomeByWarehouse();*/









  







/*export default class ConexionJson{
	async getData(){
		try {
			const response = await fetch('../db/acopio2024.json');
			if(!response.ok){
				throw new Error(`Error de solicitud ${response.status}`);
			}
			const data = await response.json();
			return data;
		} catch (error) {
			console.error(error);
		}
	}
}*/

export default class Connect{
	constructor(){
		this.url = '../db/acopio2024.json';
		this.nameMonth = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Set','Oct','Nov','Dic'];
		this.acopioMonth = {};
		this.acopioAlmacen = {};
	}
	async connectJson(){
		try {
			const response = await fetch(this.url);
			if(!response.ok){
				throw new Error(`Error de solicitud ${response.status}`);
			}
			return await response.json();
			//console.log(this.data)
		} catch (error) {
			console.error(error);
			return null;
		}
	}
	async getIncomeMonths(){
		const data = await this.connectJson();
		try {
			data.forEach(items => {
				const [year,month] = items.apfacturafecha.split('-');
				const date = new Date(year,month -1);
				const groupMonth = this.nameMonth[date.getMonth()];
				if(!this.acopioMonth[groupMonth]){
					this.acopioMonth[groupMonth] = {kilos_netos: 0, total_compra:0}
				}
				this.acopioMonth[groupMonth].kilos_netos += items.apfacturaapneto;
				this.acopioMonth[groupMonth].total_compra += items.apfacturatotal;
			})
			console.log(this.acopioMonth);
			return this.acopioMonth;
		} catch (error) {
			console.error("Error en getIncomeMonths",error);
			throw error;
		}
		
	}
	async getIncomeAlmacen(){
		const data = await this.connectJson();
		try {
			data.forEach(items =>{
				if(!this.acopioAlmacen['almacenflorida']){
					this.acopioAlmacen['almacenflorida'] = {kilos_netos: 0, total_compra:0}
					this.acopioAlmacen['almacenyurinaki'] = {kilos_netos: 0, total_compra:0}
				}
				if(items.almacennombre === 'ALMACEN PERGAMINO LA FLORIDA'){
					this.acopioAlmacen['almacenflorida'].kilos_netos += items.apfacturaapneto;
					this.acopioAlmacen['almacenflorida'].total_compra += items.apfacturatotal;
				}else{
					this.acopioAlmacen['almacenyurinaki'].kilos_netos += items.apfacturaapneto;
					this.acopioAlmacen['almacenyurinaki'].total_compra += items.apfacturatotal;
				}
			})
			return this.acopioAlmacen;
			
		} catch (error) {
			console.error("Error en getIcomeAlmacen",error)	
		}
	}
}
const acopio =  new Connect();
acopio.getIncomeMonths();
//acopio.getIncomeAlamcen()
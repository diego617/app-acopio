
export default class Connect{
	constructor(){
		this.url = '../db/acopio2024.json';
		this.nameMonth = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Set','Oct','Nov','Dic'];
		this.acopioMonth = {};
		this.acopioAlmacen = {};
		this.orderByMonth = {};
		//this.lastMonth = Math.max(...data.map(item => new Date(item.apfacturafecha).getMonth()));
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
	async getIncomeByMonths(){
		const data = await this.connectJson();
		try {
			data.forEach(items => {
				const [year,month] = items.apfacturafecha.split('-');
				const date = new Date(year,month -1);
				const groupMonth = this.nameMonth[date.getMonth()];
				const anio = date.getFullYear();
				if(!this.acopioMonth[groupMonth]){
					this.acopioMonth[groupMonth] = {kilos_netos: 0, total_compra:0,periodo:0}
				}
				this.acopioMonth[groupMonth].kilos_netos += items.apfacturaapneto;
				this.acopioMonth[groupMonth].total_compra += items.apfacturatotal;
				
			})
			this.nameMonth.forEach(month =>{
				if(!this.acopioMonth[month]){
					this.acopioMonth[month] = {kilos_netos:0,total_compra:0};
				}
			});
			
			this.nameMonth.forEach(months=>{
				this.orderByMonth[months] = this.acopioMonth[months]
			});
			//console.log(this.orderByMonth);
			return this.orderByMonth;
		} catch (error) {
			console.error("Error en getIncomeMonths",error);
			throw error;
		}	
	}
	async getAllIncomeByYear() {
    const data = await this.connectJson();
    try {
        let acopioPorAnio = {}; // Nuevo objeto para separar por año

        data.forEach(items => {
            const [year, month] = items.apfacturafecha.split('-');
            const date = new Date(year, month - 1);
            const groupMonth = this.nameMonth[date.getMonth()];
            const anio = date.getFullYear();

            // Si el año no existe en el objeto, lo creamos
            if (!acopioPorAnio[anio]) {
                acopioPorAnio[anio] = {};
            }

            // Si el mes no existe dentro del año, lo inicializamos
            if (!acopioPorAnio[anio][groupMonth]) {
                acopioPorAnio[anio][groupMonth] = { kilos_netos: 0, total_compra: 0 };
            }

            // Sumamos los valores
            acopioPorAnio[anio][groupMonth].kilos_netos += items.apfacturaapneto;
            acopioPorAnio[anio][groupMonth].total_compra += items.apfacturatotal;
        });

        // Aseguramos que todos los meses existan en cada año
        Object.keys(acopioPorAnio).forEach(year => {
            this.nameMonth.forEach(month => {
                if (!acopioPorAnio[year][month]) {
                    acopioPorAnio[year][month] = { kilos_netos: 0, total_compra: 0 };
                }
            });
        });

        return acopioPorAnio; 
    } catch (error) {
        console.error("Error en getIncomeMonths", error);
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
	async lastMonthsAcopio(){
		const data = await this.connectJson();
		try {
			const lastMonth = Math.max(...data.map(item => new Date(item.apfacturafecha).getMonth()));
			return lastMonth;
		} catch (error) {
			console.error("Error al obtener el último mes de registro",error)
		}
	}
}
/*const acopio =  new Connect();
acopio.getIncomeMonths();
//acopio.getIncomeAlamcen()*/
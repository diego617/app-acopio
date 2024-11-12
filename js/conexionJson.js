
export default class ConexionJson{
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
}
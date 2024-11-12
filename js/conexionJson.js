

export async function conexionJson(){
	try {
		const reponse = await fetch("../db/acopio2024.json");
		const data = await reponse.json();
		data.forEach(element => {
			return element;
		});
		//return data;
		//console.log(data);
	} catch (error) {
		console.error(error);
	}
}
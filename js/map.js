const arr = ['1','2','4','0'];
const obj = {key:{id:"05dfx85",product:"Laptop"},
            key2:{id:'fdf884t6#$',product:"Impresora"}}
let ar = Object.values(obj).map(index => index.product);

//console.log(ar);

/*function maps(){
  const mayor = Math.max(...array.map(item => {
    /*if(item >= 100){
      let ms = "El mumero mayo es: "+ item
      return console.log(ms);
      }else{
        console.log("El numero es diferente.....!")
    }
    return item;
    }))
    console.log("El número mayor es:",mayor);
    }*/
   //maps()
   
const array = [10,85];
function last(){
  array.forEach((item,index)=>{
    let res1 = item
    console.log(item,index);
    if(index){}
  })
}
last()



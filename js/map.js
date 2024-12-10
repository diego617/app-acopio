const arr = ['1','2','4','0'];
const obj = {key:{id:"05dfx85",product:"Laptop"},
            key2:{id:'fdf884t6#$',product:"Impresora"}}
let ar = Object.values(obj).map(index => index.product);

console.log(ar);
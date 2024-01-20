// tên: Lâm Chí Thoại MSSV: PC06821
// =================Bài 1============================
var multiply = (num1,num2) => num1*num2;
console.log(multiply(3,2));

var toCelsius = (fahrenheit) => (5/9)  * (fahrenheit-32);
console.log(toCelsius(2));

var padZeros = (num, totalLen) => {
    var numStr = num.toString();
    var numZeros = totalLen - numStr.length;
    for(var i = 1;i<= numZeros; i++){
        numStr = "0" + numStr;
    }
    return numStr;
}
console.log(padZeros(3,2));

var power = (base, exponent) => {
    var result = 1;
    for (var i = 0; i < exponent; i++){
        result  *=  base;
    }
    return result;
}
console.log(power(2,4));

var greet = (who) => {
    console.log(`Hello ${who}`);
}
greet('thoailcpc06821');
// ======================Bài 2===================
var arr = [1,2,3,4,5,6,7];
var sumArray = () =>{
        let sum = 0;
        arr.forEach(element => {
          sum += element;
        });
        return sum;
}
console.log(sumArray(arr));
// =======================Bài 3=================
var Entity = function (name,delay){
    this.name = name;
    this.delay = delay;
}
Entity.prototype.greet = function(){
    setTimeout(() =>{
        console.log('Xin chào, tên tôi là ', this.name);
    },this.delay);
}
var java = new Entity('Java', 500);
var cpp = new Entity('C++', 30);
java.greet();
cpp.greet();
// ====================Bài 4=======================
var findMaxandMin = (num1,num2,num3) => {
    var num1 = parseFloat(prompt("Nhập số thứ nhất: "));
    var num2 = parseFloat(prompt("Nhập số thứ hai: "));
    var num3 = parseFloat(prompt("Nhập số thứ ba: "));
    var max;
    var min;
    if (isNaN(num1) || isNaN(num2) || isNaN(num3)) {
        alert("Vui lòng nhập vào các số hợp lệ.");
        return;
    }
    if(num1 > num2 && num1 > num3){
        max = num1;
    }else if(num2 > num1 && num2 > num3){ 
        max = num2;
    }else{
        max = num3;
    }
    if(num1 < num2 && num1 < num3){
        min = num1;
    }else if(num2 < num1 && num2 < num3){ 
        min = num2;
    }else{
        min = num3;
    }
    alert(`Số lớn nhất là ${max} Số bé nhất là ${min}`);
    console.log(`Số bé nhất là: ${min}`);
    console.log(`Số lớn nhất là: ${max}`);
};  
findMaxandMin();
// ===================Bài 5================
const convertTemperature = (temperature,unit) => {
    const temperature = parseFloat(prompt("Nhập nhiệt độ:"));
    const unit = prompt("Nhập đơn vị nhiệt độ (C hoặc F):");

    if (isNaN(temperature) || (unit !== "C" && unit !== "F")) {
        alert("Nhập không hợp lệ. Vui lòng thử lại.");
        return;
    }

    let result;

    if (unit === "C") {
        result = (temperature * 9/5) + 32;
        alert(`Nhiệt độ ${temperature} C tương đương với ${result.toFixed(2)} F.`);
    } else {
        result = (temperature - 32) * 5/9;
        alert(`Nhiệt độ ${temperature} F ${result.toFixed(2)} C.`);
    }
};
convertTemperature();


// var funcs = [],
//   object = {a: true, b: true, c: true};
// for(let key in object){
//   funcs.push(function(){
//     console.log(key);
//   });
// }
// funcs.forEach(function(func){
//   func();
// });
// ====================================
// let a = 3;
// let b = new Number(3);
// let c = 3;
// =====================================
// console.log(a == b);
// console.log(a === b);
// console.log(b === c);
// =====================================
// var foo = {
//     bar: {
//         deep: 'pony',
//         smile: 'lol'
//     }
// };
// var {bar: {deep, smile: sure}} = foo;
// console.log(deep);
// console.log(sure);
// =====================================
// var mixed = {
//     one: 1,
//     two: 2,
//     values: [3,4,5,6]
// };
// var {
//     one: a,
//     two: b,
//     values: [c,d,,e,]
// } = mixed;
// console.log(a,b,d,c,e);
// =======================================
// function mixed(){
//     return{
//         one: 1,
//         two: 2,
//         values: [3,4,5,6]
//     };
// }
// var {
//     one: a,
//     two: b,
//     values: [c,,e,f]
// } = mixed();
// console.log(a,b,c,e,f);
// =========================================
// let a = [1,2,3].map(num =>num*2);
// console.log(a);
// var sum1 = function (num1,num2){
//     return num1 + num2;
// };
// // 
// var sum2 = (num1, num2) => num1 + num2;
// // 
// var hieu1 = (num1, num2) => num1 - num2;

// var hieu2 = function(num1,num2){
//     return num1 -num2;
// };
// // 
// var tich1 = function (num1,num2){
//     return num1 * num2;
// };

// var tich2 = (num1,num2) => num1 * num2;
// // 
// var thuong1 = function(num1,num2){
//     return num1 / num2;
// }

// var thuong2 = (num1, num2) => num1/ num2;

// console.log(sum2(2,3));

// var maxnum = (num1,num2,num3) => {
//     var max;
//     if(num1 > num2 && num1 > num3){
//         max = num1;
//     }else if(num2 > num1 && num2 > num3){ 
//         max = num2;
//     }else if(num3 > num2 && num3> num1){
//         max = num3;
//     }
//     console.log(`Số lớn nhất là: ${max}`);
// };
// var minnum = (num1,num2,num3) => {
//     var min;
//     if(num1 < num2 && num1 < num3){
//         min = num1;
//     }else if(num2 < num1 && num2 < num3){ 
//         min = num2;
//     }else if(num3 < num2 && num3 < num1){
//         min = num3;
//     }
//     console.log(`Số bé nhất là: ${min}`);
// };
// maxnum(1,2,3);
// minnum(1,2,3);
// 
// let multiply = (num1,num2) => num1*num2;
// function* swimming (number){
//     yield number;
//     yield number +2;
//     yield number +5;
// }
// let s = swimming(10);
// console.log(s.next());
// console.log(s.next());
// console.log(s.next());
// console.log(s.next());
// let getCountdownIterator = function* (){
//     let i = 10;
//     while(i>1){
//         yield -- i;
//     }
// }
// console.log([...getCountdownIterator()]);
// var x = `foo ${y}`,
// y = `bar ${x}`;

// console.log(x);
// var arr = ["B",, "c", "k"];
// var [first, second] = arr;
// console.log(second);

// ==============================================
// var promise = new Promise(function (resolve,reject){
//     const x = "1";
//     const y = "1"
//     if (x === y){
//         resolve(x);
//     }else{
//         reject(y);
//     }
// });
// var promise = new Promise((resolve,reject) => {
//     const x = "1";
//     const y = "1"
//     if (x === y){
//         resolve(x);
//     }else{
//         reject(y);
//     }
// });
// var success = () =>{
//     console.log('Success');
// }
// var fail = () =>{
//     console.log('Some arrow has occupured');
// }
// promise 
//     .then(success)
//     .catch(fail);
// var promise = new Promise((resolve,reject)) => {
//     const x  =
// }

// function multiply(a, b = 1) {
//     return a * b;
//     }
    
//     console.log(multiply(5));
    // let promise = new Promise((resolve, reject) => {
    //     setTimeout(() => resolve("Promiss 1!"), 2000)
    // });

    // let promise2 = new Promise((resolve, reject) => {
    //     setTimeout(() => resolve("Promiss 2!"), 1000)
    // });
    // promise.then(
    //     function (value) {
    //         console.log(value);
    //     }
    // )
    // promise2.then(
    //     function (value) {
    //         console.log(value);
    //     }
    // )
// function Person(first, last, age, eye){
//     this.firstName = first;
//     this.lastName = last;
//     this.age = age;
//     this.eyeColor = eye;
// }
// function Car (){
//     this.fuel = 0;
//     this.distance = 0;
// }
// Car.prototype.move = function(){
//     if(this.fuel < 1){
//         throw new RangeError('Hết xăng rồi');
//     }
//     this.fuel--
//     this.distance +=2
// }
// Car.prototype.addFuel = function(){
//     if(this.fuel >=60){
//         throw new RangeError('Xe đã đầy xăng');
//     }
//     this.fuel++
// }
// var car = new Car();
// car.addFuel();
// car.move();
class Car{
    constructor(brand){
        this.carname =  brand;
    }
    present(){
        return 'I have a '+ this.carname;
    }
}
class Model extends Car{
    constructor(brand,mod){
        super(brand);
        this.model = mod;
    }
    show(){
        return this.present() + ', it is a' + this.model;
    }
}
mycar = new Model("Ford","minivan");
console.log(mycar.show( ));

class  Student{
    constructor(cro,fname,lname){
        this.cro = cro ;
        this.fname = fname;
        this.lname = lname;
            console.log("Bên trong hàm khởi tạo");
    }
    set rollno(newRollno){
        console.log("Bên trong Setter");
        this.rno = newRollno
    }
}
let s1 = new Student(101,'Đạt','Thiện');
console.log(s1);
s1.rollno = 201;
console.log(s1);
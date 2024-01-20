console.log("Buổi 2");
let dog = {
    name: "JavaScript",
    sua: function(){
        console.log("gau gau gau");
    },
    age: 3
};
let array = [
    "Javascript",
    "PHP",
    "C#"
];
[js, php, csharp] =  array;
console.log(js);
let student = {
    category: {
        id: 1235,
        course: "Toán"
    },
    
    id: "PC06821",
    name: "Lam Chi Thoai",
    subject: {
        id: 123123,
        course: "Toán"
    }
}
let {id: id_student,name: name_student, subject:{id,name}} = student;
console.log(id);
console.log(student.id);
console.log(newArray);
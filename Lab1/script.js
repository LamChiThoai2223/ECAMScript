// Lâm Chí Thoại MSSV: PC06821
// -----------bài 2---------------
let sayHello = (name, tuoi) => {
    return `I'm ${name} I'm ${tuoi}. `
}
console.log(sayHello('Hùng', 23));
console.log(sayHello('Tuấn', 27));
// ----------bài 3---------------
fetch('https://api.agify.io?name=meelad')
    .then(function (response) {
        response.json().then(function (data) {
            let apiHtml = document.getElementById('api');
            console.log(data);
            let html = `
        <ul>
        <li>Count: ${data.count}</li>
        <li>Name: ${data.name}</li>
        <li>Age: ${data.age}</li>
        </ul>
        `;
            apiHtml.innerHTML = html;
        })
    })
    .catch(error => {
        console.error("Unexpected error:", error);
    });
// -----------------bài 1.4---------------------------
const API1 = "https://datausa.io/api/data?drilldowns=Nation&measures=Population";
const API2 = "https://65929f4fbb129707198fe18e.mockapi.io/tinhpv10/students";
fetch(API1)
    .then(function (response) {
        response.json().then(function (data) {
            console.log(data);
            let bodytable = document.getElementById('body');
            let list = data['data'];
            list.forEach(element => {
                let row = document.createElement("tr");
                row.innerHTML = `
                <td>${element["ID Nation"]}</td>
                <td>${element.Nation}</td>
                <td>${element.Year}</td>
                <td>${element.Population}</td>
            `;
                bodytable.appendChild(row);
            });
        });
    })
    .catch(error => {
        console.error("Fetch error (API1):", error);
    });
fetch(API2)
    .then(function (response) {
        response.json().then(function (data) {
            console.log(data);
            let bodytable = document.getElementById('body2');
            let list = data;
            list.forEach(element => {
                let row = document.createElement("tr");
                row.innerHTML = `
                <td>${element.id}</td>
                    
                <td>${element.name}</td>
                <td>${element.createdAt}</td>
            `;
                bodytable.appendChild(row);
            });
        });
    })
    .catch(error => {
        console.error("Fetch error (API2):", error);
    });
    

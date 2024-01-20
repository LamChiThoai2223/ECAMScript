// Lâm Chí Thoại MSSV: PC06821
// ====================Bài 1====================
const result = {
    success: ["max-lenght", "no-amd", "prefer-arrow-functions"],
    failure: ["no-var", "var-on-top", "linebreak"],
    skipped: ["no-extra-semi", "no-dup-keys"]
};
let apiHtml = document.getElementById('api');
function makeList(arr) {
    const failureItems = arr.map(item => `<li class="text-warning">${item}</li>`);
    return failureItems;
}

const failuresList = makeList(result.failure);
let html = `
    ${failuresList}
`;
  apiHtml.innerHTML = html;
// =============Bài 2======================
const source = [1,2,3,4,5,6,7,8,9,10];
function removeFirstTwo(list) {
const [a, b,...arr] = list; 
return arr;
}
const arr = removeFirstTwo(source);
console.log(arr);
console.log(source);
// =============Bài 3====================
const arr1 = ['JAN', 'FEB', 'MAR', 'APR', 'MAY']; 
let arr2;
arr2 = [...arr1];
console.log(arr2);
// ============Bài 4=========================
function spreadOut() {
    let fragment = ['to', 'code'];
    let sentence = ['learn',...fragment,'is','fun'];
    return sentence;
    }
    console.log(spreadOut());
// ==============Bài 5=======================
const API = {
    API1: 'https://datausa.io/api/data?drilldowns=Nation&measures=Population',
    API2: 'https://65929f4fbb129707198fe18e.mockapi.io/tinhpv10/students'
};
const { API1, API2 } = API;
const fetchData = (url, bodytable, template) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let bodytableElement = document.getElementById(bodytable);
            let list = template === 'API1' ? data['data'] : data;
            list.forEach(element => {
                let row = document.createElement("tr");
                if (template === 'API1') {
                    row.innerHTML = `
                        <td>${element["ID Nation"]}</td>
                        <td>${element.Nation}</td>
                        <td>${element.Year}</td>
                        <td>${element.Population}</td>
                    `;
                } else {
                    row.innerHTML = `
                        <td>${element.id}</td>
                        <td><img src="${element.avatar}" alt=""></td>
                        <td>${element.name}</td>
                        <td>${element.createdAt}</td>
                    `;
                }
                bodytableElement.appendChild(row);
            });
        })
        .catch(error => {
            console.error(`Fetch error (${template}):`, error);
        });
};
fetchData(API1, 'body', 'API1');
fetchData(API2, 'body2', 'API2');
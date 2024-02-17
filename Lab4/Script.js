// // =================Bài 1==================
// let promise = new Promise(function(resolve,reject){
//     resolve(1);
//     setTimeout(() =>resolve(2),1000);
// });
// promise
// .then(alert);
// // // =================Bài 2=================
// const axios = require('axios');
// 1
// async function fetchUrls(urls){
//     const results = [];
//     for (const url of urls) {
//         const res = await axios.get(url);
//         results.push(res);
//     }
//     return results;
// }
// fetchUrls('');
// // 2
// async function fetchUrlsParallel(urls){
//     const results = await Promise.all(
//         urls.map(function(url){
//             return axios.get(url);
//         })
//     );
//     return results;
// }
// // ==============Bài 3===========
// const fs = require('fs').promises;
// const axios = require('axios');
// async function fetchData() {
//     try {
//         const data = await fs.readFile('db.json', {
//             encoding: 'utf8'
//         });
//         console.log('Data loaded from disk:', data);
//         const response = await axios.get('https://65929f4fbb129707198fe18e.mockapi.io/tinhpv10/students');
//         console.log('Data downloaded from url:', response.data);
//     } catch (error) {
//         console.error('Error:', error.message);
//     }
// }
// fetchData();
// // ============Bài 4==================
// async function runPromises() {
//     try {
//       const result1 = await new Promise((resolve, reject) => {
//         setTimeout(() => resolve("Promise 1!"), 2000);
//       });
//       console.log(result1);
//       const result2 = await new Promise((resolve, reject) => {
//         setTimeout(() => resolve("Promise 2!"), 1000);
//       });
  
//       console.log(result2);
//     } catch (error) {
//       console.error('Error:', error.message);
//     }
//   }
//   runPromises();
  


  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Promiss 1!"), 2000)
});

let promise2 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Promiss 2!"), 1000)
});

promise.then(
    function (value) {
        console.log(value);
    }
)
promise2.then(
    function (value) {
        console.log(value);
    }
)

async function promiseAll(){
    
} 
// //trailer
// // class User{
// //     constructor(){
// //         this.name = "Phan Văn Tèo";
// //         this.password = "123718237";
// //         this.email = "tinhpv10@fpt.edu.vn"
// //     }
// // }

// // let student = new User;

// // console.log(`Xin chào bạn nhỏ, ${student.name}`);

// // class User{
// //     constructor(name, password, email){
// //         this.name = name;
// //         this.password = password;
// //         this.email = email;
// //     }

// //     login(email){
// //         this.email = email;
// //         console.log(`${this.email} login success!!`);
// //     }

// //     logout(){
// //         this.login("tinhpv10@fpt.edu.vn");
// //     }
// // }

// // const student = new User("Tèo","123456", "tinhpv11@fpt.edu.vn");

// // console.log(`Xin chào bạn nhỏ, ${student.name}`);

// // student.login();

// // student.email = "tinhpv12@fpt.edu.vn"

// // student.login();

// class User{
//     constructor(name, password, email){
//         this.name = name;
//         this.password = password;
//         this.email = email;
//     }
//     logout(){
//         console.log('Log out successfully');
//     }
// }

// class Student extends User{
//     constructor(name, password, email, phone){
//         super(name, password, email);
//         this.phone = phone;
//     }

//     learning(){
//         console.log(`${this.name} is learning!!!`);
//     }
// }

// // const student = new Student('Tính', '12345', 'tinhpv10@fpt.edu.vn');

// // student.login();
// // student.getInfo();
// // student.learning();
// // student.logout();

// // class Teacher extends User{
// //     constructor(name, password, email) {
// //         super(name, password, email);
// //         this.gpa = 4;
// //     }

// //     getGPA(){
// //         console.log(`My GPA is ${this.gpa}`);
// //     }

// //     feedback(gpa){
// //         // kiểm lỗi xong rồi
// //         this.gpa = gpa;
// //     }
// // }

// // const teacher = new Teacher('Tính', '12345', 'tinhpv10@fpt.edu.vn');

// // teacher.feedback(4);
// // teacher.getGPA();




// axios({
//   method: "get",
//   url: "https://public-api.advertisingvietnam.com/post-service/oapi/v1/posts?page=1",
// }).then(function (response) {
//   console.log(response.data.data);
// }).catch(function(error){

// });

// axios({
//     method: "get",
//     url: "https://localhost:3000/comments",
//   }).then(function (response) {
//     let data = response.data;
//     console.log(response.data);
//     // let html = '<ul>';
//     // data.forEach(element => {
//     //     html+=`<li>${element.body}</li>`;
//     // });
//     // html+= '</ul>';

//     // document.writeln(html);
//   });
  


// axios({
//     method: "post",
//     url: "http://localhost:3000/posts",
//     data: {
//         title: 'bài viết siêu hay 10 điểm',
//         author: 'Tính'
//     }
//   }).then(function (response) {
//     console.log(response);
//   });
  
//   axios({
//     method: "put",
//     url: "https://localhost:3000/posts/5",
//     data: {
//         title: 'Đây là bài viết số ',
//         author: 'Tính'
//     }
//   }).then(function (response) {
//     console.log(response);
//   });
  

  
// axios({
//     method: "get",
//     url: "https://localhost:3000/posts/2",
//   }).then(function (response) {
//     console.log(response.data);
//   });
  
    
// axios({
//     method: "delete",
//     url: "https://localhost:3000/posts/182378172381",
//   }).then(function (response) {
//     console.log(response.data);
//   });
  // Tạo một Intersection Observer
var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.5 }); // Threshold là ngưỡng xuất hiện, 0.5 nghĩa là phần tử sẽ được xem là nhìn thấy nếu ít nhất 50% của nó hiển thị trong trường nhìn.

// Chọn phần tử bạn muốn theo dõi
var targetElement = document.getElementById("observedElement");

// Bắt đầu theo dõi phần tử
observer.observe(targetElement);

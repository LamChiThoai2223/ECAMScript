// ===================Bài 1===================
class Info{
    constructor(name,age) {
      this.name = name;
      this.age = age;  
    }
  
    infoStudent() {
      console.log(`Họ và tên: ${this.name} Tuổi: ${this.age}`);
    }
  }
  
  const me = new Info("Lâm Chí Thoại",19);
  
  me.infoStudent();
// ====================Bài 2=====================
class Shape {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    move(x, y) {
        this.x = x;
        this.y = y;
    }
}
// =====================Bài 3====================
class Clock {
    constructor({ template }) {
        this.template = template;
        this.timer;
    }

    render() {
        let date = new Date();

        let hours = date.getHours();
        if (hours < 10) hours = '0' + hours;

        let mins = date.getMinutes();
        if (mins < 10) mins = '0' + mins;

        let secs = date.getSeconds();
        if (secs < 10) secs = '0' + secs;

        let output = this.template
            .replace('h', hours)
            .replace('m', mins)
            .replace('s', secs);

        console.log(output);
    }

    stop() {
        clearInterval(this.timer);
    }

    start() {
        this.render();
        this.timer = setInterval(() => this.render(), 1000);
    }
}

let clock = new Clock({ template: 'h:m:s' });
clock.start();
// ==================Bài 4========================
var person = {
    firstname: "Albert",
    lastname: "Einstein",
    setLastName: function (_lastname) {
        this.lastname = _lastname;
    },
    setFirstName: function (_firstname) {
        this.firstname = _firstname;
    },
    getFullName: function () {
        return "My name is: " + this.firstname + " " + this.lastname;
    },
};
person.setLastName('Newton');
person.setFirstName('Issac');
console.log(person.getFullName());
// ==================Bài 5=========================
class APICaller {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    async get(endpoint) {
        try {
            const response = await fetch(`${this.baseUrl}/${endpoint}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("Lỗi: ", error);
            throw error;
        }
    }
}
class Student {
    constructor(apiCaller) {
        this.apiCaller = apiCaller;
    }
    async getAll() {
        try {
            const students = await this.apiCaller.get("students");
            return students;
        } catch (error) {
            console.log("Lỗi: ", error);
            throw error;
        }
    }
    async getOne(studentId) {
        try{
            const student = await this.apiCaller.get(`students/${studentId}`)
            return student;
        }catch(error){
            console.log("lỗi", error);
            throw error;
        }
    }
}
const apiCaller = new APICaller("https://65929f4fbb129707198fe18e.mockapi.io/tinhpv10");
const studentService = new Student(apiCaller);
studentService.getAll().then((students) => console.log("Tất cả học sinh:", students));
studentService.getOne(5).then((student) => console.log("Học sinh thứ 5:", student));
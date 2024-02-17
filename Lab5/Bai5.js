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
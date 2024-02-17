class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password; 
    }
    login() {
        this.email = "thoailcpc06821@fpt.edu.vn";
        console.log(`${this.email} login success`);
    }
    getInfo(){
        console.log(this.name, this.email);
    }
    updateInfo(){

    }
    logOut(){
        console.log("Log out successfully");
    }
}
class Student extends User{
    constructor(name, password, email,gpa){
        super(name,password, email);
        this.gpa = 4;
    }
    learning(){
        console.log(`${this.name} is learning!!`);
    }
    feedback(gpa){
        this.gpa = gpa;
        if(gpa > 4 || gpa < 1){
            console.log("Phải nhập từ 1-4 oke!!");
        }else if(gpa % 2 !== 0){
            console.log("GPA phải là số chẵn");
        }else{
            console.log(`GPA của tôi ${gpa}`);
        }
    }
}
const student = new Student('Thoại', '12345', 'thoailcpc06821@fpt.edu.vn');
student.feedback(2);
student.login();
student.getInfo();
student.learning();
student.logOut();
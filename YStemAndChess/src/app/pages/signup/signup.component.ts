import { Component, OnInit } from '@angular/core';
import { createAotUrlResolver } from '@angular/compiler';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  link = null;
  private firstNameFlag = false;
  private lastNameFlag = false;
  private emailFlag = false;
  private userNameFlag = false;
  private passwordFlag = false;
  private retypeFlag = false;
  firstNameError = "";
  lastNameError = "";
  emailError = "";
  userNameError = "";
  passwordError = "";
  retypePasswordError = "";

  parentAccountFlag: boolean = false;
  numStudents = new Array();
  newStudents: any[] = [];
  newStudentFlag = false;
  studentFirstNameFlag = false;
  studentLastNameFlag = false;
  studentUserNameFlag = false;
  studentPasswordFlag = false;
  studentRetypeFlag = false;
  studentFirstNameError = "";
  studentLastNameError = "";
  studentUserNameError = "";
  studentPasswordError = "";
  studentRetypePasswordError = "";

  constructor() { }

  ngOnInit(): void {
  }

  firstNameVerification(firstName: any) {
    firstName = this.allowTesting(firstName, 'firstName');

    if (/^[A-Za-z]{2,15}$/.test(firstName)) {
      this.firstNameFlag = true;
      this.firstNameError = ""
      return true;
    } else {
      this.firstNameFlag = false;
      this.firstNameError = "Invalid First Name";
      return false;
    }
  }

  studentFirstNameVerification(firstName: any) {
    if (/^[A-Za-z]{2,15}$/.test(firstName)) {
      this.studentFirstNameFlag = true;
      this.studentFirstNameError = ""
      return true;
    } else {
      this.studentFirstNameFlag = false;
      this.studentFirstNameError = "Invalid First Name";
      return false;
    }
  }

  lastNameVerification(lastName: any) {

    lastName = this.allowTesting(lastName, 'lastName');

    if (/^[A-Za-z]{2,15}$/.test(lastName)) {
      this.lastNameFlag = true;
      this.lastNameError = ""
      return true;
    } else {
      this.lastNameFlag = false;
      this.lastNameError = "Invalid Last Name";
      return false;
    }
  }

  studentLastNameVerification(lastName: any) {

    lastName = this.allowTesting(lastName, 'lastName');

    if (/^[A-Za-z]{2,15}$/.test(lastName)) {
      this.studentLastNameFlag = true;
      this.studentLastNameError = ""
      return true;
    } else {
      this.studentLastNameFlag = false;
      this.studentLastNameError = "Invalid Last Name";
      return false;
    }
  }

  emailVerification(email: any) {

    email = this.allowTesting(email, 'email');

    if (/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/.test(email)) {
      this.emailFlag = true;
      this.emailError = "";
      return true;
    } else {
      this.emailFlag = false;
      this.emailError = "Invalid Email"
      return false;
    }
  }

  usernameVerification(username: any) {
    username = this.allowTesting(username, 'username');

    if (/^[a-zA-Z](\S){1,14}$/.test(username)) {
      //check username against database
      this.userNameFlag = true;
      this.userNameError = "";
      return true;
    } else {
      this.userNameFlag = false;
      this.userNameError = "Invalid Username";
      return false;
    }
  }

  studentUsernameVerification(username: any) {
    username = this.allowTesting(username, 'username');

    if (/^[a-zA-Z](\S){1,14}$/.test(username)) {
      //check username against database
      this.studentUserNameFlag = true;
      this.studentUserNameError = "";
      return true;
    } else {
      this.studentUserNameFlag = false;
      this.studentUserNameError = "Invalid Username";
      return false;
    }
  }

  passwordVerification(password: any) {
    password = this.allowTesting(password, 'password');

    if (password.length < 8) {
      this.passwordFlag = false;
      this.passwordError = "Invalid Password"
      return false;
    } else {
      //verify password with username
      this.passwordFlag = true;
      this.passwordError = "";
      return true;
    }
  }

  studentPasswordVerification(password: any) {
    password = this.allowTesting(password, 'password');

    if (password.length < 8) {
      this.studentPasswordFlag = false;
      this.studentPasswordError = "Invalid Password"
      return false;
    } else {
      //verify password with username
      this.studentPasswordFlag = true;
      this.studentPasswordError = "";
      return true;
    }
  }

  retypePasswordVerification(retypedPassword: any, password: any) {
    retypedPassword = this.allowTesting(retypedPassword, 'retypedPassword');
    password = this.allowTesting(password, 'password');

    if (retypedPassword === password) {
      this.retypeFlag = true;
      this.retypePasswordError = "";
      return true;
    } else {
      this.retypeFlag = false;
      this.retypePasswordError = "Passwords do not match"
      return false;
    }
  }

  studentRetypePasswordVerification(retypedPassword: any, password: any) {
    retypedPassword = this.allowTesting(retypedPassword, 'retypedPassword');
    password = this.allowTesting(password, 'password');

    if (retypedPassword === password) {
      this.studentRetypeFlag = true;
      this.studentRetypePasswordError = "";
      return true;
    } else {
      this.studentRetypeFlag = false;
      this.studentRetypePasswordError = "Passwords do not match"
      return false;
    }
  }

  checkIfValidAccount() {
    if (this.firstNameFlag === true && this.lastNameFlag === true && this.emailFlag === true
      && this.userNameFlag === true && this.passwordFlag === true && this.retypeFlag === true) {
      this.link = "/login";
      return true;
    } else {
      this.link = null;
      return false;
    }
  }

  checkIfValidStudentAccount(click, index) {
    if(this.studentLastNameFlag === true && this.studentUserNameFlag === true 
      && this.studentPasswordFlag === true && this.studentRetypeFlag === true) {
        this.link="/login";
        this.newStudents.push(this.addStudentToArray(click, index));
        console.log(this.newStudents);
        //set them all to false for future students
        this.studentFirstNameFlag = false;
        this.studentLastNameFlag = false;
        this.studentPasswordFlag = false;
        this.studentRetypeFlag = false;
      } else {
        this.link = null;
      }
  }

  private addStudentToArray(click, index) {
    var studentFirstName = (<HTMLInputElement>document.getElementById("studentFirstName"+index)).value;
    var studentLastName = (<HTMLInputElement>document.getElementById("studentLastName")).value;
    var studentUserName = (<HTMLInputElement>document.getElementById("studentUsername")).value;
    var studentPasssword = (<HTMLInputElement>document.getElementById("studentPassword")).value;

    let student = {first: studentFirstName, last: studentLastName, username: studentUserName, passsword: studentPasssword};
    let obj = JSON.stringify(student);
    return obj;
  }

  checkIfParent() {
    var accountType = (<HTMLSelectElement>document.getElementById("types")).value;
    if(accountType == "parent") {
      this.parentAccountFlag = true;
    } else {
      this.parentAccountFlag = false;
    }
    
    return this.parentAccountFlag;
  }

  checkIfCreateNewStudent(create) {
    if(create == event) {
      this.newStudentFlag = true;
      document.getElementById("create").style.display = "none";
      this.numStudents.push("new");
    }
  }

  removeNewStudent(click, index) {
    console.log(index);
    if(click == event) {
      if(this.numStudents.length == 1){
        this.newStudentFlag = false;
        this.numStudents.splice(0, 1);
        this.newStudents.splice(0,1);
        document.getElementById("create").style.display = "inline";
      } else {
        this.numStudents.splice(0, 1);
        this.newStudents.splice(index, index+1);
      }
    }
    console.log(this.newStudents);
  }

  addNewStudent(click) {
    if(click == event) {
      this.numStudents.push("new");
    }
  }

  students() {
    return this.numStudents;
  }

  SendToDataBase() {

    if (!this.checkIfValidAccount()) {
      return;
    }
    var firstName = (<HTMLInputElement>document.getElementById("firstName")).value;
    var lastName = (<HTMLInputElement>document.getElementById("lastName")).value;
    var email = (<HTMLInputElement>document.getElementById("email")).value;
    var password = (<HTMLInputElement>document.getElementById("password")).value;
    var username = (<HTMLInputElement>document.getElementById("username")).value;
    var accountType = (<HTMLSelectElement>document.getElementById("types")).value;
    
    let url = "";

    if(accountType == 'parent' && this.newStudentFlag == true) {
      
      url = `http://127.0.0.1:8000/?reason=create&first=${firstName}&last=${lastName}&email=${email}&password=${password}&username=${username}&role=${accountType}&students=${this.newStudents}`;
    } else {
      url = `http://127.0.0.1:8000/?reason=create&first=${firstName}&last=${lastName}&email=${email}&password=${password}&username=${username}&role=${accountType}&email=${email}`;
    }
    
    this.httpGetAsync(url, (response) => {
      if (response == "This username has been taken. Please choose another.") {
        this.link = "/signup";
      }
      console.log(response);
    })
  }

  private httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
  }

  /*
    Allows a fake instance of the user input to be used for test classes
  */
  private allowTesting(userParameter, HtmlId) {
    if (userParameter == event) return userParameter = (<HTMLInputElement>document.getElementById(HtmlId)).value;
    return userParameter;
  }
}



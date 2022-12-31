// TODO: Write code to define and export the Employee class

class Employee{
// Employee will have three atributes that is name, id , and email
// Will be the same for all employees including manager, engineer, and intern
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
      }

 getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }

  getRole() {
    return "Employee";
  }

}
module.exports = Employee;

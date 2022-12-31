// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee")


// Manager extends from the Employee class, adding officeNumber
class Manager extends Employee {

    constructor(name, id, email, officeNumber){
    super (name, id, email);
    this.officeNumber= officeNumber;
    }

    getRole(){
        return "Manager"
    }
    getOfficeNumber(){
        return this.officeNumber;
    }

}
module.exports = Manager;
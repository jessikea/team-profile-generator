const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers= [];
const idArray =[];

// Informing user of usage of generator

console.log(
    "\n This is the Team Generator!\nUse `npm run reset` to reset the dist/ folder\n "
);

function startApp(){
    function createManager(){
        console.log("Time to build your team!");
        inquirer
            .prompt([
            {
                type: 'input',
                name: 'managerName',
                message: "What is the team manager's name?",

                 // to check if name is at least one character 
                validate: (answer) => {
                    if (answer !== '') {
                        return true;
                    }
                        return 'Please enter at least one character.';
                }
            },

            { 
                type: "input",
                name: "managerId",
                message: "Please provide Team Manager's ID",
                
                  // to check if ID is valid with only number characters 
                validate: (answer) => {
                    const accept = answer.match(/^[1-9]\d*$/)
                    if (accept) {
                        return true;
                    }
                        return "Please enter a valid ID number";
                }
            },
            
            { 
                type: 'input',
                name: 'managerEmail',
                message: "What is the team manager's email?",

                  // to check if there is a valid email with an @ symbol
                validate: (answer) => {
                    const accept = answer.match(/\S+@\S+\.\S+/);
                     if (accept) {
                        return true;
                        }
                        return 'Please enter a valid email address.';
                }
            },

            {
                type: 'input',
                name: 'managerOfficeNumber',
                message: "What is the team manager's office number?",
                    
                    // to check if the team manager's office number constains numbers
                validate: (answer) => {
                    const accept = answer.match(/^[1-9]\d*$/);
                    if (accept) {
                        return true;
                    }
                        return 'Please enter a valid Office Number.';
                }
            },

            ])
                
            .then((answers) => {
                const manager = new Manager(
                    answers.managerName,
                    answers.managerId,
                    answers.managerEmail,
                    answers.managerOfficeNumber
                );
                    teamMembers.push(manager);
                    idArray.push(answers.managerId);
                    createTeam();
                });
    }
    function addEngineer(){
        inquirer
            .prompt([
            {
                type: 'input',
                name: 'engineerName',
                message: "What is your engineer's name?",
    
                    // to check if name is at least one character 
                validate: (answer) => {
                    if (answer !== '') {
                        return true;
                    }
                        return 'Please enter at least one character.';
                }
            },
    
            { 
                type: "input",
                name: "engineerId",
                message: "Please provide your engineer's ID",
                    
                    // to check if ID is valid with only number characters 
                 validate: (answer) => {
                    const accept = answer.match(/^[1-9]\d*$/)
                        if (accept) {
                            return true;
                        }
                            return "Please enter a valid ID number";
                }
            },

            { 
                type: 'input',
                name: 'engineerEmail',
                message: "What is the engineer's email?",
                    // to check if there is a valid email with an @ symbol
                validate: (answer) => {
                    const accept = answer.match(/\S+@\S+\.\S+/);
                    if (accept) {
                        return true;
                        }
                        return 'Please enter a valid email address.';
                }
            },

            {
                type: 'input',
                name: 'engineerGithub',
                message: "What is your engineer's GitHub username?",
                    
                    validate: (answer) => {
                    if (answer !== '') {
                        return true;
                        }
                        return 'Please enter at least one character.';
                    },
            },
            ])

            .then((answers) => {
                const engineer = new Engineer(
                  answers.engineerName,
                  answers.engineerId,
                  answers.engineerEmail,
                  answers.engineerGithub
                );
                teamMembers.push(engineer);
                idArray.push(answers.engineerId);
                createTeam();
              });
          }

          function addIntern() {
            inquirer
              .prompt([
                {
                  type: 'input',
                  name: 'internName',
                  message: "What is your intern's name?",
                  validate: (answer) => {
                    if (answer !== '') {
                      return true;
                    }
                    return 'Please enter at least one character.';
                  },
                },
                {
                  type: 'input',
                  name: 'internId',
                  message: "What is your intern's id?",
                  validate: (answer) => {
                    const pass = answer.match(/^[1-9]\d*$/);
                    if (pass) {
                      if (idArray.includes(answer)) {
                        return 'This ID is already taken. Please enter a valid ID number.';
                      } else {
                        return true;
                      }
                    }
                    return 'Please enter a valid ID number.';
                  },
                },
                {
                  type: 'input',
                  name: 'internEmail',
                  message: "What is your intern's email?",
                  validate: (answer) => {
                    const pass = answer.match(/\S+@\S+\.\S+/);
                    if (pass) {
                      return true;
                    }
                    return 'Please enter a valid email address.';
                  },
                },
                {
                  type: 'input',
                  name: 'internSchool',
                  message: "What is your intern's school?",
                  validate: (answer) => {
                    if (answer !== '') {
                      return true;
                    }
                    return 'Please enter at least one character.';
                  },
                },
              ])
              .then((answers) => {
                const intern = new Intern(
                  answers.internName,
                  answers.internId,
                  answers.internEmail,
                  answers.internSchool
                );
                teamMembers.push(intern);
                idArray.push(answers.internId);
                createTeam();
              });
          }
    function createTeam() {
        inquirer
          .prompt([
            {
              type: 'list',
              name: 'memberChoice',
              message: 'Which type of team member would you like to add?',
              choices: [
                'Engineer',
                'Intern',
                "I don't want to add any more team members",
              ],
            },
          ])
          .then((userChoice) => {
            switch (userChoice.memberChoice) {
              case 'Engineer':
                addEngineer(); // not added yet
                break;
              case 'Intern':
                addIntern(); //not added yet
                break;
              default:
                buildTeam();
            }
          });
      }
      function buildTeam() {
        if (!fs.existsSync(OUTPUT_DIR)) {
          fs.mkdirSync(OUTPUT_DIR);
        }
        fs.writeFileSync(outputPath, render(teamMembers), 'utf-8');
      }
    
      createManager();
    }

startApp()
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

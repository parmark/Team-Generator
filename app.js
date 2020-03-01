const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./lib/htmlRenderer');

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```

let employees = []

let memberQuestions = [
    {
        type: "input", 
        name: "name", 
        message: "What's this team member's name?"
    },
    {
        type: "input", 
        name: "id", 
        message: "What's this team member's id?"
    },
    {
        type: "input", 
        name: "email", 
        message: "What's this team member's email?"
    }
]

const engineerQuestion = {
    type: "input", 
    name: "github", 
    message: "What's this team member's GitHub username?"
}

const internQuestion = {
    type: "input", 
    name: "school", 
    message: "What's this team member's school?"
}

const managerQuestion = {
    type: "input", 
    name: "officeNumber", 
    message: "What's this team member's office number?"
}

console.log("Let's Build a Team!")

inquireEmployeeDetails()

function inquireEmployeeDetails() {
    inquirer
    .prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: ["Add a Manager", "Add a Engineer", "Add a Intern", "I'm finished"]
        }
    ])
    .then(choice => {
        if (choice.action === "Add a Manager") {
            memberQuestions.push(managerQuestion)
            inquirer
                .prompt(memberQuestions)
                .then(answer => {
                    employees.push(new Manager(answer.name, answer.id, answer.email, answer.officeNumber))
                    memberQuestions.pop()
                    inquireEmployeeDetails()
                })
        }
        else if (choice.action === "Add a Engineer") {
            memberQuestions.push(engineerQuestion)
            inquirer
                .prompt(memberQuestions)
                .then(answer => {
                    employees.push(new Engineer(answer.name, answer.id, answer.email, answer.github))
                    memberQuestions.pop()
                    inquireEmployeeDetails()
                })
        }
        else if (choice.action === "Add a Intern") {
            memberQuestions.push(internQuestion)
            inquirer
                .prompt(memberQuestions)
                .then(answer => {
                    employees.push(new Intern(answer.name, answer.id, answer.email, answer.school))
                    memberQuestions.pop()
                    inquireEmployeeDetails()
                })
        }
        else if (choice.action === "I'm finished") {
            fs.writeFile(outputPath, render(employees), function(err) {
                if (err) {
                    return console.log(err)
                }
                console.log("LOGGED")
            });
        }
        
    })
}

// const init = () => {};

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above to target this location.

// Hint: you may need to check if the `output` folder exists and create it if it
// does not. The fs npm package may have methods to check if a directory exists, and they
// may also have methods to create a directory that doesn't...

// init();

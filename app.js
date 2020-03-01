const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./lib/htmlRenderer');

let employees = []

// questions asked og all employees
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

// employee specific questions
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
            // employee specific question is pushed to the general questions
            // it will later b popped off
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
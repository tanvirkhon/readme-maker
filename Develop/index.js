// Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const {
  renderLicenseBadge,
  renderLicenseLink,
} = require("./utils/generateMarkdown.js");

// TODO: Create an array of questions for user input
const questions = [
  {
    type: "input",
    name: "title",
    message: "What is the title of your project?",
  },

  {
    type: "input",
    name: "description",
    message: "Please provide a description of your project:",
  },

  {
    type: "input",
    name: "installation",
    message: "What are the steps required to install your project?",
  },

  {
    type: "input",
    name: "usage",
    message: "Provide instructions and examples for use:",
  },

  {
    type: "input",
    name: "contributing",
    message: "What are the guidelines for contributing to this project?",
  },

  {
    type: "input",
    name: "tests",
    message: "Provide examples on how to run tests for this system:",
  },

  {
    type: "list",
    name: "licenseType",
    message: "Choose a license for this project?",
    choices: ["MIT", "Apache 2.0", "GPL 3.0", "None"],
  },

  {
    type: "input",
    name: "githubUsername",
    message: "What is your Github username?",
  },

  {
    type: "input",
    name: "emailAddress",
    message: "What is your email address?",
  },
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, function (err) {
    if (err) throw err;
    console.log("You have successfully written a README file");
  });
}

// Function that prompts the user to answer the questions from the questions array
function init() {
  inquirer.prompt(questions).then((answers) => {

    // Variables to store user input
    let readmeText = `# ${answers.title} 
    \n## Description \n${answers.description} 
    \n## Table of Contents
    \n* [Installation](#installation) 
    \n* [Usage](#usage) 
    \n* [Contributing](#contributing) 
    \n* [Tests](#tests) 
    \n* [License](#license) 
    \n* [Questions](#questions)
    \n\n## Installation \n${answers.installation} 
    \n## Usage \n${answers.usage} 
    \n## Contributing \n${answers.contributing} 
    \n## Tests 
    \n${answers.tests} 
    \n## License\nThis project is licensed under the ${
      answers.licenseType
    } ${renderLicenseBadge(
      answers.licenseType
    )} license. For more information, please visit ${renderLicenseLink(
      answers.licenseType
    )}
    \n## Questions\nIf you have any questions about this repository, please contact me at ${
      answers.emailAddress
    }. You can also view more of my work at https://github.com/${
      answers.githubUsername
    }.`;

    // Creates the README file
    writeToFile("README-Generated-By-Inquirer-Prompts-App.md", readmeText);
  });
}

// Function call to initialize app
init();

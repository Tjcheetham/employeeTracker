var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "employeeTracker_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

// function which prompts the user for what action they should take
function start() {
    inquirer
        .prompt({
            name: "options",
            type: "list",
            message: "What would you like to do?",
            choices: ["View All Employees", "View All Employees By Department", "View All Employees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "View All Roles", "Add Role", "Remove Role", "View All Departments", "Add Department", "Remove Department", "Quit"]
        })
        .then(function (answer) {
            // based on their answer, call different functions
            if (answer.options === "View All Employees") {
                viewEmployees();
            }
            else if (answer.options === "View All Employees By DepartmentD") {
                viewEmployeesByDept();
            }
            else if (answer.options === "View All Employees By Manager") {
                viewEmployeesByMngr();
            }
            else if (answer.options === "Add Employee") {
                addEmployee();
            }
            else if (answer.options === "Remove Employee") {
                removeEmployee();
            }
            else if (answer.options === "Update Employee Role") {
                updateEmployeeRole();
            }
            else if (answer.options === "Update Employee Manager") {
                updateEmployeeManager();
            }
            else if (answer.options === "View All Roles") {
                updateEmployeeManager();
            }
            else if (answer.options === "Add Role") {
                updateEmployeeManager();
            }
            else if (answer.options === "Remove Role") {
                updateEmployeeManager();
            }
            else if (answer.options === "View All Departments") {
                updateEmployeeManager();
            }
            else if (answer.options === "Add Department") {
                updateEmployeeManager();
            }
            else if (answer.options === "Remove Department") {
                updateEmployeeManager();
            } else {
                connection.end();
            }
        });


    // // function to handle viewing employees
    // function viewEmployees() {
    //     console.log("Viewing all employees...\n");
    //     connection.query(
    //         let query = "SELECT * FROM employee", [i];
    //     connection.query(query, [i],  function (err, res) {
    //         for (let i = 0; i < res.length; i++) {
    //             console.table("ID: " + res[i].id + " || first_name: " + res[i].first_name + " || last_name: " + res[i].last_name + " || role_id: " +res[i].role_id);
    //         }
    //         // connection.end();
    //         // re-prompt the user with options
    //         start();
    //     })
    // };

    // function viewEmployeesByDept() {
    //     // query the database for all employees by department
    //     connection.query("SELECT * FROM department", function (err, results) {
    //         if (err) throw err;
    //         // once you have the department names, prompt the user for which department to view
    //         inquirer
    //             .prompt([
    //                 {
    //                     name: "departmentChoice",
    //                     type: "list",
    //                     choices: function () {
    //                         const departmentsArray = [];
    //                         for (let i = 0; i < results.length; i++) {
    //                             departmentsArray.push(results[i].name);
    //                         }
    //                         return departmentsArray;
    //                     },
    //                     message: "Which department would you like to see employees for?"
    //                 },
    //             ])
    //             console.log(departmentChoice)
    //             .then(function (answer) {
    //                 // get the information of the chosen item
    //                 let chosenItem;
    //                 for (let i = 0; i < results.length; i++) {
    //                     if (results[i].name === answer.departmentChoice) {
    //                         chosenItem = results[i];
    //                     }
    //                 }
    //             });
    //     });
    // }

    // function viewEmployeesByMngr() {
    //     // query the database for all employees by department
    //     connection.query("SELECT * FROM manager????????????", function (err, results) {
    //         if (err) throw err;
    //         // once you have the department names, prompt the user for which department to view
    //         inquirer
    //             .prompt([
    //                 {
    //                     name: "managerChoice",
    //                     type: "list",
    //                     choices: function () {
    //                         const managersArray = [];
    //                         for (let i = 0; i < results.length; i++) {
    //                             managersArray.push(results[i].name);
    //                         }
    //                         return managersArray;
    //                     },
    //                     message: "Which managers would you like to see employees for?"
    //                 },
    //             ])
    //             console.log(managerChoice)
    //             .then(function (answer) {
    //                 // get the information of the chosen item
    //                 let chosenItem;
    //                 for (let i = 0; i < results.length; i++) {
    //                     if (results[i].name === answer.managerChoice) {
    //                         chosenItem = results[i];
    //                     }
    //                 }
    //             });
    //     });
    // }
    // function addEmployee() {
    //     // query the database for all employees by department
    //     connection.query("SELECT * FROM manager????????????", function (err, results) {
    //         if (err) throw err;
    //         // once you have the department names, prompt the user for which department to view
    //         inquirer
    //             .prompt([
    //                 {
    //                     name: "managerChoice",
    //                     type: "list",
    //                     choices: function () {
    //                         const managersArray = [];
    //                         for (let i = 0; i < results.length; i++) {
    //                             managersArray.push(results[i].name);
    //                         }
    //                         return managersArray;
    //                     },
    //                     message: "Which managers would you like to see employees for?"
    //                 },
    //             ])
    //             console.log(managerChoice)
    //             .then(function (answer) {
    //                 // get the information of the chosen item
    //                 let chosenItem;
    //                 for (let i = 0; i < results.length; i++) {
    //                     if (results[i].name === answer.managerChoice) {
    //                         chosenItem = results[i];
    //                     }
    //                 }
    //             });
    //     });
    // }
    // function removeEmployee() {
    //     // query the database for all employees by department
    //     connection.query("SELECT * FROM manager????????????", function (err, results) {
    //         if (err) throw err;
    //         // once you have the department names, prompt the user for which department to view
    //         inquirer
    //             .prompt([
    //                 {
    //                     name: "managerChoice",
    //                     type: "list",
    //                     choices: function () {
    //                         const managersArray = [];
    //                         for (let i = 0; i < results.length; i++) {
    //                             managersArray.push(results[i].name);
    //                         }
    //                         return managersArray;
    //                     },
    //                     message: "Which managers would you like to see employees for?"
    //                 },
    //             ])
    //             console.log(managerChoice)
    //             .then(function (answer) {
    //                 // get the information of the chosen item
    //                 let chosenItem;
    //                 for (let i = 0; i < results.length; i++) {
    //                     if (results[i].name === answer.managerChoice) {
    //                         chosenItem = results[i];
    //                     }
    //                 }
    //             });
    //     });
}
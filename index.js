const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

// create the connection information for the sql database
const connection = mysql.createConnection({
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
            else if (answer.options === "View All Employees By Department") {
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


    // function to handle viewing employees
    function viewEmployees() {
        // console.log("Viewing all employees...\n");
        let query2 = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id";
        // console.log(employee.first_name);
        // let query = "SELECT * FROM employee";
        connection.query(query2, function (err, res) {
            // console.log(res);
            console.table(res);
            // for (let i = 0; i < res.length; i++) {
            //     console.table("ID: " + res[i].id + " || first_name: " + res[i].first_name + " || last_name: " + res[i].last_name + " || role_id: " + res[i].role_id + " || department_id: " + res[i].department_id + " || salary: " + res[i].salary + " || manager_id: " + res[i].manager_id);
            // }
            // connection.end();
            // re-prompt the user with options
            start();
        })
    };

    function viewEmployeesByDept() {
        // console.log("Viewing all employees by department...\n");
        // query the database for all employees by department
        let query = "SELECT * FROM department";
        connection.query(query, function (err, res) {
            if (err) throw err;
            // console.log(res);

            const departmentChoices = res.map(({ id, name }) => ({
                name: name,
                value: id
            }));
            // once you have the department names, prompt the user for which department to view
            inquirer
                .prompt([
                    {
                        name: "departmentChoice",
                        type: "list",
                        message: "Which department would you like to see employees for?",
                        choices: departmentChoices
                        // function() {
                        //     const departmentsArray = [];
                        //     for (let i = 0; i < results.length; i++) {
                        //         departmentsArray.push(results[i].name);
                        //     }
                        //     return departmentsArray[i];
                        // },
                    },
                ])
                .then(function (answer) {
                    //     // get the information of the chosen item
                    // console.log(answer.departmentChoice)
                    let query = "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id WHERE department.id = " + answer.departmentChoice;
                    // console.log(query);
                    // if (answer.departmentChoice === answer) {
                    // function salesEmployees(answer) {
                    connection.query(query, function (err, res) {

                        if (err) throw err;
                        console.table(res);
                        // connection.end();
                        start();
                    })
                    // };
                    // };
                });
        });
    }
    function viewEmployeesByMngr() {
        // console.log("Viewing all employees by manager...\n");
        // query the database for all employees with managers
        // console.log(employee.first_name);
        let query = "SELECT first_name, last_name FROM employee WHERE manager_id IS NULL";
        connection.query(query, function (err, results) {
            if (err) throw err;
            console.table(results);

            // const managerChoices = res.map(({ id, name }) => ({
            //     first_name: name,
            //     value: id
            // }));
            // once you have the manager names, prompt the user for which manager to view employees by
            inquirer
                .prompt([
                    {
                        name: "managerChoice",
                        type: "list",
                        choices: function () {
                            const managersArray = [];
                            for (let i = 0; i < results.length; i++) {
                                managersArray.push(results[i].first_name + " " + results[i].last_name);
                            }
                            return managersArray;
                        },
                        message: "Which manager would you like to see employees for?",
                    },
                ])
                .then(function (answer) {
                    //     //     // get the information of the chosen item
                    console.log(answer.managerChoice)
                    // Get ID Of Manager
                    // let managerId;
                    // for (var i = 0; i < results.length; i++) {
                    //     if (results[i].first_name + " " + results[i].last_name === answer.managerChoice) {
                    //         managerId = results[i].id;
                    //     }
                    // }

                    console.log();

                    let query = "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id WHERE department.id = " + answer.managerChoice;
                    //     // if (answer.departmentChoice === answer) {
                    //         // function salesEmployees(answer) {
                    connection.query(query, function (err, res) {

                        if (err) throw err;
                        console.table(res);
                        connection.end();
                        start();
                    });
                    // };
                    // };
                });
        });
    }


    function addEmployee() {
        let query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) WHERE ?, ?, ?, ?"
        
        connection.query(query, function (err, results) {
            if (err) throw err;
            console.table(results);
            
            inquirer
                .prompt([
                    {
                        name: "employeeFN",
                        type: "input",
                        message: "Which department would you like to see employees for?",
                        choices: newEmployee
                        
                    },
                ])

           });
        }
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
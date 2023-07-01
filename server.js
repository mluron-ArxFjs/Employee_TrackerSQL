// Import and require express, inquirer & asciiart-logo
const express = require('express');
const inquirer = require("inquirer");
const logo = require("asciiart-logo");

// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const connection = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'password',
    // MySQL database
    database: 'employees_db'
  },
);
// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});
// Database Connect and Starter Title
connection.connect((error) => {
  if (error) throw error;
  init();
});

function init() {
  console.log(
    logo({
      name: "Track Your Employees!",
      font: "Speed",
      lineChars: 10,
      padding: 2,
      margin: 3,
      borderColor: "bold-blue",
      logoColor: "bold-red",
      textColor: "bold-white",
    }).render()
  );
  promptUser();
};

// Start the application with the following options: View all employees, update Employee role & Manager, view all departments, add a new role, etc
const promptUser = () => {
  inquirer.prompt(
    {
      name: "choices",
      type: "list",
      message: "What would you like to do?",
      choices:
        [
          "View All Employees",
          "Update Employee Role",
          "Update Employee Manager",
          "Add Employee",
          "Remove Employee",
          "View All Roles",
          "Add new Role",
          "Remove Role",
          "View All Departments",
          "Add Department",
          "Remove Department",
          "Exit"
        ]
    })

    //Call the functions to Query databases in order to run the employee_Tracker
    .then((response) => {
      const { choices } = response;
      if (choices === "View All Employees") {
        viewAll();
      }
      if (choices === "Add Employee") {
        addEmployee();
      }
      if (choices === "View All Departments") {
        viewDepts();
      }
      if (choices === "Add Department") {
        addDept();
      }
      if (choices === "View All Roles") {
        viewRole();
      }
      if (choices === "Add new Role") {
        addRole();
      }
      if (choices === "Update Employee Role") {
        updateRole();
      }
      if (choices === "Update Employee Manager") {
        updateEmployeeManager();
      }
      if (choices === "Remove Employee") {
        removeEmployee();
      }
      if (choices === "Remove Role") {
        removeRole();
      }
      if (choices === "Remove Department") {
        removeDept();
      }
      if (choices === "Exit") {
        console.log("Thank you for using this Employee Tracker App!")
        connection.end();
      }
    });
};
// ----------------------------------------------------- VIEW FUNCTIONS------------------------------------------------------------------
//View All Employees Function
function viewAll() {
  var sqlEmpl = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, manager.first_name AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id;"
  connection.query(
    sqlEmpl,
    function (err, result) {
      if (err) throw err;
      console.table(result);
      // re-prompt the user for another selection
      promptUser();
    }
  );
};
//View all roles Function
function viewRole() {
  var sqlRole = "SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department on role.department_id = department.id;"
  connection.query(
    sqlRole,
    function (err, result) {
      if (err) throw err;
      console.table(result);
      // re-prompt the user for another selection
      promptUser();
    }
  );
};
//View all departments Function
function viewDepts() {
  connection.query("SELECT * FROM department", function (err, result) {
    if (err) throw err;
    console.table(result);
    // re-prompt the user for another selection
    promptUser();
  }
  );
};
// ----------------------------------------------------- ADD FUNCTIONS-----------------------------------------------------------------------
//Look up through the databases
let roleChoices = [];
let empChoices = [];
let deptChoices = [];

function lookuprole() {
  connection.query("SELECT * FROM role", function (err, data) {
    if (err) throw err;
    for (i = 0; i < data.length; i++) {
      roleChoices.push(data[i].id + "-" + data[i].title)
    }
  })
}
function lookupEmployee() {
  connection.query("SELECT * FROM employee", function (err, data) {
    if (err) throw err;
    for (i = 0; i < data.length; i++) {
      empChoices.push(data[i].id + "-" + data[i].first_name + " " + data[i].last_name)
    }
  })
}
function lookupDepts() {
  connection.query("SELECT * FROM department", function (err, data) {
    if (err) throw err;
    for (i = 0; i < data.length; i++) {
      deptChoices.push(data[i].id + "-" + data[i].name)
    }
  })
}
//Function to add a new employee
function addEmployee() {

  lookuprole()
  lookupEmployee()

  inquirer.prompt([
    {
      name: "firstname",
      type: "input",
      message: "What is the employee's first name?"
    },

    {
      name: "lastname",
      type: "input",
      message: "What is the employee's last name?"
    },

    {
      name: "role",
      type: "list",
      message: "What is the employee's role?",
      choices: roleChoices
    },

    {
      name: "reportingTo",
      type: "list",
      message: "Who is the employee's manager?",
      choices: empChoices
    }

  ]).then(function (answer) {
    var getRoleId = answer.role.split("-")
    var getReportingToId = answer.reportingTo.split("-")
    var query =
      `INSERT INTO employee (first_name, last_name, role_id, manager_id)
       VALUES ('${answer.firstname}','${answer.lastname}','${getRoleId[0]}','${getReportingToId[0]}')`;
    connection.query(query, function (err, res) {
      console.log(`new employee ${answer.firstname} ${answer.lastname} added!`)
    });
    promptUser();
  });
};
//Function to add a new role
const addRole = () => {
  let deptNamesArray = [];
  const sql = "SELECT * FROM department";
  connection.promise().query(sql).then(([result]) => {
    result.forEach((department) => {
      deptNamesArray.push(department.name);
    })
    deptNamesArray.push('Create Department');
    inquirer.prompt([
      {
        name: 'departmentName',
        type: 'list',
        message: 'Which department is this new role in?',
        choices: deptNamesArray,
      },
    ])
      .then((answer) => {
        if (answer.departmentName === "Create Department") {
          // Handle creating a new role in a new department
          inquirer
            .prompt([
              {
                name: 'newDepartment',
                type: 'input',
                message: 'Enter the name of the new department:',
                validate: (input) => {
                  return typeof input === 'string'
                }
              },
            ])
            .then((answer) => {
              const sql = `INSERT INTO department (name) VALUES ('${answer.newDepartment}')`;
              const crit = [answer.newDepartment];
              connection.query(sql, crit, (error) => {
                if (error) throw error;
                console.log(`${answer.newDepartment} Department successfully created!\n`);

                inquirer
                  .prompt([
                    {
                      name: 'newRole',
                      type: 'input',
                      message: 'What is the name of your new role?',
                      validate: (input) => {
                        return typeof input === 'string'
                      }
                    },
                    {
                      name: 'salary',
                      type: 'input',
                      message: 'What is the salary of this new role?',
                      validate: (input) => {
                        return !isNaN(input)
                      }
                    },
                  ])
                  .then((roleAnswer) => {
                    const createdRole = roleAnswer.newRole;
                    // Write a query to get the department id from the name
                    const returnedDptId =
                      `SELECT id FROM department WHERE name = "${answer.newDepartment}"`;
                    // Make a variable to store value from the DB call to get department id
                    connection.query(returnedDptId, (err, res) => {
                      if (err) throw err;
                      const DptId = res.map(({ id }) => ({
                        value: id,
                      }));

                      const Dpt_Id = Object.values(DptId[0]);

                      const sql =
                        'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
                      const crit = [createdRole, roleAnswer.salary, Dpt_Id];
                      connection.query(sql, crit, (error) => {
                        if (error) throw error;
                        console.log(`${createdRole} Role successfully created!\n`);
                      });
                      viewRole();
                    });
                  });
              });
            });
        } else {
          // Handle adding a new role to an existing department
          inquirer
            .prompt([
              {
                name: 'newRole',
                type: 'input',
                message: 'What is the name of your new role?',
                validate: (input) => {
                  return typeof input === 'string'
                }
              },
              {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of this new role?',
                validate: (input) => {
                  return !isNaN(input)
                },
              },
            ])
            .then((roleAnswer) => {
              const createdRole = roleAnswer.newRole;
              // Write a query to get the department id from the name
              const returnedDptId =
                `SELECT id FROM department WHERE name = "${answer.departmentName}"`;
              // Make a variable to store value from the DB call to get department id
              connection.query(returnedDptId, (err, res) => {
                if (err) throw err;
                const DptId = res.map(({ id }) => ({
                  value: id,
                }));

                const Dpt_Id = Object.values(DptId[0]);

                const sql =
                  'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
                const crit = [createdRole, roleAnswer.salary, Dpt_Id];
                connection.query(sql, crit, (error) => {
                  if (error) throw error;
                  console.log(`${createdRole} Role successfully created!\n`);
                });
                viewRole();
              });
            });
        }
      })
  })
}
//Function to add a new department
function addDept() {

  lookuprole()
  lookupEmployee()
  lookupDepts()

  inquirer.prompt([
    {
      name: "dept",
      type: "input",
      message: "Enter the department you would like to add:"
    }
  ]).then(function (answer) {
    var query =
      `INSERT INTO department (name)
     VALUES ('${answer.dept}')`;
    connection.query(query, function (err, res) {
      console.log(`-------new department added: ${answer.dept}-------`)
    });
    promptUser();
  });
};
// ----------------------------------------------------- UPDATE FUNCTIONS-----------------------------------------------------------------------
//Function to update role of an employee
function updateRole() {
  connection.query("SELECT * FROM employee", function (err, result) {
    if (err) throw (err);
    inquirer
      .prompt([
        {
          name: "employeeName",
          type: "list",

          message: "Which employee's role is changing?",
          choices: function () {
            var employeeArray = [];
            result.forEach(result => {
              employeeArray.push(
                result.last_name
              );
            })
            return employeeArray;
          }
        }
      ])
      .then(function (answer) {
        console.log(answer);
        const name = answer.employeeName;

        connection.query("SELECT * FROM role", function (err, res) {
          inquirer
            .prompt([
              {
                name: "role",
                type: "list",
                message: "What is their new role?",
                choices: function () {
                  var roleArray = [];
                  res.forEach(res => {
                    roleArray.push(
                      res.title)
                  })
                  return roleArray;
                }
              }
            ]).then(function (roleAnswer) {
              const role = roleAnswer.role;
              console.log(role);
              connection.query('SELECT * FROM role WHERE title = ?', [role], function (err, res) {
                if (err) throw (err);
                let roleId = res[0].id;

                let query = "UPDATE employee SET role_id = ? WHERE last_name =  ?";
                let values = [parseInt(roleId), name]

                connection.query(query, values,
                  function (err, res, fields) {
                    console.log(`You have updated ${name}'s role to ${role}.`)
                  })
                viewAll();
              })
            })
        })
      })
  })
};
// Function to update an Employee's Manager
const updateEmployeeManager = () => {
  const sql = `SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id
              FROM employee`;

  connection.promise()
    .query(sql)
    .then((response) => {
      const employees = response[0];

      inquirer
        .prompt([
          {
            name: 'chosenEmployee',
            type: 'list',
            message: 'Which employee has a new manager?',
            choices: employees.map((employee) => `${employee.first_name} ${employee.last_name}`),
          },
          {
            name: 'newManager',
            type: 'list',
            message: 'Who is their manager?',
            choices: employees.map((employee) => `${employee.first_name} ${employee.last_name}`),
          },
        ])
        .then((answers) => {
          const { chosenEmployee, newManager } = answers;
          const chosenEmployeeId = employees.find((employee) => `${employee.first_name} ${employee.last_name}` === chosenEmployee).id;
          const newManagerId = employees.find((employee) => `${employee.first_name} ${employee.last_name}` === newManager).id;
          if (chosenEmployeeId === newManagerId) {
            promptUser();
          } else {
            const sql2 = `UPDATE employee SET manager_id = ? WHERE id = ?`;

            connection.query(sql2, [newManagerId, chosenEmployeeId], (error) => {
              if (error) throw error;
              promptUser();
            });
          }
        });
    })
    .catch((error) => {
      throw error;
    });
};
// ----------------------------------------------------- DELETE FUNCTIONS-----------------------------------------------------------------------
// Function to delete an Employee
const removeEmployee = () => {
  let sql = `SELECT employee.id, employee.first_name, employee.last_name FROM employee`;

  connection.promise()
    .query(sql)
    .then((response) => {
      const employeeNamesArray = response[0].map((employee) => `${employee.first_name} ${employee.last_name}`);

      inquirer
        .prompt([
          {
            name: 'chosenEmployee',
            type: 'list',
            message: 'Which employee would you like to remove?',
            choices: employeeNamesArray,
          },
        ])
        .then((answer) => {
          let employeeId;

          response[0].forEach((employee) => {
            if (
              answer.chosenEmployee ===
              `${employee.first_name} ${employee.last_name}`
            ) {
              employeeId = employee.id;
            }
          });

          let sql = `DELETE FROM employee WHERE employee.id = ?`;
          connection.query(sql, [employeeId], (error) => {
            if (error) throw error;
            viewAll();
          });
        });
    })
    .catch((error) => {
      throw error;
    });
};
// Function to delete a Role
const removeRole = () => {
  const sqlRoles = `SELECT role.id, role.title FROM role`;
  const sqlEmployees = `SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS name FROM employee`;

  Promise.all([
    connection.promise().query(sqlRoles),
    connection.promise().query(sqlEmployees),
  ])
    .then(([rolesResponse, employeesResponse]) => {
      const roles = rolesResponse[0];
      const employees = employeesResponse[0];

      inquirer
        .prompt([
          {
            name: 'chosenRole',
            type: 'list',
            message: 'Which role would you like to remove?',
            choices: roles.map((role) => role.title),
          },
        ])
        .then((answer) => {
          const chosenRole = answer.chosenRole;
          const roleId = roles.find((role) => role.title === chosenRole).id;

          const employeesWithRole = employees.filter((employee) => employee.role_id === roleId);
          const employeeNames = employeesWithRole.map((employee) => employee.name);

          if (employeesWithRole.length > 0) {
            promptUser();
          } else {
            const sql = `DELETE FROM role WHERE role.id = ?`;
            connection.query(sql, [roleId], (error) => {
              if (error) throw error;
              viewRole();
            });
          }
        });
    })
    .catch((error) => {
      throw error;
    });
};
// Function to delete a Department
const removeDept = () => {
  const sqlDepartments = `SELECT department.id, department.name FROM department`;

  connection.promise()
    .query(sqlDepartments)
    .then((response) => {
      const departments = response[0];

      inquirer
        .prompt([
          {
            name: 'chosenDepartment',
            type: 'list',
            message: 'Which department would you like to remove?',
            choices: departments.map((department) => department.name),
          },
        ])
        .then((answer) => {
          const chosenDepartment = answer.chosenDepartment;
          const departmentId = departments.find((department) => department.name === chosenDepartment).id;

          const sql = `DELETE FROM department WHERE department.id = ?`;
          connection.query(sql, [departmentId], (error) => {
            if (error) throw error;
            viewDepts();
          });
        });
    })
    .catch((error) => {
      throw error;
    });

};        
const inquirer = require('inquirer');
const db = require('./db/queries');
const cfonts = require('cfonts');

cfonts.say("Employee Tracker", {
    font: "block", // Specify the font style
    align: "center", // Align the text to the center
    colors: ["cyan", "red"], // Specify the colors
  });

const mainMenu = async () => {
  const { choice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit',
      ],
    },
  ]);

  switch (choice) {
    case 'View all departments':
      console.table(await db.getDepartments());
      break;
    case 'View all roles':
      console.table(await db.getRoles());
      break;
    case 'View all employees':
      console.table(await db.getEmployees());
      break;
    case 'Add a department':
      const { name } = await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Enter the department name:',
        },
      ]);
      await db.addDepartment(name);
      console.log('Department added!');
      break;
    case 'Add a role':
      const { title, salary, department_id } = await inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Enter the role title:',
        },
        {
          type: 'input',
          name: 'salary',
          message: 'Enter the role salary:',
        },
        {
          type: 'input',
          name: 'department_id',
          message: 'Enter the department ID:',
        },
      ]);
      await db.addRole(title, salary, department_id);
      console.log('Role added!');
      break;
    case 'Add an employee':
      const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
        {
          type: 'input',
          name: 'first_name',
          message: 'Enter the employee first name:',
        },
        {
          type: 'input',
          name: 'last_name',
          message: 'Enter the employee last name:',
        },
        {
          type: 'input',
          name: 'role_id',
          message: 'Enter the role ID:',
        },
        {
          type: 'input',
          name: 'manager_id',
          message: 'Enter the manager ID (leave blank if none):',
        },
      ]);
      await db.addEmployee(first_name, last_name, role_id, manager_id || null);
      console.log('Employee added!');
      break;
    case 'Update an employee role':
      const { employee_id, new_role_id } = await inquirer.prompt([
        {
          type: 'input',
          name: 'employee_id',
          message: 'Enter the employee ID:',
        },
        {
          type: 'input',
          name: 'new_role_id',
          message: 'Enter the new role ID:',
        },
      ]);
      await db.updateEmployeeRole(employee_id, new_role_id);
      console.log('Employee role updated!');
      break;
    case 'Exit':
      console.log('Goodbye!');
      process.exit();
  }

  mainMenu();
};

mainMenu();

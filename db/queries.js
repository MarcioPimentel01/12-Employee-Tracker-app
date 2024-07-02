const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'employee_tracker',
  password: 'latitudeM110',
  port: 5432,
});

module.exports = {
  getDepartments: async () => {
    const res = await pool.query('SELECT * FROM department');
    return res.rows;
  },
  getRoles: async () => {
    const res = await pool.query('SELECT * FROM role');
    return res.rows;
  },
  getEmployees: async () => {
    const res = await pool.query('SELECT * FROM employee');
    return res.rows;
  },
  addDepartment: async (name) => {
    await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
  },
  addRole: async (title, salary, department_id) => {
    await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
  },
  addEmployee: async (first_name, last_name, role_id, manager_id) => {
    await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
  },
  updateEmployeeRole: async (employee_id, role_id) => {
    await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
  },
};

const router = require('express').Router();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'turtle_app'
});


router.get('/turtles', (req, res) => {
  connection.query('SELECT * FROM turtles')
});
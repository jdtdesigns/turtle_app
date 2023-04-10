const mysql = require('mysql2');

const connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'turtle_app'
});

const turtle_table_sql = `
CREATE TABLE turtles(
  id INT AUTO_INCREMENT,
  turtle_name VARCHAR(250),
  turtle_color VARCHAR(100),
  PRIMARY KEY(id)
)
`;

const seed_data_sql = `
  INSERT INTO turtles (turtle_name, turtle_color) VALUES
    ('box', 'brown and yellow'),
    ('sea', 'white, yellow and brown'),
    ('snapping', 'green and brown')
`;


function createTable() {
  connection.query(turtle_table_sql, (table_err) => {
    if (table_err) throw table_err;

    console.log('Turtles table created successfully!');

    seedTurtles();
    process.exit();
  });
}

function getTurtles() {
  connection.query('SELECT * FROM turtles', (err, data) => {
    if (err && err.errno === 1146) {
      return createTable();
    }

    if (data && !data.length) {
      return seedTurtles();
    }

    console.log('data', data);
  })
}

function seedTurtles() {
  connection.query(seed_data_sql, (seed_err) => {
    if (seed_err) throw seed_err;

    console.log('DB seeded successfully!');
    getTurtles();
  });
}

getTurtles();
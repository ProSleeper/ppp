const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'u0_a177',
  password: 'suzi123',
  database: 'ccc'
});

connection.connect(function(err) {
  if (err) {
    console.error('Error connecting to MariaDB: ' + err.stack);
    return;
  }

  console.log('Connected to MariaDB as id ' + connection.threadId);
});

// 예시 쿼리 실행
connection.query('SELECT * FROM product', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});
connection.end();

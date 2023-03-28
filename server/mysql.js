var mysql = require('mysql');
var connection = mysql.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : '12341234',
    database : 'miniPowAdmin',
    port: '3306'
});

connection.connect();

connection.query('SELECT * FROM user', function(error, results, fields) {
    if (error) {
        console.log(error);
    }
    console.log(results);
});

connection.end();
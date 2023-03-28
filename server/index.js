const express = require('express');
const app = express()
const http = require('http').createServer(app);
const port = 5000
var mysql = require('mysql');
var db = mysql.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : '12341234',
    database : 'miniPowAdmin',
});

db.connect();

db.query(`SELECT * FROM user`, function(error, users){
    console.log(users);
    response.writeHead(200);
    response.end('Success');
})
app.get('/', (req, res) => {
    res.send('Hello World')
});
// ------------------------------------------------------
http.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});
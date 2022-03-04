var mysql = require('mysql');

var connectMySQL = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodejs-mysql"
});

connectMySQL.connect(function (err: any, connection: any) {
    if (err) console.log(err);
    console.log('Connect to mySQL successfully!');
    return connection;
});

module.exports = connectMySQL;
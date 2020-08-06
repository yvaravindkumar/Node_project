var mysql = require('mysql2/promise');

var data = mysql.createPool({
    host:"127.0.0.1",
    port:"4430",
    user:"root",
    password:"",
    database:"project"
});

module.exports=data;
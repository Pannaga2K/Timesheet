'use strict';

const mysql = require('mysql');

// CREATE CONNECTION
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "timesheet"
});

// CONNECT
db.connect((err) => {
    if(err) throw err;
    console.log("MYSQL CONNECTED");
})

module.exports = db;
const express = require("express");
const app = express();
const mysql = require("mysql");
const bp = require("body-parser");
const cors = require('cors');

app.use(cors());
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());

const db = require("./config/db_config");

app.get("/", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.send("");
});

// INSERT INTO DB
app.get("/insert", (req, res) => {
    let parameters = {USERNAME: "Z", EMAIL_ID: "z@gmail.com", phone_number: "4656464648", date_of_join: "01-Jan-2022"};
    let sql = "INSERT INTO USERS SET ?";
    let query = db.query(sql, parameters, (err, results) => {
        if(err) throw err;
        console.log(results);
        let currentMonth = new Date().getMonth() + 1;
        let day = 0;
        if(currentMonth == 1 || 3 || 5 || 7 || 8 || 10 || 12) {
            day = 31;
        } else if(currentMonth == 2) {
            day = new Data.getFullYear() % 4 == 0 ? 29 : 28;
        } else {
            day = 30;
        }
        let tempArray = [];
        for(let i = 0; i < day; i++) {
            tempArray.push("");
        }
        let innerParams = {userId: results.insertId, ATTENDANCE: JSON.stringify(tempArray), REMARKS: JSON.stringify(tempArray), DAYS: day};
        let innerSql = "INSERT INTO ATTENDANCE SET ? ";
        db.query(innerSql, innerParams, function(err, result) {
            if(err) console.log(err);
            console.log(result);
            res.send(results);
        });
    });
});

// GET ALL USERS
app.get("/users", (req, res) => {
    let sql = "SELECT * FROM USERS";
    db.query(sql, (err, results) => {
        if(err) console.log(err);
        res.header("Access-Control-Allow-Origin", "*");
        res.send(results);
    });
});

// GET TIMESHEET W.R.T USER
app.get("/users/:userId", (req, res) => {
    const user_id = req.params.userId;
    const params = {userId: user_id};
    let sql = `SELECT * FROM USERS WHERE ? `;
    db.query(sql, params, (err, results) => {
        if(err) console.log(err);
        let innerSql = `SELECT * FROM ATTENDANCE WHERE userId = ${results[0].userId}`;
        db.query(innerSql, (err, results1) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.send(results1);
        })
    });
});

// CREATE USERS
app.post("/users/create", (req, res) => {
    console.log(req.body);
    results = insertRow(req.body.details);
    res.send(results);
});

// UPDATE TIMESHEET
app.post("/users/:userId", (req, res) => {
    const userId = req.params.userId;
    const data = req.body;
    const attendance = req.body.attendance;
    const remarks = req.body.remarks
    let params = {ATTENDANCE: JSON.stringify(attendance), REMARKS: JSON.stringify(remarks)}
    let sql = `UPDATE ATTENDANCE SET ? WHERE userId = ${userId}`;
    db.query(sql, params, (err, results) => {
        if(err) {
            console.log(err);
        }
        res.header("Access-Control-Allow-Origin", "*");
        res.send(results);
    });
})

// DELETE USER
app.delete("/users/delete/:userId", (req, res) => {
    let id = req.params.userId;
    let qry = `DELETE FROM USERS WHERE userId = ${id}`;
    db.query(qry, (err, results) => {
        if(err) throw err;
        res.send(results);
    });
});

const insertRow = (sqlParams) => {
    // INSERT INTO USERS && ATTENDANCE
    let parameters = {USERNAME: sqlParams.username, EMAIL_ID: sqlParams.email, phone_number: sqlParams.phone, date_of_join: sqlParams.doj};
    let sql = "INSERT INTO USERS SET ?";
    let query = db.query(sql, parameters, (err, results) => {
        if(err) throw err;
        console.log(results);
        let currentMonth = new Date().getMonth() + 1;
        let day = 0;
        if(currentMonth == 1 || 3 || 5 || 7 || 8 || 10 || 12) {
            day = 31;
        } else if(currentMonth == 2) {
            day = new Data.getFullYear() % 4 == 0 ? 29 : 28;
        } else {
            day = 30;
        }
        let tempArray = [];
        for(let i = 0; i < day; i++) {
            tempArray.push("");
        }
        let innerParams = {userId: results.insertId, ATTENDANCE: JSON.stringify(tempArray), REMARKS: JSON.stringify(tempArray), DAYS: day};
        let innerSql = "INSERT INTO ATTENDANCE SET ? ";
        db.query(innerSql, innerParams, function(err, result) {
            if(err) console.log(err);
            console.log(result);
            return result;
        });
    });
}

app.listen(8080, () => {
    console.log("CONNECTED");
});
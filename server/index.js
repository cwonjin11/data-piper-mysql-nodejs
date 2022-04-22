const express = require("express")
const app = express()
// const mysql = require("mysql")
const mysql = require('mysql2')
const cors = require("cors")

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "employeeSystem",
})

//node.js
//create a route called /create
app.post('/create', (req, res) => {
    const company = req.body.company
    const role = req.body.role
    const urgency = req.body.urgency
    const quantity = req.body.quantity
    const skills = req.body.skills
    const candidate = req.body.candidate
    const email = req.body.email
    
    // putting the variables into our database
    db.query('INSERT INTO employees (company, role, urgency, quantity, skills, candidate, email) VALUES (?,?,?,?,?,?,?)', 
    [company, role, urgency, quantity, skills, candidate, email], (err, result) => { 
        if(err){
            console.log(err)
        } else {
            res.send("Values Inserted")
        }
    })
     
})
// standard syntex when using express
app.get('/employees', (req, res) => {
    db.query("SELECT * from employees", (err, result) => {
        if(err){
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.listen(3001, () => {
    console.log("Yey, your server is running on port 3001")
})
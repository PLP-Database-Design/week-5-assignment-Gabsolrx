// import our dependence
const express = require("express");
const app = express()
const mysql = require('mysql2');
const dotenv = require('dotenv')
const cors = require('cors');


// Configure environment variable
dotenv.config();


// Create a connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// test the connection
db.connect((err) => {
    // connection is not successful
    if(err) {
        return console.log("Error connecting to the database: ", err)
    }

    // connection successful
    console.log("successful connected to MYSQL: ", db.threadId)
})

// Question 1 Retrieve all patients
app.get('', (req,res) => {
    const getPatients = "SELECT * FROM patients"
    db.query(getPatients, (err, data) => {
        // if i have error
        if(err) {
            return res.status(400).send("failed to get patients", err)
        }   

        res.status(200).send(data)

    })
})

// Question 2
app.get('/providers', (req,res) => {
    const query = "SELECT first_name, last_name, provider_specialty FROM providers"
    db.query(query, (err, results) => {
        // if i have error
        if(err) {
            return res.status(400).send("failed to get providers", err);
        }   

        res.status(200).send(results)

    })
})

// Question 3

app.set('views engine', 'ejs');
app.set('views', __dirname + '/views');
 

app.get('/get-patients', (req, res) => {
    const getPatients = "SELECT first_name FROM patients"
    db.query(getPatients, (err, results) =>{
        if (err){
             return res.status(500).send('Error Retrieving data')
        }
            //Display the records to the browser 
            res.status(200).send(results)
            
            
        
    })
})
 

// Question 4
  
  app.get('/get-providers', (req, res) => {
    const getProviders = "SELECT provider_specialty FROM providers"
    db.query(getProviders, (err, results) =>{
        if (err){
             return res.status(500).send('Error Retrieving data')
        }
            //Display the records to the browser 
            res.status(200).send(results)
            
            
        
    })
})
  





// start and listen to the server
app.listen(3300, () => {
    console.log('server is running on port 3300...')
})
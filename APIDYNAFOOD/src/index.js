const express = require('express')
const {Pool, Client} = require('pg')
const app = express()
const port = 8000

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "password",
    port: "5432"
});

// test queries
pool.query("INSERT INTO Restriction (restrictionName)VALUES('testvalue')", (err, res) => {
    console.log(err || res);
});
pool.query("SELECT * FROM Restriction", (err,res) => {
    console.log(err || res);
});

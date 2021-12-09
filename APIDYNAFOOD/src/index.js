const express = require('express')
const {Pool, Client} = require('pg')
const axios = require('axios')
const app = express()
const port = 8000

//connection to database
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "password",
    port: "5432"
});

//allow frontend to access the backend
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Authorization, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

//check if server is live
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

//main route server access
app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/products/barcode/:barcode', (req, res) => {
    try {
        let response = {
            keywords: [],
            allergens: [],
            categories: [],
            qualities: [],
            warings: [],
            ecoscoreDatas: [],
            packing: [],
            images: [],
            ingredients: [],
            nutriments: [],
            nutrimentsScores: []
        }
        const product = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${req.params}.json`)
        if (product.status != 1) {
            res.status(204).send("Product not found")
            return
        }
        if (product.product) {
            if (product.product._keywords) {

            }
        }
        res.status(200).send(product)
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
})

// test queries
pool.query("INSERT INTO Restriction (restrictionName)VALUES('testvalue')", (err, res) => {
    console.log(err || res);
});
pool.query("SELECT * FROM Restriction", (err,res) => {
    console.log(err || res);
});

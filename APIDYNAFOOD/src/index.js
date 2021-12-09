const express = require('express')
const {Pool, Client} = require('pg')
const axios = require('axios')
const app = express()
const port = 8000

//connection to database
let db_adm_conn;
var start = new Date().getTime();
  while (true) {
    if ((new Date().getTime() - start) > 5000){
      break;
    }
  }

function connect() {
    db_adm_conn = new Client({
        connectionString: 'postgres://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@db/postgres'
    });
    db_adm_conn.on('error', error => {
        connect();
    });
    db_adm_conn.connect().catch(() => { connect() });
    return db_adm_conn
}
db_adm_conn = connect()
// const pool = new Pool({
//     user: "postgres",
//     host: "localhost",
//     password: "password",
//     port: "5432"
// });

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
app.get('/', async (req, res) => {
    // res.send('Hello world');
    let test = await db_adm_conn.query(`INSERT INTO public.restriction(
        restrictionname)
        VALUES ('tanya');`)
    let resu = await db_adm_conn.query(`SELECT * FROM restriction`)
    res.send(resu.rows)
    // pool.query("INSERT INTO Restriction (restrictionName)VALUES('testvalue')", (err, res) => {
    //     console.log(err || res);
    // });
});

app.get('/products/barcode/:barcode', async (req, res) => {
    try {
        let response = {
            keywords: [], //marcel
            allergens: [], //marcel
            categories: [], //marcel
            qualities: [], //marcel
            warings: [], //marcel
            ecoscoreDatas: [], //lucas
            packing: [], //lucas
            images: [], //lucas
            ingredients: [], //karl
            nutriments: [], //karl
            nutrimentsScores: [] //karl
        }
        const product = await axios.get(`https://world.openfoodfacts.org/api/2/product/${req.params.barcode}.json`)
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

// pool.query("SELECT * FROM Restriction", (err,res) => {
//     console.log(err || res);
// });


import axios from 'axios';
import https from 'https';



export const getProduct = async (res, req) => {
     //IF YOU WANT YOU CAN USE http withot axios
    // const url = https://world.openfoodfacts.org/api/v0/product/ + barcode +'.json
    // https.get(url, (response) => {
    //     let data = '';
    //     response.on('data', (chunk) => data  += chunk)
    //     response.on('end', () => {
   
    //    res.status(200).send(data);
   
    //     });
    //     // The whole response has been received. Print out the result.
   
    //      }).on("error", (err) => {
    //     console.log("Error: " + err.message);
      
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

    const product = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${req.params.barcode}.json`)
    if (product.status != 1) {
        res.status(204).send("Product not found")
        return
    }
    // if (product.product) {
    //     if (product.product._keywords) {

    //     }
    // }
    res.status(200).send(product)
    } catch(error) {
        console.log(error)
    res.status(500).send("Internal Server Error")
    }
}

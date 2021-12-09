
import axios from 'axios';
import https from 'https';

const getInnerIngredients = (ingredient) => {
    let inner = []
    let vegan = true
    let vegetarian = true
    if (typeof ingredient.ingredients != "undefined" && ingredient.ingredients != null) {
        for (var i = 0; i  < ingredient.ingredients.length; i++) {
            var tmp = {
                name: ingredient.ingredients[i].text,
                vegan: ingredient.ingredients[i].vegan,
                vegetarian: ingredient.ingredients[i].vegetarian,
                ingredients : getInnerIngredients(ingredient.ingredients[i])
            }
            if (tmp.vegan) {
                vegan = true
            }
            if (tmp.vegetarian) {
                vegetarian = true
            }
            inner.push(tmp)
        }
        return ({vegan: vegan, vegetarian: vegetarian, ingredients: inner})
    }
    return null    
}

export const getProduct = async (req, res) => {
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
        const url = `https://world.openfoodfacts.org/api/v0/product/${req.query.barcode}.json`
        console.log(url)
        const product = await axios.get('https://world.openfoodfacts.org/api/v0/product/737628064502.json')
        if (typeof product === "undefined" || product == null) {
            res.status(500).send({error: "undefined response from OpenFoodFacts Api"})
        }
        if (product.data.status != 1) {
            console.log(product)
            res.status(204).send({response: "Product not found"})
            return
        }
        if (typeof product === "object") {
            if (product.data.product && product.data.product.ingredients) {
                response.ingredients = getInnerIngredients(product.data.product)
            }
        }
        res.status(200).send(response)
    } catch(error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

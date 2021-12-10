import {Button, StyleSheet, Text, View} from "react-native";
import React, { useState, useEffect } from "react";
import {FAB} from "react-native-elements";

const axios = require('axios');

export default function Product() {
    const [ productCode, setProductCode ] = useState(localStorage.getItem("productCode"));
    const [productData, setProductData] = useState(null);

    useEffect(() => {
        setProductCode(localStorage.getItem("productCode"));
        axios.get("http://192.168.2.123:8081/products/barcode/" + productCode).then((res) => {
            setProductData(res.data);
            console.log(res.data);
        }).catch((err) => {
            alert("something went wrong getting data about the product:\n" + err.message)
            console.log(err);
        });
    }, []);

    return (
        <View>
            {productData === null ? (<FAB color="grey" size="small" loading/>) : (
                <View>
                    <Text style={{fontSize: 50}}>{productData["name"]}</Text>
                </View>
            )}
        </View>
    );
}

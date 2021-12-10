import {BarCodeScanner} from "expo-barcode-scanner";
import {Button, StyleSheet, Text, View} from "react-native";
import React, { useState, useEffect } from "react";

export default function Product() {
    const [ productCode, setProductCode ] = useState(localStorage.getItem("productCode"));

    useEffect(() => {
        setProductCode(localStorage.getItem("productCode"));
    }, []);

    return (
        <View>
            <Text>{productCode}</Text>
        </View>
    );
}

import {Button, StyleSheet, Text, View} from "react-native";
import React, { useState, useEffect } from "react";
import {FAB} from "react-native-elements";

const axios = require('axios');

export default function ProductNeutritionalTable({navigation, route}) {
    const { itemId, productData } = route.params;

    return (
        <View>
            <Text>Product</Text>
            {productData === null ? (<FAB color="grey" size="small" loading/>) : (
                <View>
                    <Text style={{fontSize: 50}}>{productData["name"]}</Text>
                </View>
            )}
        </View>
    );
}

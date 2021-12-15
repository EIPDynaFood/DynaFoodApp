import {Button, StyleSheet, Text, View} from "react-native";
import React, {useState, useEffect} from "react";
import {FAB} from "react-native-elements";
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ProductGeneralInfo from "./ProductGeneralInfo";
import ProductNutritionTable from "./ProductNutritionTable";
import {RequireJwt} from "../components/RequireJwt";

const Tab = createMaterialTopTabNavigator();
const axios = require('axios');

// Thou shall not change this file! To change content pls go into ProductGeneralInfo.js or ProductNutritionTable.js!
export default function Product() {
  const [productCode, setProductCode] = useState(localStorage.getItem("productCode"));
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    setProductCode(localStorage.getItem("productCode"));
    axios.get("https://dynafood.herokuapp.com/products/barcode/" + productCode).then((res) => { // 192.168.2.123
      setProductData(res.data);
      console.log(res.data);
    }).catch((err) => {
      alert("something went wrong getting data about the product:\n" + err.message)
      console.log(err);
    });
  }, []);

  return (
      <RequireJwt>
        <View style={{flex: 1}}>
          {productData === null ? (<FAB color="grey" size="small" loading/>) : (
              <Tab.Navigator>
                <Tab.Screen name="general" component={ProductGeneralInfo} initialParams={{productData}}/>
                <Tab.Screen name="table" component={ProductNutritionTable} initialParams={{productData}}/>
              </Tab.Navigator>
          )}
        </View>
      </RequireJwt>

  );
}

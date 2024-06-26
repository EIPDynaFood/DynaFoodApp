import {Button, StyleSheet, Text, View, StatusBar} from "react-native";
import React, {useState, useEffect} from "react";
import {FAB} from "react-native-elements";
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ProductGeneralInfo from "./ProductGeneralInfo";
import ProductNutritionTable from "./ProductNutritionTable";
import {RequireJwt} from "../components/RequireJwt";
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import useLang from "../../Language";
import { endpoint } from '../../config';

const Tab = createMaterialTopTabNavigator();
const axios = require('axios');

// Thou shall not change this file! To change content pls go into ProductGeneralInfo.js or ProductNutritionTable.js!
export default function Product({navigation, route}) {
  const [productCode, setProductCode] = useState(localStorage.getItem("productCode"));
  const [productData, setProductData] = useState(null);

  const translations = require("../../translations/screens/Product.json")
  const {lang} = useLang();

  useEffect(() => {
    setProductCode(localStorage.getItem("productCode"));
    axios.get(endpoint + "products/barcode/" + productCode).then((res) => {
      if (res.status === 204) { // no data to return
        alert(translations["Unknown"][lang]);
        navigation.navigate('MissingProduct')
      } else {
        setProductData(res.data);
        // console.log(res.data);
      }
    }).catch((err) => {
      console.log("catch");
      alert(translations["Error"][lang] + err.message)
      navigation.goBack(null);
      console.log(err);
    });
  }, []);

  return (
      <RequireJwt>
        <View style={{flex: 1}}>
          {productData === null ? (<FAB color="grey" size="small" loading/>) : (
            <Tab.Navigator
              screenOptions={{
                tabBarInactiveTintColor: 'gray',
                tabBarActiveTintColor: 'white',
              }}
            >
               <Tab.Screen
                 name="general"
                 component={ProductGeneralInfo}
                 initialParams={{productData}}
                 options={{
                   tabBarShowLabel: false,
                   tabBarStyle: { backgroundColor: '#376D55' },
                   tabBarIcon: ({ color }) => (
                     <Icon name="information-circle" color={color} size={24} />
                   ),
                 }}
               />
               <Tab.Screen
                 name="table"
                 component={ProductNutritionTable}
                 initialParams={{productData}}
                 options={{
                   tabBarShowLabel: false,
                   tabBarStyle: { backgroundColor: '#376D55' },
                   tabBarIcon: ({ color }) => (
                     <Icon name="stats-chart" color={color} size={24} />
                   ),
                 }}
               />
           </Tab.Navigator>
          )}
        </View>
      </RequireJwt>

  );
}

import {View} from "react-native";
import React, {useState, useEffect} from "react";
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ProductGeneralInfo from "./ProductGeneralInfo";
import ProductNutritionTable from "./ProductNutritionTable";
import Icon from 'react-native-vector-icons/Ionicons';
import useLang from "../../Language";
import { endpoint } from '../../config';
import LoadingSpinner from "../components/LoadingSpinner";
import APIRoute from "../../API";


const Tab = createMaterialTopTabNavigator();
const axios = require('axios');

// Thou shall not change this file! To change content pls go into ProductGeneralInfo.js or ProductNutritionTable.js!
export default function Product({navigation}) {
  const [productCode, setProductCode] = useState(localStorage.getItem("productCode"));
  const [productData, setProductData] = useState(null);

  const translations = require("../../translations/screens/Product.json")
  const {lang} = useLang();

  useEffect(() => {
    setProductCode(localStorage.getItem("productCode"));
    APIRoute(() => axios.get(endpoint + "products/barcode/" + productCode).then((res) => {
      if (res.status === 204) { // no data to return
        alert(translations["Unknown"][lang]);
        navigation.navigate('MissingProduct')
      } else {
        setProductData(res.data);
      }
    }).catch((err) => {
      if (err.response.status === 401)
        throw(err);
      alert(translations["Error"][lang] + err.message)
      console.log(err);
    }));
  }, []);

  return (
        <View style={{flex: 1}}>
          {productData === null ? (<LoadingSpinner/>) : (
            <Tab.Navigator
              screenOptions={{
                tabBarInactiveTintColor: 'gray',
                tabBarActiveTintColor: 'white',
                tabBarIndicatorStyle: { height: 0 },
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
  );
}

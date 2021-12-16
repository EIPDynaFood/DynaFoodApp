import {Button, StyleSheet, Text, View, ScrollView} from "react-native";
import React, {useState, useEffect} from "react";
import {FAB} from "react-native-elements";
import {RequireJwt} from "../components/RequireJwt";

const axios = require('axios');

export default function ProductNutritionTable({navigation, route}) {
  const {itemId, productData} = route.params;

  // Printing to check what is inside of productdata
  for (let key in productData["nutriments_g_pro_100g"]) {
    console.log(key, productData["nutriments_g_pro_100g"][key])
  }

  // Function that turn Object into Array
  // Use map to iterate over Array and return it as Text
  function display() {
    let arr = Object.entries(productData["nutriments_g_pro_100g"])
    return arr.map((item, index) => {
      return(
        <Text key={index}>
          {item}
        </Text>
      );
    });
  }

  return (
      <RequireJwt>
        <View>
          {display()}
        </View>
      </RequireJwt>
  );
}
import {Button, StyleSheet, Text, View, ScrollView, FlatList} from "react-native";
import React, {useState, useEffect} from "react";
import {FAB} from "react-native-elements";
import {RequireJwt} from "../components/RequireJwt";

const axios = require('axios');

// TODO
// Make it prettier
// Divide item into 2 section with a table figure between them
// Use icons to switch the top tab navigator

export default function ProductNutritionTable({navigation, route}) {
  const {itemId, productData} = route.params;

  // Printing to check what is inside of productdata
  for (let key in productData["nutriments_g_pro_100g"]) {
    console.log(key, productData["nutriments_g_pro_100g"][key])
  }

  // Function that return an array of ingredient
  function displayIngredient() {
    let arr = Object.entries(productData["nutriments_g_pro_100g"])
    return arr.map((item) => {
      var splitarray = item.toString().split(',')
      console.log(splitarray[0])
      return(
          splitarray[0] + '\n'
      );
    });
  }

  // Function that return the value of the ingredient as array
  function displayValue() {
    let arr = Object.entries(productData["nutriments_g_pro_100g"])
    return arr.map((item) => {
      var splitarray = item.toString().split(',')
      return(
          splitarray[1] + '\n'
      );
    });
  }

  return (
      <RequireJwt>
        <ScrollView style={styles.body}>
          <View style={styles.listWrapper}>
            <Text style={styles.row} >{displayIngredient()}</Text>
            <Text style={styles.row} >{displayValue()}</Text>
          </View>
        </ScrollView>
      </RequireJwt>
  );
}


// Pink background
// listWrapper is to make ------------ between each text print < still not working
// row is made for the view to stretch the text
const styles=StyleSheet.create({
  body:{
    backgroundColor:'pink',
    flex:1
  },
  listWrapper:{
    flexDirection:'row',
    flexWrap:'wrap',
    borderBottomWidth:.5
  },
  row:{
    backgroundColor:'white',
    flex:1,
    fontSize:18,
    paddingHorizontal:5
  }

})
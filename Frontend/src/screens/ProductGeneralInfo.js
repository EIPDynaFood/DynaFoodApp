import {Button, StyleSheet, Text, View, Image, FlatList, ScrollView} from "react-native";
import React, {useState, useEffect} from "react";
import {FAB, ListItem} from "react-native-elements";
import {RequireJwt} from "../components/RequireJwt";
import {LinearGradient} from "expo-linear-gradient";

const axios = require('axios');

export default function ProductGeneralInfo({navigation, route}) {
  const {itemId, productData} = route.params;

  let ingredients = ""
  productData['ingredients']['ingredients'].map((item, index) => {
    if (index === 0)
      ingredients += item['name']
    else
      ingredients += ", " + item['name']
  })

  console.log(productData)

  return (
      <RequireJwt>
        <View style={{flex: 1}}>
          <Image source={{uri: productData['images']}}
                 style={style.imageStyle}/>
          <LinearGradient style={style.gradientStyle}
                          colors={['rgba(0,0,0,0.5)', 'transparent']}
                          start={{x: 0, y: 1.0}}
                          end={{x: 0, y: 0}}/>
          <Text style={style.headlineStyle}>{productData["name"]}</Text>
        </View>
        <View>
          <Text style={style.ingredientStyle}>{ingredients}</Text>
        </View>
      </RequireJwt>
  );
}

const style = StyleSheet.create({
  gradientStyle: {
    //flex: 1,
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    width: "100%",
    height: 150,
  },
  imageStyle: {
    flex: 1,
    position: "absolute",
    top: 0,
    resizeMode: "cover",
    width: "100%",
    height: 150,
  },
  headlineStyle: {
    position: "absolute",
    top: 90,
    flex: 1,
    fontSize: 50,
    color: "rgba(255,255,255,1)"
  },
  ingredientStyle: {
    //flex: 1,
  }
})


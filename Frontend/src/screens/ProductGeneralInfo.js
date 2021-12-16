import {Button, StyleSheet, Text, View, Image, FlatList, ScrollView} from "react-native";
import React, {useState, useEffect} from "react";
import {FAB, ListItem} from "react-native-elements";
import {RequireJwt} from "../components/RequireJwt";
import {LinearGradient} from "expo-linear-gradient";
import {assertBoolean} from "@babel/core/lib/config/validation/option-assertions";


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
        <View style={style.wrapperStyle}>
          <View>
            <Image source={{uri: productData['images']}}
                   style={style.imageStyle}/>
            <LinearGradient style={style.gradientStyle}
                            colors={['rgba(0,0,0,0.6)', 'transparent']}
                            start={{x: 0, y: 1}}
                            end={{x: 0, y: 0}}/>
            <Text style={style.headlineStyle}>{productData["name"]}</Text>
          </View>
          <View style={style.mainContainerStyle}>
            <Text style={style.ingredientStyle}>{ingredients}</Text>
          </View>
          <View style={style.bottomContainer}>
            <Image source={require("../../media/nutri-scores/nutri-score-A.svg")}
                   style={style.nutriScoreStyle}/>
          </View>
        </View>
      </RequireJwt>
  );
}

const style = StyleSheet.create({
  wrapperStyle: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    backgroundColor: "rgba(224,224,224,0.74)",
  },
  mainContainerStyle: {
    backgroundColor: "#FFFFFF",
    height: "100%",
    top: 200,
    justifyContent: 'space-between',
  },
  gradientStyle: {
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    width: "100%",
    height: 200,
  },
  imageStyle: {
    position: "absolute",
    top: 0,
    resizeMode: "cover",
    width: "100%",
    height: 200,
  },
  headlineStyle: {
    position: "absolute",
    top: 140,
    left: 15,
    fontSize: 40,
    color: "rgba(255,255,255,1)"
  },
  ingredientStyle: {
    padding: 15,
    color: "rgba(0,0,0,0.6)"
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  nutriScoreStyle: {
    height: 97.5,
    width: 180,
    marginLeft: 15,
    bottom: 30
  }
})


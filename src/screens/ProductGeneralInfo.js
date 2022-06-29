import {Button, StyleSheet, Text, View, Image, FlatList, ScrollView} from "react-native";
import React, {useState, useEffect} from "react";
import {FAB, ListItem} from "react-native-elements";
import {RequireJwt} from "../components/RequireJwt";
import {LinearGradient} from "expo-linear-gradient";
import {assertBoolean} from "@babel/core/lib/config/validation/option-assertions";
import { styles } from "../styles/Style";

const axios = require('axios');

function AdjustLabel(props) {


  const [currentFontSize, setCurrentFontSize] = useState(props.fontSize);

  return (
      <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={[props.style, {fontSize: currentFontSize}]}
          onTextLayout={(e) => {
            const {lines} = e.nativeEvent;
            if (lines.length > 1) {
              setCurrentFontSize(currentFontSize - 1);
            }
          }}
      >
        {props.text}
      </Text>
  );
}

export default function ProductGeneralInfo({navigation, route}) {
  const {itemId, productData} = route.params;

  let ingredients = ""
  productData['ingredients']['ingredients'].map((item, index) => {
    if (index === 0)
      ingredients += item['name']
    else
      ingredients += ", " + item['name']
  })

  let nutriImage
  switch (productData['nutriments_scores']['total_grade']) {
    case "a":
      nutriImage = require("../../assets/nutri-scores/nutri-score-A.svg");
      break;
    case "b":
      nutriImage = require("../../assets/nutri-scores/nutri-score-B.svg");
      break;
    case "c":
      nutriImage = require("../../assets/nutri-scores/nutri-score-C.svg");
      break;
    case "d":
      nutriImage = require("../../assets/nutri-scores/nutri-score-D.svg");
      break;
    case "e":
      nutriImage = require("../../assets/nutri-scores/nutri-score-E.svg");
      break;
    default:
      nutriImage = require("../../assets/nutri-scores/nutri-score-C.svg");
  }

  let ecoImage
  switch (productData['ecoscoreData']['eco_grade']) {
    case "a":
      ecoImage = require("../../assets/eco-scores/eco-score-A.png");
      break;
    case "b":
      ecoImage = require("../../assets/eco-scores/eco-score-B.png");
      break;
    case "c":
      ecoImage = require("../../assets/eco-scores/eco-score-C.png");
      break;
    case "d":
      ecoImage = require("../../assets/eco-scores/eco-score-D.png");
      break;
    case "e":
      ecoImage = require("../../assets/eco-scores/eco-score-E.png");
      break;
    default:
      ecoImage = require("../../assets/eco-scores/eco-score-C.png");
  }

  return (
      <RequireJwt>
        <View style={styles.wrapperStyleInfo}>
          <View>
            <Image source={{uri: productData['images']}}
                   style={styles.imageStyleInfo}/>
            <LinearGradient style={styles.gradientStyle}
                            colors={['rgba(0,0,0,0.6)', 'transparent']}
                            start={{x: 0, y: 1}}
                            end={{x: 0, y: 0}}/>
            <AdjustLabel text={productData["name"]} fontSize={40} style={styles.headlineStyle}/>
          </View>
          <View style={styles.mainContainerStyleInfo}>
            <Text style={styles.ingredientStyle}>{ingredients}</Text>
          </View>
          <View style={styles.bottomContainer}>
            <Image source={nutriImage}
                   style={styles.nutriScoreStyle}/>
            <Image source={ecoImage}
                   style={styles.ecoScoreStyle}/>
          </View>
        </View>
      </RequireJwt>
  );
}

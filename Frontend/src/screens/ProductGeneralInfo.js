import {Button, StyleSheet, Text, View, Image, FlatList, ScrollView} from "react-native";
import React, {useState, useEffect} from "react";
import {FAB, ListItem} from "react-native-elements";
import {RequireJwt} from "../components/RequireJwt";
import {LinearGradient} from "expo-linear-gradient";
// import {AdjustLabel} from "../components/AdjustLabel";
import {assertBoolean} from "@babel/core/lib/config/validation/option-assertions";


const axios = require('axios');

function AdjustLabel(props) {

  console.log(props)

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

  console.log(productData)

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
      nutriImage = require("../../media/nutri-scores/nutri-score-A.svg");
      break;
    case "b":
      nutriImage = require("../../media/nutri-scores/nutri-score-B.svg");
      break;
    case "c":
      nutriImage = require("../../media/nutri-scores/nutri-score-C.svg");
      break;
    case "d":
      nutriImage = require("../../media/nutri-scores/nutri-score-D.svg");
      break;
    case "e":
      nutriImage = require("../../media/nutri-scores/nutri-score-E.svg");
      break;
    default:
      nutriImage = require("../../media/nutri-scores/nutri-score-C.svg");
  }

  console.log(productData['ecoscoreData']['eco_grade'])
  let ecoImage
  switch (productData['ecoscoreData']['eco_grade']) {
    case "a":
      ecoImage = require("../../media/eco-scores/eco-score-A.png");
      break;
    case "b":
      ecoImage = require("../../media/eco-scores/eco-score-B.png");
      break;
    case "c":
      ecoImage = require("../../media/eco-scores/eco-score-C.png");
      break;
    case "d":
      ecoImage = require("../../media/eco-scores/eco-score-D.png");
      break;
    case "e":
      ecoImage = require("../../media/eco-scores/eco-score-E.png");
      break;
    default:
      ecoImage = require("../../media/eco-scores/eco-score-C.png");
  }

  return (
      <RequireJwt>
        <View style={styles.wrapperStyle}>
          <View>
            <Image source={{uri: productData['images']}}
                   style={styles.imageStyle}/>
            <LinearGradient style={styles.gradientStyle}
                            colors={['rgba(0,0,0,0.6)', 'transparent']}
                            start={{x: 0, y: 1}}
                            end={{x: 0, y: 0}}/>
            <AdjustLabel text={productData["name"]} fontSize={40} style={styles.headlineStyle}/>
          </View>
          <View style={styles.mainContainerStyle}>
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

const styles = StyleSheet.create({
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
    color: "rgba(255,255,255,1)"
  },
  ingredientStyle: {
    padding: 15,
    color: "rgba(0,0,0,0.6)"
  },
  bottomContainer: {
    flexDirection: "row",
    flex: 1,
  },
  nutriScoreStyle: {
    height: 97.5,
    width: 180,
    marginLeft: 10,
    bottom: 130
  },
  ecoScoreStyle: {
    marginRight: 15,
    bottom: 130,
    width: 180,
    height: 97.5,
  }
})


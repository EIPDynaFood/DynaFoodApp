import {Button, StyleSheet, Text, View, Image, FlatList, ScrollView} from "react-native";
import React, {useState} from "react";
import {RequireJwt} from "../components/RequireJwt";
import {LinearGradient} from "expo-linear-gradient";
import { styles } from "../styles/Style";
import AwesomeAlert from "react-native-awesome-alerts";
import useLang from "../../Language"
import Alert from "../components/Alert";


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
  const alert = "lactose"
  let isAlert = false;

  const translations = require("../../translations/screens/ProductGeneralInfo.json")
  const {lang} = useLang();

  let ingredients = ""
  productData['ingredients']['ingredients'].map((item, index) => {
    if (index === 0)
      ingredients += item['name']
    else
      ingredients += ", " + item['name']
  })

  let popAlert
  switch (alert) {
    case "vegan":
        popAlert = translations["Vegan"][lang];
        isAlert = true;
      break;
    case "vegetarian":
        popAlert = translations["Vegetarian"][lang];
        isAlert = true;
      break;
    case "lactose":
        popAlert = translations["Lactose"][lang];
        isAlert = true;
      break;
    case "nuts":
        popAlert = translations["Nuts"][lang];
        isAlert = true;
      break;
    case "tomato":
        popAlert = translations["Tomato"][lang];
        isAlert = true;
      break;
    case "gluten":
        popAlert = translations["Gluten"][lang];
        isAlert = true;
      break;
    case "seed":
        popAlert = translations["Seed"][lang];
        isAlert = true;
      break;
    case "peanut":
        popAlert = translations["Peanut"][lang];
        isAlert = true;
      break;
    default:
      isAlert = false
      break;
  }

const [showAlert, setShowAlert] = useState(isAlert);

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
            <Alert
            show={showAlert}
            title="Warning!"
            message={popAlert}
            confText="OK"
            func={setShowAlert(false)}
            />
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

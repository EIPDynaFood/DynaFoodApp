import {Text, View, Image} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import {LinearGradient} from "expo-linear-gradient";
import { styles } from "../styles/Style";
import useLang from "../../Language"
import {Alert} from "../components/Alert";
import {ProductRating} from "../components/ProductRating";
import {AdjustLabel} from "../components/AdjustLabel";

export default function ProductGeneralInfo({route}) {
  const [alert, setAlert] = useState("")
  const [modalVisible, setModalVisible] = useState(false)
  const modalVisibleRef = useRef(modalVisible)
  const {itemId, productData} = route.params;

  let ingredients = ""
  productData['ingredients']['ingredients'].map((item, index) => {
    if (index === 0)
      ingredients += item['name']
    else
      ingredients += ", " + item['name']
  })

  useEffect(() => {
    if (modalVisibleRef.current === true || alert !== "")
      return
    let newAlert = ""
    if (productData['allergen_alert'])
        newAlert = alert + "Contains Allergens\n"
    if (productData['vegan_alert']) {
        newAlert = alert + "Not Vegan\n"
    } else if (productData['vegan_alert'] === null) {
        newAlert = alert + "Maybe Vegan\n"
        if (productData['vegetarian_alert']) {
            newAlert = alert + "Not Vegetarian\n"
        } else if (productData['vegetarian_alert'] === null) {
            newAlert = alert + "Maybe Vegetarian\n"
        }
    } else if (productData['vegetarian_alert']) {
        newAlert = alert + "Not Vegetarian\n"
    } else if (productData['vegetarian_alert'] === null) {
        newAlert = alert + "Maybe Vegetarian\n"
    }
    modalVisibleRef.current = modalVisible
    if (newAlert !== "") {
        setAlert(newAlert)
        setModalVisible(true)
    }
  }, [modalVisible])

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
      nutriImage = require("../../assets/nutri-scores/nutri-score-unknown.png");
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
      ecoImage = require("../../assets/eco-scores/eco-score-unknown.png");
  }

  return (
        <View style={styles.wrapperStyleInfo}>
          <View>
          <Alert
          visible={modalVisible}
          setModalVisible={setModalVisible}
          message={alert}
      />
            <Image source={{uri: productData['images']}}
                   style={styles.imageStyleInfo}/>
            <LinearGradient style={styles.gradientStyle}
                            colors={['rgba(0,0,0,0.6)', 'transparent']}
                            start={{x: 0, y: 1}}
                            end={{x: 0, y: 0}}/>
            <AdjustLabel text={productData["name"]} fontSize={40} style={styles.headlineStyle}/>
          </View>
            <ProductRating score={productData['score']}/>
          <View style={styles.mainContainerStyleInfo}>
            <Text style={styles.ingredientStyle}>{ingredients}</Text>
          <View style={styles.bottomContainer}>
            <Image source={nutriImage}
                   style={styles.nutriScoreStyle}/>
            <Image source={ecoImage}
                   style={styles.ecoScoreStyle}/>
          </View>
          </View>
        </View>
  );
}

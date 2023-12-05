import {Text, View, Image, TouchableWithoutFeedback, Modal, ScrollView} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import { styles } from "../styles/Style";
import ProgressBar from "../components/ProgressBar";
import {MaterialIcons} from "@expo/vector-icons";
import {Alert} from "../components/Alert";
import {Icon} from "react-native-elements";
import APIRoute from "../../API";
import axios from "axios";
import {endpoint} from "../../config";
import useLang from "../../Language";

export default function ProductGeneralInfo({route}) {
  const [alert, setAlert] = useState("")
  const [modalVisible, setModalVisible] = useState(false)
  const modalVisibleRef = useRef(modalVisible)
  const {productData} = route.params;
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(productData['bookmarked']);

  const translations = require("../../translations/components/ProductItem.json");
  const {lang} = useLang()

  const toggleImageSize = () => {
    setIsImageEnlarged((prevState) => !prevState);
  };

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
      nutriImage = require("../../assets/nutri-scores/nutri-score-A.png");
      break;
    case "b":
      nutriImage = require("../../assets/nutri-scores/nutri-score-B.png");
      break;
    case "c":
      nutriImage = require("../../assets/nutri-scores/nutri-score-C.png");
      break;
    case "d":
      nutriImage = require("../../assets/nutri-scores/nutri-score-D.png");
      break;
    case "e":
      nutriImage = require("../../assets/nutri-scores/nutri-score-E.png");
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

  const setBookmark = () => {
      const barcode = localStorage.getItem("productCode");
    if (!isBookmarked) {
      APIRoute(() => axios.post(endpoint + 'bookmark/' + barcode).then(() =>
          setIsBookmarked(!isBookmarked)
      ).catch((err) => {
        if (err.response.status === 401) {
          throw(err)
        }
        alert(translations["Error"][lang] + err.message);
        console.log(err);
      }));
    } else {
      APIRoute(() => axios.delete(endpoint + 'bookmark/' + barcode).then(() =>
          setIsBookmarked(!isBookmarked)
      ).catch((err) => {
        if (err.response.status === 401) {
          throw(err)
        }
        alert(translations["Error"][lang] + err.message);
        console.log(err);
      }));
    }
  }

  return (
      <View style={{flex: 1, height: '100%', justifyContent: "space-around"}}>
      <ScrollView style={{flex: 1, height: '100%'}} contentContainerStyle={{flexGrow: 1}}>
        {alert !== "" ? <Alert message={alert} setModalVisible={setModalVisible}
                               visible={modalVisible}/>
            : <></>
        }
        <View style={{flex: 1,
          position: 'absolute',
          top: 16,
          left: "50%",
          marginLeft: -75,
          zIndex: 1,
        }}>

        <ProgressBar progress={productData['score']}/>
        </View>
      <View style={styles.wrapperStyleInfo}>
        <View style={{
          width: '100%',
          height: '100%',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          backgroundColor: '#FFFFFF',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: "row", alignItems: "center", marginHorizontal: 20}}>
          <Text numberOfLines={2}
                adjustsFontSizeToFit
                style={[styles.headlineStyle, {paddingTop: 10, textAlign: 'center'}]}>{productData["name"]}</Text>
          <Icon name={isBookmarked ? 'bookmark' : 'bookmark-outline'} size={25} containerStyle={{marginLeft: 5, paddingTop: 10}} onPress={setBookmark}/>
        </View>
          <View style={{flexDirection: "row", paddingTop: 0}}>
            {alert !== "" ?
                [<MaterialIcons name="warning" size={20} color="#DB3A34" />,
            <Text> {alert}</Text>] : null}

          </View>
          <View style={styles.bottomContainer}>
            <Image source={nutriImage}
                   style={styles.nutriScoreStyle}/>
            <Image source={ecoImage}
                   style={styles.ecoScoreStyle}/>
          </View>
          <View style={[styles.mainContainerStyleInfo, {marginBottom: 10}]}>
            <Text style={[styles.ingredientStyle, {fontWeight: "bold", paddingTop: 16}]}>Ingredients:</Text>
            {ingredients !== "" ? <Text style={styles.ingredientStyle}>{ingredients}</Text> :
                <Text style={styles.ingredientStyle}>/</Text>}
            <Text style={[styles.ingredientStyle, {fontWeight: "bold", paddingTop: 16}]}>Pictures:</Text>
            <TouchableWithoutFeedback onPress={toggleImageSize}>
              <Image source={{uri: productData['images']}}
                     style={styles.imageStyleInfo}
              resizeMode={"contain"}/>
            </TouchableWithoutFeedback>
            </View>
        </View>
      </View>
      </ScrollView>

        <Modal visible={isImageEnlarged} transparent={true} onRequestClose={toggleImageSize}>
          <TouchableWithoutFeedback onPress={toggleImageSize}>
            <View style={{flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              justifyContent: 'center',
              alignItems: 'center',}}>
              <Image
                  source={{uri: productData['images']}}
                  style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
              />
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
  );
}

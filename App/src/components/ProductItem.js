import {useNavigation} from "@react-navigation/native";
import axios from "axios";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import React, {useEffect, useState} from "react";
import { styles } from "../styles/Style";
import useLang from "../../Language";
import { endpoint } from '../../config';
import APIRoute from "../../API";
import RoundProgressBar from "./RoundProgressBar";


export default function ProductItem(itemData) {
  const navigation = useNavigation();

  const translations = require("../../translations/components/ProductItem.json");
  const [isBookmarked, setIsBookmarked] = useState(itemData.bookmarked);
  const {lang} = useLang();

  useEffect(() => {
    setIsBookmarked(itemData.bookmarked)
  }, [itemData.bookmarked]);

    const [show, setShow] = useState(true)
  const deleteHistoryItem = () => {
    APIRoute(() => axios.delete(endpoint + 'history/' + itemData.historyId).then().catch((err) => {
      if (err.response.status === 401) {
        throw(err)
      }
      alert(translations["Error"][lang] + err.message);
      console.log(err);
    }));
      setShow(false)
  };

  const setBookmark = () => {
    if (!isBookmarked) {
      APIRoute(() => axios.post(endpoint + 'bookmark/' + itemData.barcode).then(() =>
          setIsBookmarked(!isBookmarked)
      ).catch((err) => {
        if (err.response.status === 401) {
          throw(err)
        }
        alert(translations["Error"][lang] + err.message);
        console.log(err);
      }));
    } else {
      APIRoute(() => axios.delete(endpoint + 'bookmark/' + itemData.barcode).then(() =>
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

    return (show ? <View style={styles.productItem}>
        <TouchableOpacity onPress={() => {
          localStorage.setItem('productCode', itemData.barcode);
          navigation.navigate('Product');
        }}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <View style={{ position: 'relative' }}>
              <RoundProgressBar progress={itemData.score} />
              <Image
                  style={{ position: 'absolute', top: 5, left: 5, width: 65, height: 65, borderRadius: 50 }}
                  source={{ uri: itemData.img }}
              />
            </View><View style={{marginLeft: 10, width: '60%'}}>
              <Text
                  numberOfLines={2}
                  style={{fontSize: 15, fontWeight: 'bold', textAlignVertical: "center"}}>{itemData.name}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{flex: 1, flexDirection: 'row-reverse', alignItems: 'center'}}>
          <Icon name='delete' size={25} onPress={deleteHistoryItem}/>
          <Icon name={isBookmarked ? 'bookmark' : 'bookmark-outline'} size={25} containerStyle={{marginRight: 5}} onPress={setBookmark}/>
        </View>
      </View> : <View></View>
  );
}
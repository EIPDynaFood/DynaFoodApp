import {useNavigation} from "@react-navigation/native";
import axios from "axios";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";
import React, {useState} from "react";
import { styles } from "../styles/Style";
import useLang from "../../Language";
import { endpoint } from '../../config';
import APIRoute from "../../API";


export default function ProductItem(itemData) {
  const navigation = useNavigation();

  const translations = require("../../translations/components/ProductItem.json")
  const {lang} = useLang()

    const [show, setShow] = useState(true)
  const deleteHistoryItem = () => {
    APIRoute(() => axios.delete(endpoint + 'history/' + itemData.historyId).then().catch((err) => {
      if (err.response.status === 401) {
        throw(err)
      }
      console.log('catch');
      alert(translations["Error"][lang] + err.message);
      console.log(err);
    }));
      setShow(false)
  };

    return (show ? <View style={styles.productItem}>
        <TouchableOpacity onPress={() => {
          localStorage.setItem('productCode', itemData.barcode);
          navigation.navigate('Product');
        }}>
          <View style={{flexDirection: "row"}}>
            <Image
                style={{width: 60, height: 60}}
                source={{uri: itemData.img}}/>
            <View style={{marginLeft: 10, width: '60%'}}>
              <Text
                  numberOfLines={1}
                  style={{fontSize: 15, fontWeight: 'bold'}}>{itemData.name}</Text>
              <Text
                  numberOfLines={1}
                  style={{fontSize: 13}}>{translations["Barcode"][lang] + itemData.barcode}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{flex: 1, flexDirection: 'row-reverse', alignItems: 'center'}}>
          <Icon name='delete' onPress={deleteHistoryItem}/>
        </View>
      </View> : <View></View>
  );
}
import {useNavigation} from "@react-navigation/native";
import axios from "axios";
import {Image, StyleSheet, Text, View} from "react-native";
import {TouchableWithoutFeedback} from "react-native-gesture-handler";
import {Icon} from "react-native-elements";
import React from "react";
import { styles } from "../styles/Style";

export default function ProductItem(itemData) {
  const navigation = useNavigation();

  const deleteHistoryItem = () => {
    axios.delete('https://dynafood-server.herokuapp.com/history/' + itemData.historyId).then((res) => {
    }).catch((err) => {
      console.log('catch');
      alert("something went wrong deleting history data: " + err.message);
      console.log(err);
    });
  };

  return (
      <View style={styles.productItem}>
        <TouchableWithoutFeedback onPress={() => {
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
                  style={{fontSize: 21, fontWeight: 'bold'}}>{itemData.name}</Text>
              <Text
                  numberOfLines={1}
                  style={{fontSize: 13}}>Barcode: {itemData.barcode}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={{flex: 1, flexDirection: 'row-reverse', alignItems: 'center'}}>
          <Icon name='delete' onPress={deleteHistoryItem}/>
        </View>
      </View>
  );
}
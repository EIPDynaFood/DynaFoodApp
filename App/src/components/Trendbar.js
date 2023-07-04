import {useNavigation} from "@react-navigation/native";
import {ScrollView} from "react-native-gesture-handler";
import {Image, Text, View, StyleSheet, TouchableOpacity} from "react-native";
import React, {useState, useEffect}from "react";
import axios from "axios";
import { endpoint } from '../../config';
import APIRoute from "../../API";



export default function TrendBar() {
  const navigation = useNavigation();
  const [trendingProducts, setTrendingProducts] = useState([{"barcode": "",
  "productImageLink": "https://images.openfoodfacts.org/images/products/544/900/021/4911/front_en.119.200.jpg", productName: "Loading..."}])

  useEffect(() => {
    APIRoute(() => axios.get(endpoint + 'trendingProductsGlobal?count=10').then((res) => {
      setTrendingProducts(res.data)
  }).catch((err) => {
        if (err.response.status === 401)
            throw(err);
        console.log('catch');
      alert("something went wrong getting history data: " + err.message);
      console.log(err);

    }))
  }, []);

  return (
      <ScrollView horizontal style={{width: "100%"}}>
        {trendingProducts.map((item, index) => (
            <TouchableOpacity key={index} style={{flex: 1}} onPress={() => {
              localStorage.setItem('productCode', item.barcode);
              navigation.navigate('Product');
            }}>
              <View style={{flex: 1, width: 85, padding: 5}}>
                <Image source={{uri: item.productImageLink}} style={styles.itemImage}/>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text style={{fontSize: 13, textAlign: 'center'}}>{item.productName}</Text>
                </View>
              </View>
            </TouchableOpacity>
        ))}
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  itemImage: {
    height: 70,
    width: 70,
    borderRadius: 50
  },
})

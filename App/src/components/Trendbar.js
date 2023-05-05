import {useNavigation} from "@react-navigation/native";
import {ScrollView, TouchableWithoutFeedback} from "react-native-gesture-handler";
import {Image, Text, View, StyleSheet, TouchableOpacity} from "react-native";
import React, {useState, useEffect}from "react";
import axios from "axios";
import { endpoint } from '../../config';


export default function TrendBar() {
  const navigation = useNavigation();

  const [trendingData, setTrendingData] = useState();


  useEffect(() => {
    axios.get(endpoint + 'trendingProductsGlobal' + "?count=7").then((res) => {
      setTrendingData(res.data);
      console.log(trendingData);
    }).catch((err) => {
      console.log(err);
    })
  }, [trendingData]);

 /* let trendingProducts = [
    {
      name: 'Coca Cola',
      barcode: '5449000214911',
      img: 'https://images.openfoodfacts.org/images/products/544/900/021/4911/front_en.119.200.jpg'
    },
    {
      name: 'Sauce Ketchup',
      barcode: '87157215',
      img: 'https://images.openfoodfacts.org/images/products/87157215/front_en.73.200.jpg'
    },
    {
      name: 'Ja! Rewe, Apfel Schorle',
      barcode: '4388810057831',
      img: 'https://images.openfoodfacts.org/images/products/438/881/005/7831/front_de.19.200.jpg'
    },
    {
      name: 'Sprite Lemon Lime',
      barcode: '5449000012203',
      img: 'https://images.openfoodfacts.org/images/products/544/900/001/2203/front_fr.70.200.jpg'
    },
    {
      name: 'Natürliches Mineral Wasser',
      barcode: '4311596435982',
      img: 'https://images.openfoodfacts.org/images/products/431/159/643/5982/front_en.11.200.jpg'
    },
    {
      name: 'Coca Cola',
      barcode: '5449000214911',
      img: 'https://images.openfoodfacts.org/images/products/544/900/021/4911/front_en.119.200.jpg'
    },
    {
      name: 'Sauce Ketchup',
      barcode: '87157215',
      img: 'https://images.openfoodfacts.org/images/products/87157215/front_en.73.200.jpg'
    },
    {
      name: 'Ja! Rewe, Apfel Schorle',
      barcode: '4388810057831',
      img: 'https://images.openfoodfacts.org/images/products/438/881/005/7831/front_de.19.200.jpg'
    },
    {
      name: 'Sprite Lemon Lime',
      barcode: '5449000012203',
      img: 'https://images.openfoodfacts.org/images/products/544/900/001/2203/front_fr.70.200.jpg'
    },
    {
      name: 'Natürliches Mineral Wasser',
      barcode: '4311596435982',
      img: 'https://images.openfoodfacts.org/images/products/431/159/643/5982/front_en.11.200.jpg'
    }
  ]; */

  return (
      <ScrollView horizontal style={{width: "100%"}}>
        {trendingData.map((item, index) => (
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

// productImageLink productName

const styles = StyleSheet.create({
  itemImage: {
    height: 70,
    width: 70,
    borderRadius: 50
  },
})

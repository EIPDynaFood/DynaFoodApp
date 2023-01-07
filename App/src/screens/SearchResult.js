import { View, Image, Text, TouchableOpacity} from "react-native";
import React from "react";
import {useNavigation} from "@react-navigation/native";

import { ScrollView } from "react-native-gesture-handler";
import { styles } from "../styles/Style";


export default function SearchResult() {
    const navigation = useNavigation();
    // request api for search result with localstorege

    let tempSearchRes = [
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
    ];

    return(
        <View style={{flex: 1}}>
            <ScrollView style={styles.productHistory}>
                {tempSearchRes.map((product, index) => (
                    <TouchableOpacity key={index} style={styles.productItem} onPress={() => {
                        console.log("Hello")
                        localStorage.setItem('productCode', product.barcode);
                        navigation.navigate('Product')
                    }}>
                        <View style={{flexDirection: "row"}}>
                            <Image
                                style={{width: 60, height: 60}}
                                source={{uri: product.img}}/>
                            <View style={{marginLeft: 10, width: '60%'}}>
                                <Text
                                    numberOfLines={1}
                                    style={{fontSize: 21, fontWeight: 'bold'}}>{product.name}</Text>
                                <Text
                                numberOfLines={1}
                                style={{fontSize: 13}}>Barcode: {product.barcode}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}
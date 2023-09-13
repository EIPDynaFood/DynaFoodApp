import {useNavigation} from "@react-navigation/native";
import {ScrollView} from "react-native-gesture-handler";
import {Image, Text, View, StyleSheet, TouchableOpacity} from "react-native";
import React, {}from "react";

export default function TrendBar(props) {
  const navigation = useNavigation();

  return (
      <ScrollView horizontal style={{width: "100%"}}>
        {props.data.map((item, index) => (
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

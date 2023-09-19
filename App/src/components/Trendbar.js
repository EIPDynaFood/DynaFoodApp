import {useNavigation} from "@react-navigation/native";
import {ScrollView} from "react-native-gesture-handler";
import {Image, Text, View, StyleSheet, TouchableOpacity} from "react-native";
import React, {}from "react";

export default function TrendBar(props) {
  const navigation = useNavigation();

  return (
      <ScrollView horizontal style={{width: "100%"}}>
        {props.data.map((item, index) => (
            <TouchableOpacity key={index} style={[{flex: 1, padding: 10, maxWidth: 100}, index === 0 ? {marginLeft: 8} : null, index === props.data.length - 1 ? {marginRight: 8} : null]} onPress={() => {
              localStorage.setItem('productCode', item.barcode);
              navigation.navigate('Product');
            }}>
                <Image source={{uri: item.productImageLink}} style={styles.itemImage}/>
                <Text style={{fontSize: 13, textAlign: 'center', marginTop: 10}}>{item.productName}</Text>
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

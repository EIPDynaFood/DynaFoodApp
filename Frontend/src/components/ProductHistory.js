import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import axios from "axios";
import {StyleSheet, Text, View} from "react-native";
import {FAB, Icon} from "react-native-elements";
import {ScrollView, TouchableWithoutFeedback} from "react-native-gesture-handler";
import ProductItem from "./ProductItem";

export default function ProductHistory() {
  const [historyData, setHistoryData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    axios.get('https://dynafood.herokuapp.com/history').then((res) => {
      setHistoryData(res.data);
    }).catch((err) => {
      console.log('catch');
      alert("something went wrong getting history data: " + err.message);
      console.log(err);
    });
  });

  return (
      <View style={{flex: 1}}>
        {historyData === null ? (<FAB color="grey" size="small" loading/>) : (
            (historyData.elements.length === 0) ? (
                <View style={styles.productHistory}>
                  <TouchableWithoutFeedback onPress={() => navigation.navigate('Scanner')}>
                    <View style={styles.productItem}>
                      <View style={{marginLeft: 10, width: '60%'}}>
                        <Text
                            numberOfLines={1}
                            style={{fontSize: 21, fontWeight: 'bold'}}>Add a new product</Text>
                      </View>
                      <View style={{flex: 1, flexDirection: 'row-reverse', alignItems: 'center'}}>
                        <Icon name='reorder' iconStyle={{transform: [{rotate: '90deg'}]}}/>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
            ) : (
                <ScrollView style={styles.productHistory}>
                  {historyData.elements.map((product) => <ProductItem
                      key={product.historyid}
                      name={product.productname}
                      img={product.picturelink}
                      barcode={product.barcode}
                      historyId={product.historyid}/>)}
                </ScrollView>
            ))}
      </View>
  );
}

const styles = StyleSheet.create({
  productHistory: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
  },
})

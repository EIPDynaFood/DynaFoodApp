import React, {useEffect, useState} from "react";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import axios from "axios";
import {Text, View} from "react-native";
import {Icon} from "react-native-elements";
import {ScrollView} from "react-native-gesture-handler";
import ProductItem from "./ProductItem";
import { styles } from "../styles/Style";
import useLang from "../../Language"
import { endpoint } from '../../config';
import LoadingSpinner from "./LoadingSpinner";
import APIRoute from "../../API";


export default function ProductHistory(props) {
  const [historyData, setHistoryData] = useState(props.data);
  const navigation = useNavigation();
  const isFocused = useIsFocused()

  const translations = require("../../translations/components/ProductHistory.json")
  const {lang} = useLang()

  var _ = require("lodash")

  useEffect(() => {
    console.log("fetch history")

    if (isFocused){
      getHistoryData()
    }
  }, [isFocused]);

  const getHistoryData = (() => {
    APIRoute(() => axios.get(endpoint + 'history').then((res) => {
      console.log(!_.isEqual(res.data, historyData))
      if (!_.isEqual(res.data, historyData)) {
        setHistoryData(res.data);
      }
    }).catch((err) => {
      if (err.response.status === 401) {
        throw(err)
      }
      console.log('catch');
      alert(translations["Error"][lang] + err.message);
      console.log(err);
    }));
  })

  return (
      <View style={{flex: 1}}>
        {historyData === null ? (<LoadingSpinner/>) : (
            (historyData.elements.length === 0) ? (
                <View style={styles.productHistory}>
                    <View style={styles.productItem} onPress={() => navigation.navigate('Scanner')}>
                      <View style={{marginLeft: 10, width: '60%'}}>
                        <Text
                            numberOfLines={1}
                            style={{fontSize: 21, fontWeight: 'bold'}}>{translations["New"][lang]}</Text>
                      </View>
                      <View style={{flex: 1, flexDirection: 'row-reverse', alignItems: 'center'}}>
                        <Icon name='reorder' iconStyle={{transform: [{rotate: '90deg'}]}}/>
                      </View>
                    </View>
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

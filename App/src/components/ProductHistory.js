import React, {useEffect, useState} from "react";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import axios from "axios";
import {Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ProductItem from "./ProductItem";
import { styles } from "../styles/Style";
import useLang from "../../Language"
import { endpoint } from '../../config';
import APIRoute from "../../API";


export default function ProductHistory(props) {
  const [historyData, setHistoryData] = useState(props.data);
  const navigation = useNavigation();
  const isFocused = useIsFocused()

  const translations = require("../../translations/components/ProductHistory.json")
  const {lang} = useLang()

  var _ = require("lodash")

  useEffect(() => {

    if (isFocused){
      getHistoryData();
    }
  }, [isFocused, props.bookmarked]);

  const getHistoryData = (() => {
    APIRoute(() => axios.get(endpoint + 'history?bookmarked=' + props.bookmarked).then((res) => {
      if (!_.isEqual(res.data, historyData)) {
        setHistoryData(res.data);
      }
    }).catch((err) => {
      if (err.response.status === 401) {
        throw(err)
      }
      alert(translations["Error"][lang] + err.message);
      console.log(err);
    }));
  })

  return (
      <View style={{flex: 1}}>
        {(historyData.elements.length === 0) ? (
                <TouchableOpacity style={styles.productHistory} onPress={() => navigation.navigate('Scanner')}>
                    <View style={styles.productItem}>
                      <View style={{marginLeft: 10, width: '60%'}}>
                        <Text
                            numberOfLines={1}
                            style={{fontSize: 21, fontWeight: 'bold'}}>{translations["New"][lang]}</Text>
                      </View>
                      <View style={{flex: 1, flexDirection: 'row-reverse', alignItems: 'center'}}>
                        <Icon name='barcode-scan' size={25}/>
                      </View>
                    </View>
                </TouchableOpacity>
            ) : (
                <View style={styles.productHistory}>
                  {historyData.elements.map((product) => <ProductItem
                      key={product.historyid}
                      name={product.productname}
                      img={product.picturelink}
                      barcode={product.barcode}
                      historyId={product.historyid}
                  bookmarked={product.bookmarked}/>)}
                </View>
            )}
      </View>
  );
}

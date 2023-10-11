import {Text, View, ScrollView} from "react-native";
import React, {useEffect, useState} from "react";
import {FAB} from 'react-native-elements';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {useNavigation} from "@react-navigation/native";
import TrendBar from "../components/Trendbar";
import ProductHistory from "../components/ProductHistory";
import useLang from "../../Language";
import { styles } from "../styles/Style";
import {ProductSearchBar} from "../components/ProductSearchBar";
import LoadingSpinner from "../components/LoadingSpinner";
import APIRoute from "../../API";
import axios from "axios";
import {endpoint} from "../../config";
import _ from "lodash";

export default function History() {
  const navigation = useNavigation();

  const translations = require("../../translations/screens/History.json")
  const {lang} = useLang();

  const [historyData, setHistoryData] = useState(null)
  const [trendBarData, setTrendBarData] = useState(null)
  const [trendBarLoaded, setTrendBarLoaded] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false);

  const getHistoryData = (() => {
    APIRoute(() => axios.get(endpoint + 'history').then((res) => {
      if (!_.isEqual(res.data, historyData)) {
        setHistoryData(res.data);
      }
      setHistoryLoaded(true)
    }).catch((err) => {
      if (err.response.status === 401) {
        throw(err)
      }
      alert(translations["ErrorHist"][lang] + '\n' + err.message);
    }));
  })

  const getTrendBarData = (() => {
    APIRoute(() => axios.get(endpoint + 'trendingProductsGlobal?count=10').then((res) => {
      setTrendBarData(res.data)
      setTrendBarLoaded(true)
    }).catch((err) => {
      if (err.response.status === 401)
        throw(err);
      console.log('catch');
      alert(translations["ErrorTrend"][lang] + '\n' + err.message);
      console.log(err);

    }))
  })

  useEffect(() => {
    getHistoryData()
    getTrendBarData()
  }, [])

  return (
      <>
      { trendBarLoaded && historyLoaded ?
          (<View style={{height: "100%"}}>
            <ScrollView>
        <ProductSearchBar/>
        <View style={styles.trendBar}>
            <Text style={[styles.headlineStyle, {paddingLeft: "5%"}]}>
                {translations["TrendText"][lang]}
            </Text>
            <TrendBar data={trendBarData} setLoaded={setTrendBarLoaded}/>
        </View>
        <View style={{alignSelf: 'center', width: '90%', flex: 1}}>
            <Text style={styles.headlineStyle}>
                {translations["ProductText"][lang]}
            </Text>
            <ProductHistory data={historyData} setLoaded={setHistoryLoaded}/>
        </View>
          </ScrollView>
          <FAB
              color="black"
              icon={<Icon name='barcode-scan' color="white" size={20}/>}
              style={styles.FABStyle}
              onPress={() => {
                navigation.navigate('Scanner')
              }}
          />
          </View>) : (<LoadingSpinner/>)}
      </>
  );
}

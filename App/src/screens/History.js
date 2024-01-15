import {Text, View, ScrollView} from "react-native";
import React, {useEffect, useState} from "react";
import {FAB} from 'react-native-elements';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {useIsFocused, useNavigation} from "@react-navigation/native";
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
import BookmarkSwitch from "../components/BookmarkSwitch";
import {MaterialIcons} from "@expo/vector-icons";

export default function History() {
  const navigation = useNavigation();

  const translations = require("../../translations/screens/History.json")
  const {lang} = useLang();

  const [historyData, setHistoryData] = useState({elements: []});
  const [trendBarData, setTrendBarData] = useState(null);
  const [trendBarLoaded, setTrendBarLoaded] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const getHistoryData = (() => {
    APIRoute(() => axios.get(`${endpoint}history?bookmarked=${showBookmarks}&wanted=8&offset=0`).then((res) => {
      setHistoryData(res.data)
      setHistoryLoaded(true);
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
  }, [showBookmarks])

  function isCloseToBottom({layoutMeasurement, contentOffset, contentSize}){
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 1;
  }

  return (
      <>
      { trendBarLoaded && historyLoaded ?
          (<View style={{height: "100%", flex: 1}}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} onScroll={({nativeEvent})=>{
              if(isCloseToBottom(nativeEvent)){
                setCurrentPage((prevPage) => prevPage + 1);
              }
            }} onEndReachedThreshold={0.1}>
        <ProductSearchBar/>
        <View style={styles.trendBar}>
            <Text style={[styles.headlineStyle, {paddingLeft: "5%"}]}>
                {translations["TrendText"][lang]}
            </Text>
            <TrendBar data={trendBarData}/>
        </View>
        <View style={{alignSelf: 'center', width: '90%', flex: 1}}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Text style={styles.headlineStyle}>
              {translations[showBookmarks ? "BookmarkText" : "ProductText"][lang]}
            </Text>
            <BookmarkSwitch set={setShowBookmarks}/>
          </View>
          <ProductHistory data={historyData} bookmarked={showBookmarks} offset={currentPage} setOffset={setCurrentPage} setLoaded={setHistoryLoaded}/>
        </View>
              <View style={{marginTop: 10, width: "100%", backgroundColor: "#FFFFFF", borderTopWidth: 1, borderColor: "#2E4D44", justifyContent: "flex-end"}}>
                <Text style={{fontWeight: 'bold', textAlign: "center", paddingVertical: 10}}>Made with <MaterialIcons name="favorite" size={15} color="#DB3A34"/> in Epitech Berlin!</Text>
              </View>
          </ScrollView>
          <FAB
              color="#376D55"

              icon={<Icon name='barcode-scan' color="white" size={24}/>}
              style={styles.FABStyle}
              onPress={() => {
                navigation.navigate('Scanner')
              }}
          />
          </View>) : (<LoadingSpinner/>)}
      </>
  );
}

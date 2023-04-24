import {StyleSheet, Text, View} from "react-native";
import React, {useState} from "react";
import {FAB} from 'react-native-elements';
import {useNavigation} from "@react-navigation/native";
import {RequireJwt} from "../components/RequireJwt";
import TrendBar from "../components/Trendbar";
import ProductHistory from "../components/ProductHistory";
import useLang from "../../Language";
import { styles } from "../styles/Style";
import {ProductSearchBar} from "../components/ProductSearchBar";

const axios = require('axios');

export default function History() {
  const navigation = useNavigation();
  const [search, setSearch] = useState(String);

  const handleOnChangeText = (text) => {
    console.log(text);
    setSearch(text)
  }

  const handleOnPress = () => {
    if (search.length === 0)
      return;
    localStorage.setItem("Search", search)
    navigation.navigate('Search Result');
  }


  const translations = require("../../translations/screens/History.json")
  const {lang} = useLang();

  return (
      <RequireJwt>
        <View style={StyleSheet.absoluteFillObject}>
          <ProductSearchBar/>
          <View style={styles.trendBar}>
            <Text style={styles.headlineStyle}>
              {translations["TrendText"][lang]}
            </Text>
            <TrendBar/>
          </View>
          <View style={{alignSelf: 'center', width: '90%', flex: 1}}>
            <Text style={styles.headlineStyle}>
              {translations["ProductText"][lang]}
            </Text>
            <ProductHistory data={null}/>
          </View>
          <FAB
              color="black"
              icon={{name: 'reorder', color: 'white'}}
              style={styles.FABStyle}
              onPress={() => {
                navigation.navigate('Scanner')
              }}
          />
        </View>
      </RequireJwt>
  );
}

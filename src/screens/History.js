import {Button, StyleSheet, Text, View, Image, ToastAndroid} from "react-native";
import React, {useState, useEffect} from "react";
import {FAB} from 'react-native-elements';
import {useNavigation} from "@react-navigation/native";
import {RequireJwt} from "../components/RequireJwt";
import SearchBar from "react-native-elements/dist/searchbar/SearchBar-ios";
import TrendBar from "../components/Trendbar";
import ProductHistory from "../components/ProductHistory";
import useLang from "../../Language";

const axios = require('axios');

export default function History() {
  const navigation = useNavigation();
  const [search, setSearch] = useState(null);

  const translations = require("../../translations/screens/History.json")
  const {lang} = useLang();

  return (
      <RequireJwt>
        <View style={StyleSheet.absoluteFillObject}>
          <SearchBar
            inputContainerStyle={styles.searchBar}
            value={search}
            placeholder={translations["SearchBar"][lang]}/>
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

const styles = StyleSheet.create({
  headlineStyle: {
    fontSize: 21,
    fontWeight: 'bold',
    padding: 5,
  },
  trendBar: {
    paddingLeft: "5%",
    width: 'auto',
    height: 170,
  },
  searchBar: {
    alignSelf: 'center',
    width: '90%',
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 5
  },
  FABStyle: {
    position: "absolute",
    bottom: 16,
    right: 16
  }
});

import {StyleSheet, Text, View} from "react-native";
import React, {useState, useEffect} from "react";
import {FAB} from 'react-native-elements';
import {useNavigation} from "@react-navigation/native";
import {RequireJwt} from "../components/RequireJwt";
import SearchBar from "react-native-dynamic-search-bar";
import TrendBar from "../components/Trendbar";
import ProductHistory from "../components/ProductHistory";
import { styles } from "../styles/Style";

const axios = require('axios');

export default function History() {
  const navigation = useNavigation();
  const [search, setSearch] = useState(String);

  const handleOnChangeText = (text) => {
    console.log(text);
    setSearch(text)
  }

  const handleOnPress = () => {
    if (search.length == 0)
      return;
    localStorage.setItem("Search", search)
    navigation.navigate('Search Result');
  }
  

  return (
      <RequireJwt>
        <View style={StyleSheet.absoluteFillObject}>
          <SearchBar
            darkMode={true}
            style={styles.searchBar}
            onChangeText={handleOnChangeText}
            onSearchPress={handleOnPress}
            placeholder="Search a product"/>
          <View style={styles.trendBar}>
            <Text style={styles.headlineStyle}>
              Trending
            </Text>
            <TrendBar/>
          </View>
          <View style={{alignSelf: 'center', width: '90%', flex: 1}}>
            <Text style={styles.headlineStyle}>
              Your products
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

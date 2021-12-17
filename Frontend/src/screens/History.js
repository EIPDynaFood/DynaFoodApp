import {Button, StyleSheet, Text, View, Image} from "react-native";
import React, {useState, useEffect} from "react";
import {FAB} from 'react-native-elements';
import {Icon} from 'react-native-elements';
import {useNavigation} from "@react-navigation/native";
import {RequireJwt} from "../components/RequireJwt";
import SearchBar from "react-native-elements/dist/searchbar/SearchBar-ios";
import { ScrollView } from "react-native-gesture-handler";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import TrendBar from "../components/Trendbar";
import ProductHistory from "../components/ProductHistory";

const axios = require('axios');

export default function History() {
  const navigation = useNavigation();
  const [search, setSearch] = useState(null);

  return (
      <RequireJwt>
        <View style={StyleSheet.absoluteFillObject}>
          <SearchBar
            inputContainerStyle={styles.searchBar}
            value={search}
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
            <ProductHistory/>
          </View>
          <FAB
              color="black"
              icon={{name: 'reorder', color: 'white', transform: [{rotate: '90deg'}]}}
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

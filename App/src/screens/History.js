import {StyleSheet, Text, View} from "react-native";
import React, {useState} from "react";
import {FAB} from 'react-native-elements';
import {useNavigation} from "@react-navigation/native";
import TrendBar from "../components/Trendbar";
import ProductHistory from "../components/ProductHistory";
import useLang from "../../Language";
import { styles } from "../styles/Style";
import {ProductSearchBar} from "../components/ProductSearchBar";
import LoadingSpinner from "../components/LoadingSpinner";

export default function History() {
  const navigation = useNavigation();

  const translations = require("../../translations/screens/History.json")
  const {lang} = useLang();

  const [trendBarLoaded, setTrendBarLoaded] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false);

  return (
      <>
      { trendBarLoaded && historyLoaded ?
          (<View style={StyleSheet.absoluteFillObject}>
        <ProductSearchBar/>
        <View style={styles.trendBar}>
            <Text style={styles.headlineStyle}>
                {translations["TrendText"][lang]}
            </Text>
            <TrendBar setLoaded={setTrendBarLoaded}/>
        </View>
        <View style={{alignSelf: 'center', width: '90%', flex: 1}}>
            <Text style={styles.headlineStyle}>
                {translations["ProductText"][lang]}
            </Text>
            <ProductHistory setLoaded={setHistoryLoaded}/>
        </View>
        <FAB
            color="black"
            icon={{name: 'reorder', color: 'white'}}
            style={styles.FABStyle}
            onPress={() => {
                navigation.navigate('Scanner')
            }}
        />
        </View>) : (<LoadingSpinner/>)}
      </>
  );
}

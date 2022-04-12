import { StyleSheet, Text, View, FlatList} from "react-native";
import React from "react";
import { Divider } from "react-native-elements";
import {RequireJwt} from "../components/RequireJwt";
import { styles } from "../styles/Style";

const axios = require('axios');

export default function ProductNutritionTable({navigation, route}) {
  const {itemId, productData} = route.params;

  let arr = Object.entries(productData["nutriments_g_pro_100g"])

  return (
      <RequireJwt>
        <View style={styles.wrapperStyleTable}>
          <View style={styles.tableHeadStyleTable}>
            <Text style={styles.tableHeadTextStyleTable}>Nutriments</Text>
            <Text style={styles.tableHeadTextStyleTable}>pro 100g/L</Text>
          </View>
          <Divider/>
          <View style={styles.mainContainerStyle}>
            <FlatList data={arr}
                      keyExtractor={item => item[0]}
                      renderItem={(({item}) =>
                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                          <Text style={styles.nutrimentsTextStyle}>{item[0]}</Text>
                          <Text style={styles.valuesTextStyle}>{item[1]}</Text>
                        </View>)}
                      ItemSeparatorComponent={(() => <Divider/>)}/>
          </View>
        </View>
      </RequireJwt>
  );
}

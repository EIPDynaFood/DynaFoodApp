import {Button, StyleSheet, Text, View, ScrollView, FlatList} from "react-native";
import React, {useState, useEffect} from "react";
import {Divider, FAB} from "react-native-elements";
import {RequireJwt} from "../components/RequireJwt";

const axios = require('axios');

export default function ProductNutritionTable({navigation, route}) {
  const {itemId, productData} = route.params;

  let nutriments = Object.keys(productData["nutriments_g_pro_100g"])
  let arr = Object.entries(productData["nutriments_g_pro_100g"])
  let values = arr.map((item) => {
    return item[1]
  })

  console.log(arr)

  return (
      <RequireJwt>
        <View style={styles.wrapperStyle}>
          <View style={styles.tableHeadStyle}>
            <Text style={styles.tableHeadTextStyle}>Nutriments</Text>
            <Text style={styles.tableHeadTextStyle}>pro 100g/L</Text>
          </View>
          <Divider/>
          <View style={styles.mainContainerStyle}>
            <FlatList data={arr}
                      renderItem={(({item}) => <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <Text style={styles.nutrimentsTextStyle}>{item[0]}</Text>
                        <Text style={styles.valuesTextStyle}>{item[1]}</Text>
                      </View>)}
                      ItemSeparatorComponent={(() => <Divider/>)}/>
          </View>
        </View>
      </RequireJwt>
  );
}

const styles = StyleSheet.create({
  wrapperStyle: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    backgroundColor: "rgba(224,224,224,0.74)",
  },
  mainContainerStyle: {
    backgroundColor: "#FFFFFF",
    height: "100%",
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  tableHeadStyle: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'space-between',
    backgroundColor: "rgba(255,255,255,0.7)",
    height: 50,
    flexDirection: "row",
  },
  tableHeadTextStyle: {
    color: "rgba(0,0,0,0.6)",
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
  },
  nutrimentsTextStyle: {
    padding: 15,
  },
  valuesTextStyle: {
    padding: 15,
    textAlign: "right",
  }
})
import {Button, StyleSheet, Text, View, Image, FlatList, ScrollView} from "react-native";
import React, {useState, useEffect} from "react";
import {FAB, ListItem} from "react-native-elements";
import {RequireJwt} from "../components/RequireJwt";

const axios = require('axios');

export default function ProductGeneralInfo({navigation, route}) {
  const {itemId, productData} = route.params;

  return (
      <RequireJwt>
        <View style={{flexDirection: "row"}}>
          <Text style={{fontSize: 50}}>{productData["name"]}</Text>
          <Image source={{uri: "https://images.openfoodfacts.org/images/products/506/033/563/5266/front_de.14.200.jpg"}}
                 style={{resizeMode: "contain", width: 100, height: 100}}/>
        </View>
        <ScrollView>
            {
              productData['ingredients']['ingredients'].map((item, index) => (
                  <ListItem key={index}>
                    <ListItem.Content>
                      <Text>{item["name"]}</Text>
                    </ListItem.Content>
                  </ListItem>
              ))
            }
          </ScrollView>
      </RequireJwt>
  );
}



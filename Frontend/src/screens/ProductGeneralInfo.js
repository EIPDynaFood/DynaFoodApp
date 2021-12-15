import {Button, StyleSheet, Text, View, Image, FlatList, ScrollView} from "react-native";
import React, {useState, useEffect} from "react";
import {FAB, ListItem} from "react-native-elements";
import {RequireJwt} from "../components/RequireJwt";

const axios = require('axios');

export default function ProductGeneralInfo({navigation, route}) {
  const {itemId, productData} = route.params;

  console.log(productData['ingredients']['ingredients'])

  return (
      <RequireJwt>
        <View>
          <Text style={{fontSize: 50}}>{productData["name"]}</Text>
          <Image source={{uri: productData['images']}}/>
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
        </View>
      </RequireJwt>
  );
}

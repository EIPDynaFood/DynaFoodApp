import {Button, StyleSheet, Text, View} from "react-native";
import React, {useState, useEffect} from "react";
import {FAB} from "react-native-elements";
import {RequireJwt} from "../components/RequireJwt";

const axios = require('axios');

export default function ProductGeneralInfo({navigation, route}) {
  const {itemId, productData} = route.params;

  return (
      <RequireJwt>
        <View>
          <View>
            <Text style={{fontSize: 50}}>{productData["name"]}</Text>
          </View>
        </View>
      </RequireJwt>
  );
}

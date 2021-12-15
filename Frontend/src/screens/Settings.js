import {Button, StyleSheet, Text, View} from "react-native";
import React, { useState, useEffect } from "react";
import { FAB } from 'react-native-elements';
import { Icon } from 'react-native-elements'
import {useNavigation} from "@react-navigation/native";
import useJwt from "../../Jwt"

export default function Settings({navigation, route}) {
    const {logout} = useJwt()

    return (
        <View style={StyleSheet.absoluteFillObject}>
            <Text>Settings</Text>
            <Button style={{top: 10}} title="logout" onPress={() => {
              logout()
              navigation.navigate("Login")
            }}/>
        </View>
    );
}

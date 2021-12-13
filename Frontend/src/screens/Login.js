import {Button, StyleSheet, Text, View} from "react-native";
import React, { useState, useEffect } from "react";
import { FAB } from 'react-native-elements';
import { Icon } from 'react-native-elements'
import {useNavigation} from "@react-navigation/native";

export default function Login({navigation, route}) {
    const { itemId, setJwt } = route.params;

    return (
        <View>
            <Text>Login</Text>
            <Button title="register" onPress={() => navigation.navigate("Register")}/>
            <Button style={{top: 10}} title="simulate fake jwt" onPress={() => setJwt("thisWountAuthForReal")}/>
        </View>
    );
}

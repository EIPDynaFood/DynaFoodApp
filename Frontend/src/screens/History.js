import {Button, StyleSheet, Text, View} from "react-native";
import React, { useState, useEffect } from "react";
import { FAB } from 'react-native-elements';
import { Icon } from 'react-native-elements'
import {useNavigation} from "@react-navigation/native";

export default function History() {
    const navigation = useNavigation();

    return (
        <View style={StyleSheet.absoluteFillObject}>
            <FAB
                color="black"
                icon={{ name: 'add', color: 'white'}}
                style={{position: "absolute", bottom: 16, right: 16}}
                onPress={() => {navigation.navigate('Scanner')}}
            />
        </View>
    );
}

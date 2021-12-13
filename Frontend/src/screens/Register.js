import {Button, StyleSheet, Text, View} from "react-native";
import React, { useState, useEffect } from "react";
import { FAB } from 'react-native-elements';
import { Icon } from 'react-native-elements'
import {useNavigation} from "@react-navigation/native";

export default function Register() {
    const navigation = useNavigation();

    return (
        <View style={StyleSheet.absoluteFillObject}>
            <Text>Register</Text>
        </View>
    );
}

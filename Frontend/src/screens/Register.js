import {Button, StyleSheet, Text, View} from "react-native";
import React, { useState, useEffect } from "react";
import { FAB } from 'react-native-elements';
import { Icon } from 'react-native-elements'
import {useNavigation} from "@react-navigation/native";
import useJwt from "../../Jwt"
import axios from "axios";

export default function Register() {
    const navigation = useNavigation();
    const {login} = useJwt()

    const firstName = "firstName"
    const lastName = "lastName"
    const userName = "userName"
    const email = "twasdawadswdwadwdasaswadwadsest@test.com"
    const phoneNumber = "00000000"
    const password = "password"

    return (
        <View style={StyleSheet.absoluteFillObject}>
            <Text>Register</Text>
            <Button style={{top: 10}} title="Login" onPress={() => {
                var qs = require('qs');
                var data = qs.stringify({
                    'firstName': `${firstName}`,
                    'lastName': `${lastName}`,
                    'userName': `${userName}`,
                    'email': `${email}`,
                    'phoneNumber': `${phoneNumber}`,
                    'password': `${password}`
                });
                var config = {
                    method: 'post',
                    url: 'https://dynafood.herokuapp.com/signup',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    data : data
                };
                axios(config)
                    .then(function (response) {
                        console.log(JSON.stringify(response.data));
                        login(JSON.stringify(response.data))
                        navigation.navigate("History");
                    })
                    .catch(function (error) {
                        alert("Something went wrong in your Registration process:\n" + error.message)
                        console.log(error);
                        console.log(error.response);
                        console.log("email in use");
                    });
            }}/>

        </View>
    );
}

import {Button, StyleSheet, Text, View} from "react-native";
import React, { useState, useEffect } from "react";
import { FAB } from 'react-native-elements';
import { Icon } from 'react-native-elements'
import {useNavigation} from "@react-navigation/native";
import useJwt from "../../Jwt"
import axios from "axios";

export default function Login({navigation, route}) {
    const {login} = useJwt()
    const email = "twasdawadswdwadwdasaswadwadsest@test.com"
    const password = "password"
    return (
        <View>
            <Text>Login</Text>
            <Button title="register" onPress={() => navigation.navigate("Register")}/>
            <Button style={{top: 10}} title="simulate fake jwt" onPress={() => {
              login("thisWountAuthForReal")
              navigation.navigate("History")
            }}/>
            <Button style={{top: 10}} title="Login" onPress={() => {
                var config = {
                    method: 'get',
                    url: 'https://dynafood.herokuapp.com/login?email=' + `${email}` + '&password=' + `${password}`,
                };
                axios(config)
                    .then(function (response) {
                        console.log(JSON.stringify(response.data));
                        navigation.navigate("History")
                    })
                    .catch(function (error) {
                        alert("Wrong user credentials:\n" + error.message)
                        console.log(error);
                    });
            }}/>
        </View>
    );
}

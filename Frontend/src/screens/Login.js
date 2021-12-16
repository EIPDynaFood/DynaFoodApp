import {Button, StyleSheet, Text, View, SafeAreaView, TextInput} from "react-native";
import React, { useState, useEffect } from "react";
import { FAB } from 'react-native-elements';
import { Icon } from 'react-native-elements'
import {useNavigation} from "@react-navigation/native";
import useJwt from "../../Jwt"
import axios from "axios";


const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default function Login({navigation, route}) {
    const {login} = useJwt()

    const guestEmail = "twasdawadswdwadwdasaswadwadsest@test.com"
    const guestPassword = "password"

    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");

    return (
        <View>
            <TextInput
                style={styles.input}
                onChangeText={onChangeEmail}
                value={email}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}
                secureTextEntry={true}
            />
            <Text>Login</Text>
            <Button title="register" onPress={() => navigation.navigate("Register")}/>
            <Button title="test" onPress={() =>
                console.log("email = " + email + "\tpassword= " + password)
            }/>
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

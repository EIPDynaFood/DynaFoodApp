import {StyleSheet, View, Image, TextInput} from "react-native";
import React, { useState, useEffect } from "react";
import { Button } from 'react-native-elements';
import {useNavigation} from "@react-navigation/native";
import useJwt from "../../Jwt"
import axios from "axios";

export default function Register() {
    const navigation = useNavigation();
    const {login} = useJwt()

    const firstName = "firstName"
    const lastName = "lastName"
    const userName = "userName"
    const phoneNumber = "00000000"

    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [ConPassword, onChangeConPassword] = React.useState("")

    const sendRegister = () => {
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
    }

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/logo_frame_invisible.png')}
                    style={{width:270, height:150, marginBottom:50}}/>
            <TextInput
                placeholder="Email..."
                style={styles.input}
                onChangeText={onChangeEmail}
                value={email}
                keyboardType="email-address"
            />
            <TextInput
                placeholder="Password..."
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}
                secureTextEntry={true}
                autoCapitalize='none'
            />
            <TextInput
                placeholder="Confirme your Password..."
                style={styles.input}
                onChangeText={onChangeConPassword}
                value={ConPassword}
                secureTextEntry={true}
                autoCapitalize='none'
            />
            <Button
                title="Register"
                containerStyle= {{
                    margin:15
                }}
                buttonStyle={{
                    width:"40%",
                    borderRadius:5,
                    backgroundColor:"#2E4D44",
                }}
                titleStyle={{color:"white", flex:1}}
                onPress={() => {
                    sendRegister();
                }}
                />
            <Button
                title="Cancel"
                containerStyle= {{
                    margin:15
                }}
                buttonStyle={{
                    width:"40%",
                    borderRadius:5,
                    backgroundColor:"#FFF",
                }}
                titleStyle={{color:"#2E4D44", flex:1}}
                onPress={() => {
                    navigation.navigate("Login")
                }}
                />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        width: "70%",
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: "lightgrey",
        borderRadius: 5,
    },
    loginbtn: {
        width: "50%",
        backgroundColor: "#2E4D44",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10,
    },
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
    },
});
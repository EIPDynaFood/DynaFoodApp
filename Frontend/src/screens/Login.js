import {StyleSheet, View, TextInput, Image, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { FAB, Button} from 'react-native-elements';
import useJwt from "../../Jwt"
import axios from "axios";
import { styles } from "../styles/Style";
import PasswordInput from "../components/PasswordInput";
import { TouchableOpacity } from "react-native-gesture-handler";



export default function Login({navigation, route}) {
    const {login} = useJwt()

    const guestEmail = "i@i.com"
    const guestPassword = "password"

    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");

    const sendLogin = () => {
        var config = {
            method: 'get',
            url: 'https://dynafood-server.herokuapp.com/login?email=' + `${email}` + '&password=' + `${password}`,
        };
        axios(config)
            .then(function (response) {
                login(response.data)
                navigation.navigate("History")
            })
            .catch(function (error) {
                alert("Wrong user credentials:\n" + error.message)
                console.log(error);
            });
    };

    return (
        <View style={{flex:1}}>
            <View style={styles.container}>

                <Image source={require('../../assets/logo_frame_invisible.png')}
                        style={styles.registerLoginLogo}/>
                <TextInput
                    placeholder="Email..."
                    style={styles.input}
                    onChangeText={onChangeEmail}
                    value={email}
                    keyboardType="email-address"
                    />
                <PasswordInput
                style={styles.inputPassword}
                onChangeTextFunc={onChangePassword}
                value={password}
                viewStyle={styles.passwordView}
                placeholder="Password..."
                />

                <Button
                    title="Login"
                    containerStyle= {{
                        margin:15
                    }}
                    buttonStyle={styles.primaryButtonStyle}
                    titleStyle={{color:"white", flex:1}}
                    onPress={() => {
                        sendLogin();
                    }}
                    />

                <Button
                    title="Register"
                    type="outline"
                    containerStyle= {{
                        margin:15
                    }}
                    buttonStyle={styles.secondaryButtonStyle}
                    titleStyle={{color:"#2E4D44", flex:1}}
                    onPress={() => {
                        navigation.navigate("Register")
                    }}
                    />
            </View>
            <Button
                title="Login as guest"
                containerStyle={{margin: 15}} 
                buttonStyle={styles.loginAsGuest}
                titleStyle={{color:"#FFF", flex:1}}
                onPress={() => {
                    onChangeEmail(guestEmail);
                    onChangePassword(guestPassword);
                    }}
            />
        </View>
    );
}
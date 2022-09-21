import {View, TextInput, Image, Text, TouchableOpacity} from "react-native";
import React from "react";
import {Button} from 'react-native-elements';
import {StyleSheet, View, TextInput, Image, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { FAB, Button} from 'react-native-elements';
import useJwt from "../../Jwt"
import axios from "axios";
import {styles} from "../styles/Style";
import useLang from "../../Language";
import PasswordComponent from "../components/ForgotPWD";
import LanguageDropdown from "../components/LanguageDropdown";
import { styles } from "../styles/Style";
import {OAuthButton} from "../components/OAuthButton";
import PasswordInput from "../components/PasswordInput";
import { TouchableOpacity } from "react-native-gesture-handler";



export default function Login({navigation, route}) {
    const {login} = useJwt()

    const guestEmail = "i@i.com"
    const guestPassword = "password"

    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");

    const translations = require("../../translations/screens/Login.json")
    const {lang} = useLang()

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
                alert(translations["Error"][lang] + error.message)
                console.log(error);
            });
    };

    return (
        <View style={{flex:1}}>
            <View style={{alignItems: "flex-end", paddingRight: 10, paddingTop: 10}}>
                <LanguageDropdown/>
            </View>
            <View style={styles.container}>

                <Image source={require('../../assets/logo_frame_invisible.png')}
                        style={styles.registerLoginLogo}/>
                <TextInput
                    placeholder={translations["Email"][lang]}
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
                placeholder={translations["Password"][lang]}
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate("ForgotID")}>
                    <Text style={styles.forgotpwd}>{translations["Forgot"][lang]}</Text>
                </TouchableOpacity>

                <Button
                    title={translations["Login"][lang]}
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
                    title={translations["Register"][lang]}
                    type="outline"
                    containerStyle= {{
                        margin:15
                    }}
                    buttonStyle={styles.secondaryButtonStyle}
                    titleStyle={{color:"#2E4D44", flex:1}}
                    onPress={() => {
                        navigation.navigate("SendEmail")
                    }}
                    />
                <Text style={styles.textInfo}>Or</Text>
                <View style={{flexDirection:"row"}}>
                    <OAuthButton service={"Facebook"}/>
                    <OAuthButton service={"Google"}/>
                </View>
            </View>
            <Button
                title={translations["Guest"][lang]}
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
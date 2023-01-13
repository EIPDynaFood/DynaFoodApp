import {View, TextInput, Image, Text, StyleSheet} from "react-native";
import {Button} from 'react-native-elements';
import React, { useState, useEffect } from "react";
import { endpoint } from '../../config';
import useJwt from "../../Jwt"
import axios from "axios";
import useLang from "../../Language";
import LanguageDropdown from "../components/LanguageDropdown";
import { styles } from "../styles/Style";
import PasswordInput from "../components/PasswordInput";
import { TouchableOpacity } from "react-native-gesture-handler";



export default function Login({navigation}) {
    const {login} = useJwt()

    const guestEmail = "i@i.com"
    const guestPassword = "SuperSecurePassword123-"

    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");

    const translations = require("../../translations/screens/Login.json")
    const {lang} = useLang()

    const sendLogin = () => {
        var config = {
            method: 'get',
            url: endpoint + 'login?email=' + `${email}` + '&password=' + `${password}`,
            rejectUnauthorized: false,
        };
        console.log(config.url)
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
                <Text style={styles.forgotpwd}
                      onPress={() => {navigation.navigate("SendEmail")}}>
                    {translations["Forgot"][lang]}
                </Text>
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
                        navigation.navigate("Register")
                    }}
                    />
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
import {View, TextInput, Image, Text} from "react-native";
import {Button} from 'react-native-elements';
import React from "react";
import { endpoint } from '../../config';
import axios from "axios";
import useLang from "../../Language";
import LanguageDropdown from "../components/LanguageDropdown";
import { styles } from "../styles/Style";
import PasswordInput from "../components/PasswordInput";
import * as SecureStore from 'expo-secure-store';

export default function Login({navigation}) {
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
        localStorage.setItem('email', email)
        axios(config)
            .then(function (response) {
                SecureStore.setItemAsync('jwt', response.data["token"]).then(() => {
                    SecureStore.setItemAsync('refreshToken', response.data["refresh_token"]).then(() => {
                        onChangeEmail("");
                        onChangePassword("");
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'History' }],
                        });
                    });
                });
            })
            .catch((error) => {
                alert(translations["Error"][lang] + error.response.data["Error"])
            })
    };

    return (
        <View style={{flex:1}}>
            <View style={{alignItems: "flex-end", paddingRight: 10, paddingTop: 10}}>
                <LanguageDropdown/>
            </View>
            <View style={styles.container}>

                <Image source={require('../../assets/logo_frame_invisible.png')}
                        style={styles.registerLoginLogo} resizeMode="contain"/>
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
        </View>
    );
}
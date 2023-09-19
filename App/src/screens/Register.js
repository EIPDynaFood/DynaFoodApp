import {View, Image, TextInput, Text} from "react-native";
import React from "react";
import { Button } from 'react-native-elements';
import {useNavigation} from "@react-navigation/native";
import axios from "axios";
import { styles } from "../styles/Style";
import useLang from "../../Language";
import PasswordInput from "../components/PasswordInput";
import { endpoint } from '../../config';
import APIRoute from "../../API";


export default function Register() {
    const navigation = useNavigation();

    const firstName = "firstName"
    const lastName = "lastName"
    const userName = "userName"
    const phoneNumber = "00000000"

    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [ConPassword, onChangeConPassword] = React.useState("")

    const translations = require("../../translations/screens/Register.json")
    const {lang} = useLang()

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
                url: endpoint + 'signup',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data : data
            };
            APIRoute(() => axios(config)
                .then(function () {
                    alert(translations["Success"][lang])
                    navigation.navigate("Login");
                })
                .catch((error) => {
                    if (error.response.status === 401)
                        throw(error);
                    alert(translations["Error"][lang] + error.message)
                    console.log(error);
                    console.log(error.response);
                }));
    }

    return (
        <View style={styles.containerRegister}>
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
            viewStyle={styles.passwordView}
            style={styles.inputPassword}
            onChangeTextFunc={onChangePassword}
            value={password}
            placeholder={translations["Password"][lang]}
            />
            <PasswordInput
            viewStyle={styles.passwordView}
            style={styles.inputPassword}
            onChangeTextFunc={onChangeConPassword}
            value={ConPassword}
            placeholder={translations["PasswordConfirm"][lang]}
            />
            <Text style={{color:"#696969",width: "70%", fontStyle: "italic", fontSize: 10}}>
                {translations["PasswordInfo"][lang]}
            </Text>
            <Button
                title={translations["Register"][lang]}
                containerStyle= {{
                    margin:15
                }}
                buttonStyle={styles.primaryButtonStyle}
                titleStyle={{color:"white", flex:1}}
                onPress={() => {
                    sendRegister();
                }}
                />
            <Button
                title={translations["Cancel"][lang]}
                type="outline"
                containerStyle= {{
                    margin:15
                }}
                buttonStyle={styles.secondaryButtonStyle}
                titleStyle={{color:"#2E4D44", flex:1}}
                onPress={() => {
                    navigation.navigate("Login")
                }}
                />
        </View>
    );
}
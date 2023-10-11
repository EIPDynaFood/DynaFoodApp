import {View, Image, TextInput, Text} from "react-native";
import React from "react";
import { Button } from 'react-native-elements';
import {useNavigation} from "@react-navigation/native";
import axios from "axios";
import { styles } from "../styles/Style";
import useLang from "../../Language";
import PasswordInput from "../components/PasswordInput";
import { endpoint } from '../../config';


export default function Register() {
    const navigation = useNavigation();

    const [emailStyle, setEmailStyle] = React.useState({borderColor: "lightgrey"});
    const [passwordStyle, setPasswordStyle] = React.useState({borderColor: "lightgrey"});

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
        setEmailStyle({borderColor: "lightgrey"});
        setPasswordStyle({borderColor: "lightgrey"});

        if (email === "") {
            setEmailStyle({borderColor: "#DB3A34"})
            alert(translations["NoMatch"][lang])
            return
        }
        if (password !== ConPassword) {
            setPasswordStyle({borderColor: "#DB3A34"})
            alert(translations["NoMatch"][lang])
            return
        }
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
           axios(config)
                .then(function () {
                    alert(translations["Success"][lang])
                    navigation.navigate("Login");
                })
                .catch((error) => {
                    if (error.response.data.reason === "email")
                        setEmailStyle({borderColor: "#DB3A34"})
                    if (error.response.data.reason === "password")
                        setPasswordStyle({borderColor: "#DB3A34"})
                    alert(translations["Error"][lang] + error.message)
                })
    }

    return (
        <View style={styles.containerRegister}>
            <Image source={require('../../assets/logo_frame_invisible.png')}
                    style={styles.registerLoginLogo} resizeMode="contain"/>
            <TextInput
                placeholder={translations["Email"][lang]}
                style={[styles.input, emailStyle]}
                onChangeText={onChangeEmail}
                value={email}
                keyboardType="email-address"
            />
            <PasswordInput
            viewStyle={[styles.passwordView, passwordStyle]}
            style={styles.inputPassword}
            onChangeTextFunc={onChangePassword}
            value={password}
            placeholder={translations["Password"][lang]}
            />
            <PasswordInput
            viewStyle={[styles.passwordView, passwordStyle]}
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
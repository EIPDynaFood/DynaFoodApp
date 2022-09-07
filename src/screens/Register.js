import {View, Image, TextInput} from "react-native";
import React from "react";
import { Button } from 'react-native-elements';
import {useNavigation} from "@react-navigation/native";
import useJwt from "../../Jwt"
import axios from "axios";
import { styles } from "../styles/Style";

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

    const translations = require("../../translations/screens/Register.json")

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
                url: 'https://dynafood-server.herokuapp.com/signup',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data : data
            };
            axios(config)
                .then(function (response) {
                    login(JSON.stringify(response.data))
                    navigation.navigate("History");
                })
                .catch(function (error) {
                    alert(translations["Error"] + error.message)
                    console.log(error);
                    console.log(error.response);
                    console.log("email in use");
                });
    }

    return (
        <View style={styles.containerRegister}>
            <Image source={require('../../assets/logo_frame_invisible.png')}
                    style={styles.registerLoginLogo}/>
            <TextInput
                placeholder={translations["Email"]}
                style={styles.input}
                onChangeText={onChangeEmail}
                value={email}
                keyboardType="email-address"
            />
            <TextInput
                placeholder={translations["Password"]}
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}
                secureTextEntry={true}
                autoCapitalize='none'
            />
            <TextInput
                placeholder={translations["PasswordConfirm"]}
                style={styles.input}
                onChangeText={onChangeConPassword}
                value={ConPassword}
                secureTextEntry={true}
                autoCapitalize='none'
            />
            <Button
                title={translations["Register"]}
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
                title={translations["Cancel"]}
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
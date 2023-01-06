import {Text, TextInput, View} from "react-native";
import React, {useState} from "react";
import {styles} from "../styles/Style";
import {Button} from "react-native-elements";
import axios from "axios";
import useLang from "../../Language";
import PasswordInput from "../components/PasswordInput";
import translations from "../../translations/screens/ResetPassword.json";
import qs from "qs";

export default function ResetPassword({navigation}) {
    const [password, onChangePassword] = useState("")
    const [confirm, onChangeConfirm] = useState("")

    const translations = require("../../translations/screens/ResetPassword.json")
    const {lang} = useLang()

    const resetPassword = () => {
        if (password !== confirm) {
            alert(translations["MatchingError"][lang])
            return
        }
        var qs = require('qs');
        var data = qs.stringify({
            'password': `${password}`
        });
        var config = {
            method: 'post',
            url: 'http://x2024dynafood545437452001.westeurope.cloudapp.azure.com:8081/resetPassword',
            data : data
        };
        axios(config).then((res) => {
            if (res.status === 409) {
                alert(translations["PasswordError"][lang])
            }
            console.log("success");
            navigation.navigate("Login")
        }).catch((err) => {
            console.log("catch");
            alert(err.message)
            console.log(err);
        });
    }

    return (
        <View style={{flex:1}}>
            <View style={styles.container}>
                <Text style={styles.textInfo}>
                    {translations["Message"][lang]}
                </Text>
                <PasswordInput
                    placeholder={translations["Password"][lang]}
                    style={styles.inputPassword}
                    onChangeTextFunc={onChangePassword}
                    value={password}
                    viewStyle={styles.passwordView}
                />
                <PasswordInput
                    style={styles.inputPassword}
                    placeholder={translations["Confirm"][lang]}
                    onChangeTextFunc={onChangeConfirm}
                    value={confirm}
                    viewStyle={styles.passwordView}
                />
                <Button
                    title={translations["Reset"][lang]}
                    containerStyle= {{
                        margin:15
                    }}
                    buttonStyle={styles.primaryButtonStyle}
                    titleStyle={{color:"white", flex:1}}
                    onPress={() => {
                        resetPassword();
                    }}
                />
            </View>
        </View>
    )
}
import {Text, TextInput, View} from "react-native";
import React, {useState} from "react";
import {styles} from "../styles/Style";
import {Button} from "react-native-elements";
import axios from "axios";
import useLang from "../../Language";
import qs from "qs";

export default function VerifyCode({navigation}) {
    const [code, onChangeCode] = useState("")

    const translations = require("../../translations/screens/Authentication.json")
    const {lang} = useLang()

    const checkCode = () => {
        var qs = require('qs');
        var data = qs.stringify({
            'code': `${code}`
        });
        var config = {
            method: 'post',
            url: 'http://x2024dynafood545437452001.westeurope.cloudapp.azure.com:8081/verifyCode',
            data : data
        };
        axios(config).then((res) => {
            if (res.status === 403) { // no data to return
                alert(translations["Error"][lang]);
            } else {
                console.log("success");
                navigation.navigate("ResetPassword")
            }
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
                <TextInput
                    placeholder={translations["Code"][lang]}
                    style={styles.input}
                    onChangeText={onChangeCode}
                    value={code}
                    keyboardType="default"
                />
                <Button
                    title={translations["Submit"][lang]}
                    containerStyle= {{
                        margin:15
                    }}
                    buttonStyle={styles.primaryButtonStyle}
                    titleStyle={{color:"white", flex:1}}
                    onPress={() => {
                        checkCode();
                    }}
                />
            </View>
        </View>
    )
}
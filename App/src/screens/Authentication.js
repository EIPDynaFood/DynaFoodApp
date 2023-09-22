import {Text, TextInput, View} from "react-native";
import React, {useState} from "react";
import {styles} from "../styles/Style";
import {Button} from "react-native-elements";
import axios from "axios";
import useLang from "../../Language";
import { endpoint } from '../../config';
import APIRoute from "../../API";

export default function VerifyCode(props) {
    const [code, onChangeCode] = useState("")
    const email = props.route.params.email
    const translations = require("../../translations/screens/Authentication.json")
    const {lang} = useLang()

    const checkCode = () => {
        var qs = require('qs');
        var data = qs.stringify({
            'email': `${props.route.params.email}`,
            'code': `${code}`
        });
        var config = {
            method: 'post',
            url: endpoint + 'verifyCode',
            data : data
        };
        APIRoute(() => axios(config).then((res) => {
            if (res.status === 403) { // no data to return
                alert(translations["Error"][lang]);
            } else {
                props.navigation.navigate("ResetPassword", {email, code})
            }
        }).catch((err) => {
            if (err.response.status === 401)
                throw(err);
            alert(err.message)
            console.log(err);

        }));
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
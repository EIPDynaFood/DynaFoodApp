import {Text, TextInput, View} from "react-native";
import React, {useState} from "react";
import {styles} from "../styles/Style";
import {Button} from "react-native-elements";
import axios from "axios";
import { endpoint } from '../../config';
import APIRoute from "../../API";


export default function SendEmail({navigation}) {
    const [email, onChangeEmail] = useState("")

    const sendMail = () => {
        APIRoute(() => axios.get(endpoint + "resetPassword?email=" + email).then((res) => {
            console.log(res.status)
            if (res.status === 204) { // no data to return
                alert("Could not find E-Mail address");
            } else {
                console.log("success");
                navigation.navigate("VerifyCode", {email})
            }
        }).catch((err) => {
            if (err.response.status === 401) {
                throw(err)
            }
            console.log("catch");
            alert(err.message)
            console.log(err);
        }));
    }

    return (
        <View style={{flex:1}}>
            <View style={styles.container}>
                <Text style={styles.textInfo}>
                    Please enter the e-mail address of your Account to reset your password
                </Text>
                <TextInput
                    placeholder="Email..."
                    style={styles.input}
                    onChangeText={onChangeEmail}
                    value={email}
                    keyboardType="email-address"
                />
                <Button
                    title="Submit"
                    containerStyle= {{
                        margin:15
                    }}
                    buttonStyle={styles.primaryButtonStyle}
                    titleStyle={{color:"white", flex:1}}
                    onPress={() => {
                        sendMail();
                    }}
                />
            </View>
        </View>
    )
}
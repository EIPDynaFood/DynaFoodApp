import {Text, TextInput, View} from "react-native";
import React, {useState} from "react";
import {styles} from "../styles/Style";
import {Button} from "react-native-elements";
import axios from "axios";

export default function SendEmail({navigation}) {
    const [email, onChangeEmail] = useState("")

    const sendMail = () => {
        axios.get("http://x2024dynafood545437452001.westeurope.cloudapp.azure.com:8081/resetPassword?email=" + email).then((res) => {
            if (res.status === 204) { // no data to return
                alert("Could not found E-Mail address");
            } else {
                console.log("success");
                navigation.navigate("VerifyCode")
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
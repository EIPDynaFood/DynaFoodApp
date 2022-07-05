import {Text, TextInput, View} from "react-native";
import React, {useState} from "react";
import {styles} from "../styles/Style";
import {Button} from "react-native-elements";

export default function SendEmail({navigation}) {
    const [email, onChangeEmail] = useState("")

    const sendMail = () => {
        console.log("send Email and navigate to Authentication")
    }

    return (
        <View style={{flex:1}}>
            <View style={styles.container}>
                <Text>
                    Please enter the E-mail-address of your Account to reset your password
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
import {View, Image, TextInput, Text} from "react-native";
import React from "react";
import { Button } from 'react-native-elements';
import {useNavigation} from "@react-navigation/native";
import useJwt from "../../Jwt"
import axios from "axios";
import { styles } from "../styles/Style";
import useLang from "../../Language";

export default function ForgotID() {
    const navigation = useNavigation();

    const [email, onChangeEmail] = React.useState("");
    const translations = require("../../translations/screens/ForgotID.json")
    const {lang} = useLang()


    return (
        <View style={styles.containerRegister}>
            <Image source={require('../../assets/logo_frame_invisible.png')}
                    style={styles.registerLoginLogo}/>
            <Text style={styles.forgotpwdtxt}>{translations["Message"][lang]}</Text>
            <TextInput
                placeholder={translations["Email"][lang]}
                style={styles.input}
                onChangeText={onChangeEmail}
                value={email}
                keyboardType="email-address"
            />
            <Button
                title={translations["Reset"][lang]}
                containerStyle= {{
                    margin:15
                }}
                buttonStyle={styles.primaryButtonStyle}
                titleStyle={{color:"white", flex:1}}
                onPress={() => {
                    alert("Email sent");
                    navigation.navigate("Login")
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
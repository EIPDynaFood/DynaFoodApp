import {View, TextInput, Image} from "react-native";
import React from "react";
import {Button} from 'react-native-elements';
import useJwt from "../../Jwt"
import axios from "axios";
import {styles} from "../styles/Style";
import useLang from "../../Language";

export default function Login({navigation, route}) {
    const {login} = useJwt()

    const guestEmail = "i@i.com"
    const guestPassword = "password"

    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");

    const translations = require("../../translations/screens/Login.json")
    const {lang} = useLang()

    const sendLogin = () => {
        var config = {
            method: 'get',
            url: 'https://dynafood-server.herokuapp.com/login?email=' + `${email}` + '&password=' + `${password}`,
        };
        axios(config)
            .then(function (response) {
                login(response.data)
                navigation.navigate("History")
            })
            .catch(function (error) {
                alert(translations["Error"][lang] + error.message)
                console.log(error);
            });
    };

    return (
        <View style={{flex:1}}>
            <View>
                <Dropdown title="" icon={}></Dropdown>
            </View>
            <View style={styles.container}>

                <Image source={require('../../assets/logo_frame_invisible.png')}
                        style={styles.registerLoginLogo}/>
                <TextInput
                    placeholder={translations["Email"][lang]}
                    style={styles.input}
                    onChangeText={onChangeEmail}
                    value={email}
                    keyboardType="email-address"
                    />
                <TextInput
                    placeholder={translations["Password"][lang]}
                    style={styles.input}
                    onChangeText={onChangePassword}
                    value={password}
                    secureTextEntry={true}
                    autoCapitalize='none'
                    />

                <Button
                    title={translations["Login"][lang]}
                    containerStyle= {{
                        margin:15
                    }}
                    buttonStyle={styles.primaryButtonStyle}
                    titleStyle={{color:"white", flex:1}}
                    onPress={() => {
                        sendLogin();
                    }}
                    />

                <Button
                    title={translations["Register"][lang]}
                    type="outline"
                    containerStyle= {{
                        margin:15
                    }}
                    buttonStyle={styles.secondaryButtonStyle}
                    titleStyle={{color:"#2E4D44", flex:1}}
                    onPress={() => {
                        navigation.navigate("Register")
                    }}
                    />
            </View>
            <Button
                title={translations["Guest"][lang]}
                containerStyle={{margin: 15}} 
                buttonStyle={styles.loginAsGuest}
                titleStyle={{color:"#FFF", flex:1}}
                onPress={() => {
                    onChangeEmail(guestEmail);
                    onChangePassword(guestPassword);
                    }}
            />
        </View>
    );
}
import {StyleSheet, View, TextInput, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { FAB, Button} from 'react-native-elements';
import {useNavigation} from "@react-navigation/native";
import useJwt from "../../Jwt"
import axios from "axios";



export default function Login({navigation, route}) {
    const {login} = useJwt()

    const guestEmail = "i@i.com"
    const guestPassword = "password"

    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");

    const sendLogin = () => {
        var config = {
            method: 'get',
            url: 'https://dynafood.herokuapp.com/login?email=' + `${email}` + '&password=' + `${password}`,
        };
        axios(config)
            .then(function (response) {
                // console.log(JSON.stringify(response.data));
                login(response.data)
                navigation.navigate("History")
            })
            .catch(function (error) {
                alert("Wrong user credentials:\n" + error.message)
                console.log(error);
            });
    };

    return (
        <View style={styles.container}>

            <Image source={require('../../assets/logo_frame_invisible.png')}
                    style={{width:270, height:150, marginBottom:50}}/>
            <TextInput
                placeholder="Email..."
                style={styles.input}
                onChangeText={onChangeEmail}
                value={email}
                keyboardType="email-address"
            />
            <TextInput
                placeholder="Password..."
                style={styles.input}
                onChangeText={onChangePassword}
                value={password}
                secureTextEntry={true}
                autoCapitalize='none'
            />

            <Button
                title="Login"
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
                title="Register"
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
            <FAB
              color="#2E4D44"
              title="Login as guest"
              style={{position: "relative", top:60, left: 90}}
              onPress={() => {
                  onChangeEmail(guestEmail);
                  onChangePassword(guestPassword);
                }}
                hidden
                />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        width: "70%",
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: "lightgrey",
        borderRadius: 5,
    },
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
    },
    primaryButtonStyle: {
        marginTop:10,
        width:"50%",
        borderRadius:10,
        backgroundColor:"#2E4D44",
    },
    secondaryButtonStyle: {
        width:"50%",
        borderRadius:10,
        backgroundColor:"#FFF",
        borderWidth:3,
        borderColor:"#2E4D44",
    }
});

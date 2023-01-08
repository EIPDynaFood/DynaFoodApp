import {TouchableHighlight, View} from "react-native";
import React, {useEffect, useState} from "react";
import {SocialIcon} from "react-native-elements";
import axios from "axios";
import * as Google from 'expo-auth-session/providers/google';
import useJwt from "../../Jwt";
import {useNavigation} from "@react-navigation/native";

export function OAuthButton(props) {
    const {login} = useJwt()
    const navigation = useNavigation()

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '937582346205-s9a0tt8imebrt973dt03vf7fm4huk5gr.apps.googleusercontent.com',
        iosClientId: '937582346205-s9a0tt8imebrt973dt03vf7fm4huk5gr.apps.googleusercontent.com',
        androidClientId: '937582346205-s9a0tt8imebrt973dt03vf7fm4huk5gr.apps.googleusercontent.com',
        webClientId: '937582346205-s9a0tt8imebrt973dt03vf7fm4huk5gr.apps.googleusercontent.com',
    });

    useEffect(() => {
        if (response?.type === 'success') {
            console.log(response["authentication"]["accessToken"])
            login(response["authentication"]["accessToken"]);
            navigation.navigate("History")
        }
    }, [response]);

    const signIn = () => {
        promptAsync().then(r => console.log(r));
        console.log(props.service)
        /*if (props.service === "Google") {
            axios.get('http://x2024dynafood545437452001.westeurope.cloudapp.azure.com:8081/user/login/google').then((res) => {
                console.log(res.data)
                login(res.data);
                props.navigation.navigate("History")
            }).catch((err) => {
                console.log('catch');
                alert(err.message);
                console.log(err);
            });
        }
        else if (props.service === "Facebook") {
            axios.get('http://x2024dynafood545437452001.westeurope.cloudapp.azure.com:8081/user/login/google').then((res) => {
                console.log(res.data)
                login(res.data);
                props.navigation.navigate("History")
            }).catch((err) => {
                console.log('catch');
                alert(err.message);
                console.log(err);
            });
        }*/
    }

    return (
            <SocialIcon type={props.service.toLowerCase()}
                        onPress={() => {signIn()}}/>)
}
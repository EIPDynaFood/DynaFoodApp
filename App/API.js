import axios from "axios";
import {endpoint} from "./config";
import * as SecureStore from 'expo-secure-store';

export default async function APIRoute(callbackRoute) {
    await SecureStore.getItemAsync("refreshToken").then((refreshToken) => {
        callbackRoute().catch((err) => {
        if (err.response.status === 401) {
            console.log("refreshToken:" + refreshToken)
            axios.get(endpoint + "refresh?refresh_token=" + refreshToken)
                .then((res) => {
                        SecureStore.setItemAsync('jwt', res.data["token"]);
                        SecureStore.setItemAsync('refreshToken', res.data["refresh_token"]);
                        callbackRoute();
                    }
                ).catch((err) => console.log(err))
        }
    })}).catch()
}
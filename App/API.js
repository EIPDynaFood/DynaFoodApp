import axios from "axios";
import {endpoint} from "./config";
import * as SecureStore from 'expo-secure-store';

let lastExecutionTime = 0;

export default async function APIRoute(callbackRoute) {
    await SecureStore.getItemAsync("refreshToken").then((refreshToken) => {
        callbackRoute().catch((err) => {
            if (err.response.status === 401) {
                const currentTime = Date.now();
                if (currentTime - lastExecutionTime >= 5000) {
                    lastExecutionTime = currentTime;
                    console.log("refresh")
                    axios.get(endpoint + "refresh?refresh_token=" + refreshToken)
                        .then((res) => {
                                SecureStore.setItemAsync('jwt', res.data["token"]);
                                SecureStore.setItemAsync('refreshToken', res.data["refresh_token"]);
                                APIRoute(callbackRoute);
                            }
                        ).catch((err) => console.log(err))
                } else {
                    callbackRoute().catch((err) => {
                        if (err.response.status === 401) {
                            console.log("refresh")
                            APIRoute(callbackRoute)
                        }
                    })
                }
            }}).catch()
    })
}
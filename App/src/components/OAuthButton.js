import {TouchableHighlight, View} from "react-native";
import {SocialIcon} from "react-native-elements";
import axios from "axios";
import translations from "../../translations/components/ProductHistory.json";
import useJwt from "../../Jwt";

export function OAuthButton(props) {
    const {login} = useJwt()

    const signIn = () => {
        console.log(props.service)
        if (props.service === "Google") {
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
    }

    return (
            <SocialIcon type={props.service.toLowerCase()}
                        onPress={() => {signIn()}}/>)
}
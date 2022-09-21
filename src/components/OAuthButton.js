import {TouchableHighlight, View} from "react-native";
import {SocialIcon} from "react-native-elements";

export function OAuthButton(props) {
    const signIn = () => {
        console.log(props.service)
    }

    return (
            <SocialIcon type={props.service.toLowerCase()}
                        onPress={() => {signIn()}}/>)
}
import {Text, TouchableHighlight, View} from "react-native";
import {SocialIcon} from "react-native-elements";

export function OAuthButton(props) {
    return (
        <TouchableHighlight>
        <View type={"outline"}>
            <SocialIcon
                        type={props.service.toLowerCase()}/>
        </View>
    </TouchableHighlight>)
}
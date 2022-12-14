import { View, Text } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { TextInput} from "react-native-gesture-handler";

const PasswordInput = (props) => {
    
    const [isSecureEntry, setSecureEntry]=useState(true)
    const [textTouchable, setText]= useState("Show")

    return(
        <View style={props.viewStyle}>
            <TextInput
            placeholder={props.placeholder}
            style={props.style}
            onChangeText={props.onChangeTextFunc}
            value={props.value}
            secureTextEntry={isSecureEntry}
            autoCapitalize='none'/>
            <TouchableOpacity onPress={() => {
                setSecureEntry((prev) => !prev)
                if (textTouchable === "Show") {
                    setText("Hide")
                }
                if (textTouchable === "Hide") {
                    setText("Show")
                }
            }}>
                <Text>{textTouchable}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default PasswordInput;
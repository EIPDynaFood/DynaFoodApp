import { View, Text } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { TextInput} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { size } from "lodash";

const PasswordInput = (props) => {
    
    const [showPassword, setShowPassword] = useState(false);
    const [isSecureEntry, setSecureEntry]=useState(true)
    const [textTouchable, setText]= useState("Show")

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return(
        <View style={props.viewStyle}>
            <TextInput
            placeholder={props.placeholder}
            style={props.style}
            onChangeText={props.onChangeTextFunc}
            value={props.value}
            secureTextEntry={!showPassword}
            autoCapitalize='none'/>
            <TouchableOpacity onPress={togglePasswordVisibility}>
                <Ionicons 
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="gray"
                    />
            </TouchableOpacity>
        </View>
    );
}

export default PasswordInput;
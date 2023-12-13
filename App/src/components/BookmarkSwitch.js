import React, {useState} from "react";
import {TouchableOpacity, View} from "react-native";
import {Icon} from "react-native-elements";

export default function BookmarkSwitch(props) {

    const [isEnabled, setIsEnabled] = useState(false)

    const toggleSwitch = () => {
        setIsEnabled(!isEnabled);
        props.set(!isEnabled)
    }

    return (
        <View style={{flex: 1, flexDirection: 'row-reverse', alignItems: 'center'}}>
            <TouchableOpacity onPress={toggleSwitch} style={{
                backgroundColor: isEnabled ? '#2E4D44' : '#FFFFFF',
                borderColor: '#2E4D44',
                borderWidth: 1,
                borderRadius: 100,
                padding: 5,
            }}>
                <Icon name={isEnabled ? 'bookmark' : 'bookmark-outline'} size={20} color={isEnabled ? '#FFFFFF' : '#2E4D44'}/>
            </TouchableOpacity>
        </View>
    );
}

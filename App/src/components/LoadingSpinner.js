import React from "react";
import {FAB} from "react-native-elements";
import {View} from "react-native";
import {styles} from "../styles/Style";

export default function LoadingSpinner() {
    return (
        <View style={styles.loadingSpinnerContainer}>
            <FAB color="#376D55" size={"small"} loading/>
        </View>
    );
}

import {Text} from "react-native";
import React from "react";

export function ProductRating(props) {
    let color = '#3E8D6F';

    if (props.score < 30) {
        color = '#D93636';
    } else if (props.score >= 30 && props.score <= 70) {
        color = '#E6B82F';
    }

    return (
        <Text style={{color, fontSize: 64, fontWeight: 'bold', paddingTop: 140, textAlign: 'center'}}>
            {props.score}
        </Text>
    );
}

import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Slider from '@react-native-community/slider'
import useLang from "../../Language";
import axios from "axios";
import {endpoint} from "../../config";
import { styles } from "../styles/Style";

export default function ThreeStateSlider(props) {
    const [sliderValue, setSliderValue] = useState(0);
    const translations = require("../../translations/components/ThreeStateSlider.json")
    const {lang} = useLang();

    const SLIDER_STATES = [
        { value: 0, label: translations["No"][lang] },
        { value: 1, label: translations["Casual"][lang] },
        { value: 2, label: translations["Strict"][lang] },
    ];

    const updateState = (value) => {
        setSliderValue(value)
        var qs = require('qs');
        var data = qs.stringify({
            'alertActivation': `${true}`,
            'restrictionName': `${props.name}`,
            'strongness': `${value}`,
        });
        var config = {
            method: 'patch',
            url: endpoint + 'settings',
            data : data
        };
        axios(config).then(() => {})
    }
    const getStateLabel = () => {
        const state = SLIDER_STATES.find((s) => s.value === sliderValue);
        return state ? state.label : '';
    };

    return (
        <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>{getStateLabel()}</Text>
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={2}
                step={1}
                value={sliderValue}
                onValueChange={setSliderValue}
                thumbTintColor={'#376D55'}
            />
        </View>
    );
}

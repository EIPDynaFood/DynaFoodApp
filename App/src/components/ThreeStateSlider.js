import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import Slider from '@react-native-community/slider'
import useLang from "../../Language";
import axios from "axios";
import {endpoint} from "../../config";
import { styles } from "../styles/Style";
import APIRoute from "../../API";


export default function ThreeStateSlider(props) {
    const [sliderValue, setSliderValue] = useState(0);
    const translations = require("../../translations/components/ThreeStateSlider.json")
    const {lang} = useLang();

    const SLIDER_STATES = [
        { value: 0, label: translations["No"][lang] },
        { value: 1, label: translations["Casual"][lang] },
        { value: 2, label: translations["Strict"][lang] },
    ];

    useEffect(() => {
        const config = {
            method: 'get',
            url: endpoint + 'settings'
        };
        APIRoute(() => axios(config)
            .then(function (response) {
                const value = parseInt(response.data.filter((obj) => obj.restrictionname == props.name)[0].strongness)
                console.log("value: " + value + props.name)
                console.log("sliderValue: " + sliderValue + props.name)
                console.log(value != sliderValue)
                if (value != sliderValue)
                    setSliderValue(value)
            })
            .catch(function (error) {
                if (error.response.status === 401)
                    throw(error);
                console.log(error);
            }));
    })

    const updateState = (value) => {
        if (value == sliderValue)
            return
        setSliderValue(value)
        console.log("patch to: " + value)
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
        APIRoute(() => axios(config)
            .then().catch((err) => {
                if (err.response.status === 401)
                    throw(err)
            }))
            
    }
    const getStateLabel = () => {
        const state = SLIDER_STATES.find((s) => s.value == sliderValue);
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
                onValueChange={updateState}
                thumbTintColor={'#376D55'}
            />
        </View>
    );
}

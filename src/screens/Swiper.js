import React from "react";
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Onboarding from "react-native-onboarding-swiper";
import { styles } from "../styles/Style";

const translations = require( "../../translations/screens/Swiper.json")

const Skip = ({...props}) => (
    <Button
        title={translations["Skip"]}
        color="#000000"
        {...props}
    />
);

const Next = ({...props}) => (
    <Button
        title={translations["Next"]}
        color="#000000"
        {...props}
    />
);

const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:8}}
        {...props}
    >
        <Text style={{fontSize:16}}>{translations["Done"]}</Text>
    </TouchableOpacity>
);

const Swiper = ({navigation}) => {
    return (
        <Onboarding
            SkipButtonComponent={Skip}
            NextButtonComponent={Next}
            DoneButtonComponent={Done}
            onSkip={() => navigation.replace("Login")}
            onDone={() => navigation.replace("Login")}
            pages={[
                {
                    backgroundColor: '#E2E6DB',
                    image: <Image style={styles.imagineStyle} source={require('../../assets/logo_frame.png')} />,
                    title: translations["Page1Title"],
                    subtitle: translations["Page1Subtitle"],
                },
                {
                    backgroundColor: '#bfeeb7',
                    image: <Image style={styles.imagineStyle} source={require('../../assets/scanner.png')} />,
                    title: translations["Page2Title"],
                    subtitle: translations["Page2Subtitle"],
                },
                {
                    backgroundColor: '#c2f70f',
                    image: <Image style={styles.imagineStyle} source={require('../../assets/eco-scores/eco-score-A.png')} />,
                    title: translations["Page3Title"],
                    subtitle: translations["Page3Subtitle"]
                },
                {
                    backgroundColor: '#f25e35',
                    image: <Image style={styles.imagineStyle} source={require('../../assets/settings.png')} />,
                    title: translations["Page4Title"],
                    subtitle: translations["Page4Subtitle"],
                },
            ]}
        />
    );
};

export default Swiper;
import React from "react";
import {Text, Button, Image, TouchableOpacity} from 'react-native';
import Onboarding from "react-native-onboarding-swiper";
import { styles } from "../styles/Style";
import useLang from "../../Language";

const Swiper = ({navigation}) => {
    const translations = require( "../../translations/screens/Swiper.json")
    const {lang} = useLang()

    const Skip = ({...props}) => (
        <Button
            title={translations["Skip"][lang]}
            color="#000000"
            {...props}
        />
    );

    const Next = ({...props}) => (
        <Button
            title={translations["Next"][lang]}
            color="#000000"
            {...props}
        />
    );

    const Done = ({...props}) => (
        <TouchableOpacity
            style={{marginHorizontal:8}}
            {...props}
        >
            <Text style={{fontSize:16}}>{translations["Done"][lang]}</Text>
        </TouchableOpacity>
    );

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
                    title: translations["Page1Title"][lang],
                    subtitle: translations["Page1Subtitle"][lang],
                },
                {
                    backgroundColor: '#bfeeb7',
                    image: <Image style={styles.imagineStyle} source={require('../../assets/scanner.png')} />,
                   title: translations["Page2Title"][lang],
                    subtitle: translations["Page2Subtitle"][lang],
                },
                {
                    backgroundColor: '#c2f70f',
                    image: <Image style={styles.imagineStyle} source={require('../../assets/eco-scores/eco-score-A.png')} />,
                    title: translations["Page3Title"][lang],
                    subtitle: translations["Page3Subtitle"][lang]
                },
                {
                    backgroundColor: '#f25e35',
                    image: <Image style={styles.imagineStyle} source={require('../../assets/settings.png')} />,
                    title: translations["Page4Title"][lang],
                    subtitle: translations["Page4Subtitle"][lang],
                },
            ]}
        />
    );
};

export default Swiper;

import React from "react";
import {Text, Button, Image, TouchableOpacity} from 'react-native';
import Onboarding from "react-native-onboarding-swiper";
import { styles } from "../styles/Style";
import useLang from "../../Language";
import LanguageDropdown from "../components/LanguageDropdown";
//import './i18n/i18n';
//import {View, Text,Pressable} from 'react-native';
//import {useTranslation} from 'react-i18next';

const Swiper = ({navigation}) => {
    const translations = require( "../../translations/screens/Swiper.json")
    const {lang} = useLang()
    console.log(lang)

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

    /*const {t, i18n} = useTranslation();

    const [currentLanguage,setLanguage] =useState('en');

    const changeLanguage = value => {
        i18n
        .changeLanguage(value)
        .then(() => setLanguage(value))
        .catch(err => console.log(err));
    };*/

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
                    /*<Pressable
                    onPress={() => changeLanguage('en')}
                    style={{
                        backgroundColor:
                        currentLanguage === 'en' ? '#33A850' : '#d3d3d3',
                        padding: 20,
                    }}>
                    <Text>Welcome to DynaFood</Text>*/
                    title: translations["Page1Title"][lang],
                    subtitle: translations["Page1Subtitle"][lang],
                },
                {
                    backgroundColor: '#bfeeb7',
                    image: <Image style={styles.imagineStyle} source={require('../../assets/scanner.png')} />,
                    /*<Pressable
                    onPress={() => changeLanguage('en')}
                    style={{
                        backgroundColor:
                        currentLanguage === 'en' ? '#33A850' : '#d3d3d3',
                        padding: 20,
                    }}>
                    <Text>Within one click you can access all nutritional information of a product</Text>*/
                    title: translations["Page2Title"][lang],
                    subtitle: translations["Page2Subtitle"][lang],
                },
                {
                    backgroundColor: '#c2f70f',
                    image: <Image style={styles.imagineStyle} source={require('../../assets/eco-scores/eco-score-A.png')} />,
                    /*<Pressable
                    onPress={() => changeLanguage('en')}
                    style={{
                        backgroundColor:
                        currentLanguage === 'en' ? '#33A850' : '#d3d3d3',
                        padding: 20,
                    }}>
                    <Text>We evaluate your groceries and give you a summary with healthy alternatives</Text>*/
                    title: translations["Page3Title"][lang],
                    subtitle: translations["Page3Subtitle"][lang]
                },
                {
                    backgroundColor: '#f25e35',
                    image: <Image style={styles.imagineStyle} source={require('../../assets/settings.png')} />,
                    /*<Pressable
                    onPress={() => changeLanguage('en')}
                    style={{
                        backgroundColor:
                        currentLanguage === 'en' ? '#33A850' : '#d3d3d3',
                        padding: 20,
                    }}>
                    <Text>Use the settings to get a personalized evaluation. Just for you!</Text>*/
                    title: translations["Page4Title"][lang],
                    subtitle: translations["Page4Subtitle"][lang],
                },
            ]}
        />
    );
};

export default Swiper;

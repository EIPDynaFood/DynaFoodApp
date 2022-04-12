import React from "react";
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Onboarding from "react-native-onboarding-swiper";

const Skip = ({...props}) => (
    <Button
        title="Skip"
        color="#000000"
        {...props}
    />
);

const Next = ({...props}) => (
    <Button
        title="Next"
        color="#000000"
        {...props}
    />
);

const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:8}}
        {...props}
    >
        <Text style={{fontSize:16}}>Done</Text>
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
                    title: 'Welcome to DynaFood',
                    subtitle: 'dynamically scan your food in real life',
                },
                {
                    backgroundColor: '#bfeeb7',
                    image: <Image style={styles.imagineStyle} source={require('../../assets/scanner.png')} />,
                    title: 'Scan',
                    subtitle: 'Within one click you can access all nutritional information of a product',
                },
                {
                    backgroundColor: '#c2f70f',
                    image: <Image style={styles.imagineStyle} source={require('../../assets/eco-scores/eco-score-A.png')} />,
                    title: 'Nutri-Score',
                    subtitle: 'Get all nutriment of Scanned product in the desired language in your settings',
                },
                {
                    backgroundColor: '#f25e35',
                    image: <Image style={styles.imagineStyle} source={require('../../assets/settings.png')} />,
                    title: 'Personalized Settings',
                    subtitle: 'Make sure to get notified if any allergens is present',
                },
            ]}
        />
    );
};

export default Swiper;

const deviceWidth = Math.round(Dimensions.get('window').width) - 80
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imagineStyle: {
        height: 100,
        width: deviceWidth,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        opacity: 0.9,
        alignContent: 'center',
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    imagineStyleTwo: {
        height: 300,
        width: 150,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        opacity: 0.9,
        alignContent: 'center',
        alignSelf: 'center',
        resizeMode: 'contain',
    },
});
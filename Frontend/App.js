import * as React from 'react';

import { View } from 'react-native';
import { StyleSheet, Image } from "react-native";

// Currently printing an image
// How to start:
//    npm start
//    open Expo then click the “Scan QR Code” and Scan the QR code in our terminal.
//    or "Scan QR Code" using IOS camera

export default function App() {

  return (
    <View style={ styles.container }>
        <Image source={require('./media/food.jpg')} style={{ width: 120, height: 120 }} />
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#515151',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        elevation: 40,
        backgroundColor: "#9e9e9e",
        borderRadius: 45,
        paddingVertical: 4,
        paddingHorizontal: 10,
    },
    text: {
        color: 'white',
        padding: 50,
        flex: .3,
        fontWeight: 'bold',
        fontSize: 20
    },
});
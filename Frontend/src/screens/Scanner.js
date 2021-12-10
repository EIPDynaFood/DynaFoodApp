import {BarCodeScanner} from "expo-barcode-scanner";
import {Button, StyleSheet, Text, View} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import {FAB} from "react-native-elements";

export default function Scanner() {

    const [hasPermission, setHasPermission] = useState();
    const [productCode, setProductCode] = useState(null);

    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({data}) => {
        // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        setProductCode(data);
        localStorage.setItem("productCode", data);
        navigation.navigate('Product');
    };

    return (
        <View style={StyleSheet.absoluteFillObject}>
            <BarCodeScanner
                onBarCodeScanned={handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            <FAB
                color="black"
                title="<use debug code>"
                style={{position: "absolute", bottom: 16, right: 16}}
                onPress={() => {handleBarCodeScanned({data: 4017100759000})}}
            />
        </View>
    );
}

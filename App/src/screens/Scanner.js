import {Button, StyleSheet, Text, View} from "react-native";
import React, {useState, useEffect} from "react";
import {FAB} from "react-native-elements";
import {RequireJwt} from "../components/RequireJwt";
import { Camera } from 'expo-camera';
import { styles } from "../styles/Style";
import useLang from "../../Language";

function ScannerOverlay() {

    return (
        <View style={styles.cameraOne}>
            <View style={styles.cameraTwo}/>
        </View>
    );
}

export default function Scanner({ navigation, route }) {
  const translations = require("../../translations/screens/Scanner.json")
  const {lang} = useLang();

  const [productCode, setProductCode] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [shouldCameraMount, setShouldCameraMount] = useState(true);

    const [hasPermission, setHasPermission] = useState(null);

    const focus = navigation.addListener('focus', (e) => {
        setShouldCameraMount(true);
    });

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

  const handleBarCodeScanned = ({type, data}) => {
      setProductCode(data);
      localStorage.setItem("productCode", data);
      setShouldCameraMount(false);
      navigation.navigate('Product');
  };

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>{translations["NoPermission"][lang]}</Text>;
    }

  return (
      <RequireJwt>
        <View style={StyleSheet.absoluteFillObject}>
            {shouldCameraMount &&
                <Camera
                    style={{height: "100%", aspectRatio: 9 / 16}}
                    ratio="16:9"
                    type={type}
                    onBarCodeScanned={handleBarCodeScanned}
                />
            }
            <ScannerOverlay/>
          <FAB
              color="black"
              title={translations["Debug"][lang]}
              style={{position: "absolute", bottom: 16, right: 16}}
              onPress={() => {
                handleBarCodeScanned({data: "5060335635266"})
              }}
          />
        </View>
      </RequireJwt>
  );
}

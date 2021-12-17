import {Button, StyleSheet, Text, View} from "react-native";
import React, {useState, useEffect} from "react";
import {FAB} from "react-native-elements";
import {RequireJwt} from "../components/RequireJwt";
import { Camera } from 'expo-camera';

function ScannerOverlay() {

    return (
        <View style={{
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
        }}>
            <View style={{
                width: "70%",
                aspectRatio: 2 / 1,
                borderColor: "white",
                borderWidth: 2,
                borderStyle: "dashed",
                borderRadius: 10,
            }}/>
        </View>
    );
}

export default function Scanner({ navigation, route }) {
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
        return <Text>No access to camera</Text>;
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
              title="<use debug code>"
              style={{position: "absolute", bottom: 16, right: 16}}
              onPress={() => {
                handleBarCodeScanned({data: "5060335635266"})
              }}
          />
        </View>
      </RequireJwt>
  );
}

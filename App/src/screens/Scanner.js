import {Text, View, useWindowDimensions} from "react-native";
import React, {useState, useEffect} from "react";
import {FAB} from "react-native-elements";
import {RequireJwt} from "../components/RequireJwt";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { styles } from "../styles/Style";
import useLang from "../../Language";

function ScannerOverlay() {

    return (
        <View style={styles.cameraOne}>
            <View style={styles.cameraTwo}/>
        </View>
    );
}

function useFullScreenCameraStyle(ratio = 3/4) {
    const window = useWindowDimensions();
    const isPortrait = window.height >= window.width;
    let cameraStyle;

    if (isPortrait) {
        // If the device is in portrait mode, we need to increase the width and move it out of the screen
        const widthByRatio = window.height * ratio;
        const widthOffsetByRatio = -((widthByRatio - window.width) / 2);

        // The camera is scaled up to "cover" the full screen, while maintainin ratio
        cameraStyle = { left: widthOffsetByRatio, right: widthOffsetByRatio };
        // But because the camera is also a wrapping element, we need to reverse this offset to align the content
    } else {
        // If the device is in landscape mode, we need to increase the height and move it out of the screen
        const heightByRatio = window.width * ratio;
        const heightOffsetByRatio = -((heightByRatio - window.height) / 2);

        // See portrait comments
        cameraStyle = { top: heightOffsetByRatio, bottom: heightOffsetByRatio };
    }

    return cameraStyle;
}

export default function Scanner({ navigation, route }) {
  const translations = require("../../translations/screens/Scanner.json")
  const {lang} = useLang();
    const cameraStyle = useFullScreenCameraStyle();

  const [productCode, setProductCode] = useState(null);
    const [shouldCameraMount, setShouldCameraMount] = useState(true);

    const [hasPermission, setHasPermission] = useState(null);

    const focus = navigation.addListener('focus', (e) => {
        setShouldCameraMount(true);
    });

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
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
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end'
        }}>
            {shouldCameraMount &&
                <BarCodeScanner
                    style={[{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                    }, cameraStyle]}
                    onBarCodeScanned={handleBarCodeScanned}
                />
            }
            <ScannerOverlay/>
            {/*<FAB
                color="black"
                title={translations["Debug"][lang]}
                style={{position: "absolute", bottom: 16, right: 16}}
                onPress={() => {
                    handleBarCodeScanned({data: "5060335635266"})
                }}
            />*/}
        </View>
      </RequireJwt>
  );
}
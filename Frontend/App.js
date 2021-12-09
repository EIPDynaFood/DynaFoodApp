import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';

// Currently printing an image
// How to start:
//    npm start
//    open Expo then click the “Scan QR Code” and Scan the QR code in our terminal.
//    or "Scan QR Code" using IOS camera

export default function App() {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({type, data}) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
      <View style={styles.container}>
        <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
        />
        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)}/>}
      </View>
  );
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
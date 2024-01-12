import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import { styles } from "../styles/Style";

const CameraCapture = ({ onCapture }) => {
    const cameraRef = useRef(null);
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleCapture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync({ base64: true });
            onCapture(photo);
        }
    };

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={{ flex: 1 }}>
            <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={cameraRef}
                    ratio="16:9">
                <View style={styles.captureButtonContainer}>
                    <TouchableOpacity style={styles.captureButton} onPress={handleCapture} />
                </View>
            </Camera>
        </View>
    );
};

export default CameraCapture;
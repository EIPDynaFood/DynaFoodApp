import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Svg, Circle } from 'react-native-svg';

const RoundProgressBar = ({ progress }) => {
    const color = progress < 33 ? '#D93636' : progress <= 66 ? '#E6B82F' : '#3E8D6F';
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = [circumference, circumference];
    const strokeDashoffset = progress === 1 ? circumference - (100 / 100) * circumference : circumference - (progress / 100) * circumference;

    return (
        <View style={styles.container}>
            <Svg width="100%" height="100%" viewBox="0 0 100 100" scaleX={-1} scaleY={-1}>
                <Circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="transparent"
                    stroke={color}
                    strokeWidth="12"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                />
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 75,
        height: 75,
        borderRadius: 75,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        position: 'absolute',
        paddingTop: 15,
        top: 0,
        width: 150,
        height: 150,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default RoundProgressBar;

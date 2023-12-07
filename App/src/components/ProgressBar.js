import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Svg, Path } from 'react-native-svg';
import {Icon} from "react-native-elements";

const ProgressBar = (props) => {
    let color = '#3E8D6F';

    if (props.progress < 33) {
        color = '#D93636';
    } else if (props.progress >= 33 && props.progress <= 66) {
        color = '#E6B82F';
    }

    const angle = (props.progress / 100) * 180;
    const x1 = 50 + 50 * Math.cos((180 * Math.PI) / 180);
    const y1 = 50 + 50 * Math.sin((180 * Math.PI) / 180);
    const x2 = 50 + 50 * Math.cos((180 + angle) * (Math.PI / 180));
    const y2 = 50 + 50 * Math.sin((180 + angle) * (Math.PI / 180));

    // Create the SVG path for the arc
    const path = `M${x1} ${y1} A50 50 0 ${angle > 180 ? 1 : 0} 1 ${x2} ${y2}`;

    return (
        <TouchableOpacity onPress={props.onPress}>
        <View style={styles.container}>
            <View style={styles.background}>
                <Text style={[styles.progressText, {color: color}]}>{props.progress}</Text>
                <Icon name={'info-outline'} size={20} color={"#a9a9a9"} containerStyle={{marginLeft: 2}}/>
            </View>
            <Svg width="100%" height="100%" viewBox="0 0 100 100">
                <Path
                    d={path}
                    fill="transparent"
                    stroke={color}
                    strokeWidth="12"
                />
            </Svg>
        </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 150,
        height: 150,
        borderTopLeftRadius: 75,
        borderTopRightRadius: 75,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        position: 'absolute',
        paddingTop: 15,
        top: 0,
        width: 150,
        height: 75,
        borderTopLeftRadius: 75,
        borderTopRightRadius: 75,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row"
    },
    progressText: {
        fontSize: 36,
        fontWeight: 'bold',
        paddingLeft: 22
    },
});

export default ProgressBar;

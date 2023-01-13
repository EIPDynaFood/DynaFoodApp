import { styles } from "../styles/Style";
import React, {useState, useEffect} from "react";
import {RequireJwt} from "../components/RequireJwt";
import { ScrollView } from "react-native-gesture-handler";
import {Alert, Button, StyleSheet,Pressable, Text, View, Image, ToastAndroid, TextInput, TouchableOpacity, Modal} from "react-native";
import {Dropdown} from "../components/DropDown"
import RadioButtonRN from 'radio-buttons-react-native';
import { endpoint } from '../../config';

export default function Feedback({navigation, route}) {
    const qs = require('qs');
    const axios = require('axios');
    const [modalVisible, setModalVisible] = useState(false);
    let [feedbackText, onChangeFeedbackText] = React.useState(null);
    const [selected, setSelected] = useState(undefined);
    let colors = [
        {
            label: 'appreciation'
        },
        {
            label: 'comment'
        },
        {
            label: 'suggestion'
        }, 
        {
            label: "bug"
        }
    ];
    return (
        <RequireJwt>
            <ScrollView style={[styles.wrapperStyle, {backgroundColor: '#E2E6DB'}]}>
                <View style={[styles.mainContainerStyle, {backgroundColor: "#FFFFFF"}]}>
                    <Modal animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                        setModalVisible(!modalVisible);
                        }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={[styles.tableHeadTextStyle, {fontSize: 20, fontWeight: "bold"}]}>Please Select the Type of Feedback</Text>
                                <RadioButtonRN
                                    data={colors}
                                    selectedBtn={(e) => setSelected(e)}
                                    circleSize={16}
                                    box={false}
                                    initial={1}
                                    animationTypes={['shake']}
                                    style={styles.radioButton}
                                    textStyle={styles.radioButtonText}
                                />
                                <Pressable
                                    style={[styles.signIn, {borderColor: '#ffff', borderWidth: 1,
                                    marginTop: 5, marginBottom: 20, backgroundColor: '#376D55', alignSelf: "flex-end", width: "50%"}]}
                                    onPress={() => {
                                        setModalVisible(!modalVisible)
                                        let data = qs.stringify({
                                            'reason': `${selected.label}`,
                                            'content': `${feedbackText}`,
                                        });
                                        let config = {
                                            method: 'post',
                                            url: endpoint + 'feedback',
                                            headers: {
                                                'Content-Type': 'application/x-www-form-urlencoded',
                                            },
                                            data : data
                                        };
                                        axios(config).then((res) => {
                                            if (res.status === 200) { // no data to return
                                                alert("Thanks for your feedback!");
                                                navigation.goBack(null);
                                            } else {
                                                alert("Something went wrong :O" + res.data)
                                            }
                                            }).catch((err) => {
                                            console.log("catch");
                                            alert("something went wrong on sending your feedback" + err)
                                            navigation.goBack(null);
                                            console.log(err);
                                            });
                                    }
                                }>
                                    <Text style={styles.textStyle}>Send</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                    <View style={{marginLeft: 15, marginTop: 10, marginBottom: 10}}>
                        <Text style={[styles.tableHeadTextStyle, {color: "rgba(0,0,0,0.6)"}]}>Feedback</Text>
                        <Text style={[styles.text, {color: "rgba(0,0,0,0.6)", fontSize: 20, marginTop: 20, marginLeft: 15}]}>Write your Feedback</Text>
                        <TextInput
                            multiline={true}
                            style={styles.multilineInput}
                            onChangeText={onChangeFeedbackText}
                            value={feedbackText}
                            placeholder="enter feedback here"
                        />
                        <TouchableOpacity
                            onPress={() => setModalVisible(true)}
                            style={[styles.signIn, {borderColor: '#376D55', borderWidth: 1,
                                marginTop: 5, marginBottom: 9, backgroundColor: '#ffff', width: "50%", alignSelf: "flex-end", marginEnd: 20}]}
                        >
                            <Text style={[styles.textSign, { color: '#376D55'}]}>Send Feedback</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </RequireJwt>
    );
}
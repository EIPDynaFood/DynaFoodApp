import React, { useState, useEffect } from "react";
import { StatusBar, TextInput, Switch, View, ScrollView, Text, Button, StyleSheet, Dimensions, Image, TouchableOpacity, Platform, Linking } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Divider } from "react-native-elements";
import useJwt from "../../Jwt"
import {RequireJwt} from "../components/RequireJwt";
import axios from "axios";

export default function Settings({navigation, route}) {
    var axios = require('axios');
    const {logout} = useJwt()
    let {jwt} = useJwt()
    let [lactose, setLactose] = useState(false);
    let [nuts, setNuts] = useState(false);
    let [tomato, setTomato] = useState(false);
    let [gluten, setGluten] = useState(false);
    let [seedFruit, setSeedFruit] = useState(false);
    let [peanut, setPeanut] = useState(false);
    let [vegetarian, setVegetarian] = useState(false);
    let [vegan, setVegan] = useState(false);
    const isFocused = useIsFocused();

    var config = {
        method: 'get',
        url: 'https://dynafood-server.herokuapp.com/settings'
    };
    useEffect(() => {
        axios(config)
            .then(function (response) {
                //console.log(JSON.stringify(response.data));
                //setSettings(response.data)
                //console.log(response.data)
                for (const restriction of response.data) {
                    console.log(restriction["restrictionname"]);
                    if (restriction["restrictionname"] === "lactose")
                        setLactose(true)
                    if (restriction["restrictionname"] === "nuts")
                        setNuts(true)
                    if (restriction["restrictionname"] === "peanut")
                        setPeanut(true)
                    if (restriction["restrictionname"] === "gluten")
                        setGluten(true)
                    if (restriction["restrictionname"] === "seedFruit")
                        setSeedFruit(true)
                    if (restriction["restrictionname"] === "tomato")
                        setTomato(true)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [isFocused]);

    function handleLactose() {
        setLactose(!lactose)
    }

    function handleNuts() {
        setNuts(!nuts)
    }

    function handleTomato() {
        setTomato(!tomato)
    }

    function handleGluten() {
        setGluten(!gluten)
    }

    function handleSeedFruit() {
        setSeedFruit(!seedFruit)
    }

    function handlePeanut() {
        setPeanut(!peanut)
    }

    function handleVegetarian() {
        setVegetarian(!vegetarian)
    }

    function handleVegan() {
        setVegan(!vegan)
    }

    function logoutUser() {
        logout()
    }

    return (
        <RequireJwt>
            <ScrollView style={styles.wrapperStyle}>
                <View style={styles.mainContainerStyle}>
                    <View style={{marginLeft: 15, marginTop: 15}}>
                        <Text style={styles.tableHeadTextStyle}>Allergies</Text>
                        <Linear text='Lactose' value={lactose} onValueChange={() => handleLactose()}/>
                        <Divider style={{ paddingTop: 2, paddingBottom: 2}}/>
                        <Linear text='Nuts' value={nuts} onValueChange={() => handleNuts()}/>
                        <Divider style={{ paddingTop: 2, paddingBottom: 2}}/>
                        <Linear text='Tomato' value={tomato} onValueChange={() => handleTomato()}/>
                        <Divider style={{ paddingTop: 2, paddingBottom: 2}}/>
                        <Linear text='Gluten' value={gluten} onValueChange={() => handleGluten()}/>
                        <Divider style={{ paddingTop: 2, paddingBottom: 2}}/>
                        <Linear text='Seed' value={seedFruit} onValueChange={() => handleSeedFruit()}/>
                        <Divider style={{ paddingTop: 2, paddingBottom: 2}}/>
                        <Linear text='Peanut' value={peanut} onValueChange={() => handlePeanut()}/>
                        <Divider style={{ paddingTop: 2, paddingBottom: 2}}/>
                        <Text style={styles.tableHeadTextStyle}>Diets</Text>
                        <Linear text='Vegetarian' value={vegetarian} onValueChange={() => handleVegetarian()}/>
                        <Divider style={{ paddingTop: 2, paddingBottom: 2}}/>
                        <Linear text='Vegan' value={vegan} onValueChange={() => handleVegan()}/>
                        <Divider style={{ paddingTop: 2, paddingBottom: 2}}/>
                        <Text style={styles.tableHeadTextStyle}>SignOut</Text>
                        <View style={styles.button}>
                            <TouchableOpacity
                                onPress={() => logoutUser()}
                                style={[styles.signIn, {borderColor: '#376D55', borderWidth: 1,
                                    marginTop: 5, marginBottom: 20}]}
                            >
                                <Text style={[styles.textSign, { color: '#376D55'}]}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </RequireJwt>
    );
}

function Linear(props) {
    return (
        <View style={{paddingVertical: 10, paddingHorizontal: 90, flexDirection: "row", justifyContent: "flex-end"}}>
            <Text style={{alignSelf: "center", fontSize: 14, paddingRight: 20}}>
                {props.text}
            </Text>
            <Switch
                trackColor={{false: "#CEE3F8", true: "#376D55"}}
                value={props.value}
                onValueChange={props.onValueChange}
            />
        </View>
    );
  }

const styles = StyleSheet.create({
    wrapperStyle: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 30,
        paddingBottom: 90,
        backgroundColor: "#E2E6DB",
        },
    mainContainerStyle: {
        backgroundColor: "#FFFFFF",
        height: "100%",
        flexDirection: "row",
        justifyContent: 'space-between',
        },
    tableHeadStyle: {
        fontSize: 20,
        paddingBottom: 30,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'space-between',
        backgroundColor: "rgba(255,255,255,0.7)",
        height: 50,
        paddingTop: 30,
        },
    tableHeadTextStyle: {
        color: "rgba(0,0,0,0.6)",
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 15,
        fontSize: 30,
        paddingBottom: 20
        },
    nutrimentsTextStyle: {
        padding: 15,
        },
    valuesTextStyle: {
        padding: 15,
        textAlign: "right",
        },
    screen:{
        flex:1,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#00000025',
    },
    text:{
        color:'#000',
        fontWeight:'700',
        fontSize:30
    },
    button:{
        backgroundColor:'#fff',
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    buttonText:{
        color:'#fff',
        fontSize:25
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})

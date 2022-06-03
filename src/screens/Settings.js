import React, { useState, useEffect } from "react";
import { StatusBar, TextInput, Switch, View, ScrollView, Text, Button, StyleSheet, Dimensions, Image, TouchableOpacity, Platform, Linking } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Divider } from "react-native-elements";
import useJwt from "../../Jwt"
import {RequireJwt} from "../components/RequireJwt";
import axios from "axios";
import { styles } from "../styles/Style";

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
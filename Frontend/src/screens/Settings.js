import {StyleSheet, Switch, Text, View} from "react-native";
import React, { useState, useEffect } from "react";
import {Card, FAB, Button} from 'react-native-elements';
import { Icon } from 'react-native-elements';
import {useNavigation} from "@react-navigation/native";
import useJwt from "../../Jwt"
import * as PropTypes from "prop-types";
import {RequireJwt} from "../components/RequireJwt";
import axios from "axios";

function SettingSegment() {
    return (
        <View style={{borderBottomColor: 'rgba(0,0,0,0.1)', borderBottomWidth: 1}}>
        </View>
    );
}

export default function Settings({navigation, route}) {
    var axios = require('axios');
    const {logout} = useJwt()
    let [ loaded, setLoaded ] = useState(false);
    let {jwt} = useJwt()
    let [ settings, setSettings ] = useState(null);

    let [ lactose, setLactose ] = useState(false);
    let [ nuts, setNuts ] = useState(false);
    let [ tomato, setTomato ] = useState(false);
    let [ gluten, setGluten ] = useState(false);
    let [ seedFruit, setSeedFruit ] = useState(false);
    let [ peanut, setPeanut ] = useState(false);
    let [ vegetarian, setVegetarian ] = useState(false);
    let [ vegan, setVegan ] = useState(false);

    var config = {
        method: 'get',
        url: 'https://dynafood.herokuapp.com/settings'
    };
    useEffect(() => {
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setSettings(response.data)
                console.log(response.data)
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
    }, []);


    var qs = require('qs');
    var data = qs.stringify({
        'restrictionName': 'peanut',
        'alertActivation': 'true'
    });
    var configpost = {
        method: 'post',
        url: 'https://dynafood.herokuapp.com/settings',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiJiNzc2MjQ3Ni1kOWFkLTRiODUtODBmOS0xODE5MDcwYjUwYmYiLCJwYXNzd29yZCI6InBhc3N3b3JkIiwiaWF0IjoxNjM5NzQ0ODk3LCJleHAiOjE2Mzk3NDg0OTd9.Tj39MV0Eske2PQvI80oaABofXXi2RkTqHR3KRhCM2Ks'
        },
        data : data
    };



    return (
        <RequireJwt>
            <View style={{alignSelf: "center", width: "100%", marginTop: "10%", borderBottomColor: 'rgba(0,0,0,0.16)', borderBottomWidth: 1}}/>
            <View style={{alignSelf: "center", width: "100%", marginTop: 12, borderBottomColor: 'rgba(0,0,0,0.16)', borderBottomWidth: 1, }}>
                <View style={{alignSelf: "center", width: "85%"}}>
                    <Text style={{fontSize: 21, fontWeight: "bold"}}>
                        Allergies
                    </Text>
                    <Setting text='Lactose' value={lactose} onValueChange={setLactose}/>
                    <Setting text='Nuts' value={nuts} onValueChange={setNuts}/>
                    <Setting text='Tomato' value={tomato} onValueChange={setTomato}/>
                    <Setting text='Gluten' value={gluten} onValueChange={setGluten}/>
                    <Setting text='Seed Fruit' value={seedFruit} onValueChange={setSeedFruit}/>
                    <Setting text='Peanut' value={peanut} onValueChange={setPeanut}/>
                </View>
            </View>
            <View style={{alignSelf: "center", width: "100%", marginTop: 12, borderBottomColor: 'rgba(0,0,0,0.16)', borderBottomWidth: 1}}>
                <View style={{alignSelf: "center", width: "85%"}}>
                    <Text style={{fontSize: 21, fontWeight: "bold"}}>
                        Diets
                    </Text>
                    <Setting text='Vegetarian' value={vegetarian} onValueChange={setVegetarian}/>
                    <Setting text='Vegan' value={vegan} onValueChange={setVegan}/>
                </View>
            </View>
            <View style={{alignSelf: "center", width: "80%", flex: 1, justifyContent: "flex-end", marginBottom: 36}}>
                <Button
                    title="LOGOUT"
                    containerStyle= {{
                        margin:15,
                        alignItems:'center',
                        justifyContent: 'flex-end',
                        marginBottom: 36
                    }}
                    buttonStyle={{
                        width:"80%",
                        borderRadius:5,
                        backgroundColor:"#2E4D44",
                    }}
                    titleStyle={{color:"white", flex:1}}
                    onPress={() => {
                        logout()
                        navigation.navigate("Login")

                        /*axios(configpost)
                            .then(function (response) {
                                console.log(JSON.stringify(response.data));
                            })
                            .catch(function (error) {
                                console.log(error);
                            });*/
                    }}
                />
            </View>
        </RequireJwt>
    );
}

function Setting(props) {
    let thumbColourOn = "#000000";
    let thumbColourOff = "#ffffff";
    let thumbColour;
    if (props.value)
        thumbColour = thumbColourOn
    else
        thumbColour = thumbColourOff
    return (
        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <Text style={{alignSelf: "center", fontSize: 14, color: 'rgba(0,0,0,0.60)'}}>
                {props.text}
            </Text>
            <Switch
                trackColor={{false: "#00000030", true: "#00000080"}}
                thumbColor={thumbColour}
                value={props.value}
                onValueChange={props.onValueChange}
            />
        </View>
    );
}

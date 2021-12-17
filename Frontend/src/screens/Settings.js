import {Button, StyleSheet, Switch, Text, View} from "react-native";
import React, { useState, useEffect } from "react";
import {Card, FAB} from 'react-native-elements';
import { Icon } from 'react-native-elements'
import {useNavigation} from "@react-navigation/native";
import useJwt from "../../Jwt"
import * as PropTypes from "prop-types";
import {RequireJwt} from "../components/RequireJwt";

function SettingSegment() {
    return (
        <View style={{borderBottomColor: 'rgba(0,0,0,0.1)', borderBottomWidth: 1}}>
        </View>
    );
}

export default function Settings({navigation, route}) {
    const {logout} = useJwt()
    let [ loaded, setLoaded ] = useState(false);
    let jwt = localStorage.getItem('token');
    let [ settings, setSettings ] = useState(null);
    let [ peanut, setPeanut ] = useState(false);
    let [ gluten, setGluten ] = useState(false);
    let [ vegetarian, setVegetarian ] = useState(false);
    let [ vegan, setVegan ] = useState(false);

    return (
        <RequireJwt>
            <View style={{alignSelf: "center", width: "100%", marginTop: 12, borderBottomColor: 'rgba(0,0,0,0.16)', borderBottomWidth: 1, }}>
                <View style={{alignSelf: "center", width: "80%"}}>
                    <Text style={{fontSize: 12, fontWeight: "bold"}}>
                        Allergies
                    </Text>
                    <Setting text='Peanut' value={peanut} onValueChange={setPeanut}/>
                    <Setting text='Gluten' value={gluten} onValueChange={setGluten}/>
                </View>
            </View>
            <View style={{alignSelf: "center", width: "100%", marginTop: 12, borderBottomColor: 'rgba(0,0,0,0.16)', borderBottomWidth: 1}}>
                <View style={{alignSelf: "center", width: "80%"}}>
                    <Text style={{fontSize: 12, fontWeight: "bold"}}>
                        Diets
                    </Text>
                    <Setting text='Vegetarian' value={vegetarian} onValueChange={setVegetarian}/>
                    <Setting text='Vegan' value={vegan} onValueChange={setVegan}/>
                </View>
            </View>
            <View style={{alignSelf: "center", width: "100%", marginTop: 12, borderBottomColor: 'rgba(0,0,0,0.16)', borderBottomWidth: 1}}>
                <View style={{alignSelf: "center", width: "80%"}}>
                    <Text style={{fontSize: 12, fontWeight: "bold"}}>
                        General
                    </Text>
                    <Button style={{top: 10}} title="logout" onPress={() => {
                        logout()
                    }}/>
                </View>
            </View>
        </RequireJwt>
    );
}


function Setting(props) {
    return (
        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <Text style={{alignSelf: "center", fontSize: 14}}>
                {props.text}
            </Text>
            <Switch
                trackColor={{false: "#CEE3F8", true: "#0079d3"}}
                value={props.value}
                onValueChange={props.onValueChange}
            />
        </View>
    );
}

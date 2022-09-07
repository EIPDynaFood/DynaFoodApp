import React, { useState, useEffect } from "react";
import { StatusBar, TextInput, Switch, View, ScrollView, Text, Button, StyleSheet, Dimensions, Image, TouchableOpacity, Platform, Linking } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Divider } from "react-native-elements";
import useJwt from "../../Jwt"
import {RequireJwt} from "../components/RequireJwt";
import axios from "axios";
import { styles } from "../styles/Style";
import translations from "../../translations/screens/Settings.json";

export default function Settings({navigation, route}) {
    var axios = require('axios');
    const {logout} = useJwt()
    let {jwt} = useJwt()
    let [lactose, setLactose] = useState(false);
    let [nuts, setNuts] = useState(false);
    let [gluten, setGluten] = useState(false);
    let [peanut, setPeanut] = useState(false);
    let [vegetarian, setVegetarian] = useState(false);
    let [vegan, setVegan] = useState(false);
    let [color, setColor] = useState('#376D55');
    let [bgcolor, setBgcolor] = useState('#E2E6DB');
    let [textcolor, setTextcolor] = useState('#00000');
    let [pagecolor, setPagecolor] = useState("#FFFFFF");
    let [headercolor, setHeadercolor] = useState("rgba(0,0,0,0.6)");
    const isFocused = useIsFocused();
    const translations = require("../../translations/screens/Settings.json")

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
                    if (restriction["restrictionname"] === "vegetarian")
                        setVegetarian(true)
                    if (restriction["restrictionname"] === "vegan")
                        setVegan(true)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [isFocused]);

    function handleLactose() {
        if (!lactose) {
            alert(translations["LactoseMessage"])
            var qs = require('qs');
            var data = qs.stringify({
                'restrictionName': `lactose`,
                'alertActivation': true,
            });
            var config = {
                method: 'post',
                url: 'https://dynafood-server.herokuapp.com/settings',
                data : data
            };
            axios(config).then((res) => {
                //alert("You will know receive notification if we find a scanner ingredient with such option")
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)
                }
            })
        } else {
            alert(translations["AllergenDeleted"])
            var qs = require('qs');
            var data = qs.stringify({
                'restrictionName': `lactose`,
                'alertActivation': true,
            });
            var config = {
                method: 'patch',
                url: 'https://dynafood-server.herokuapp.com/settings',
                data : data
            };
            axios(config).then((res) => {
                //alert("Allergen successfuly deleted")
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    //alert(error.response.data.Error.details[0].message)
                }
            })
        }
        setLactose(!lactose)
    }

    function handleNuts() {
        if (!nuts) {
            alert(translations["NutsMessage"])
            var qs = require('qs');
            var data = qs.stringify({
                'restrictionName': `nuts`,
                'alertActivation': true,
            });
            var config = {
                method: 'post',
                url: 'https://dynafood-server.herokuapp.com/settings',
                data : data
            };
            axios(config).then((res) => {
                //alert("You will know receive notification if we find a scanner ingredient with such option")
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)
                }
            })
        } else {
            alert(translations["AllergenDeleted"])
            var qs = require('qs');
            var data = qs.stringify({
                'restrictionName': `nuts`,
                'alertActivation': true,
            });
            var config = {
                method: 'patch',
                url: 'https://dynafood-server.herokuapp.com/settings',
                data : data
            };
            axios(config).then((res) => {
                //alert("Allergen successfuly deleted")
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    //alert(error.response.data.Error.details[0].message)
                }
            })
        }
        setNuts(!nuts)
    }

    function handleGluten() {
        if (!gluten) {
            alert(translations["GlutenMessage"])
            var qs = require('qs');
            var data = qs.stringify({
                'restrictionName': `gluten`,
                'alertActivation': true,
            });
            var config = {
                method: 'post',
                url: 'https://dynafood-server.herokuapp.com/settings',
                data : data
            };
            axios(config).then((res) => {
                //alert("You will know receive notification if we find a scanner ingredient with such option")
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)
                }
            })
        } else {
            alert(translations["AllergenDeleted"])
            var qs = require('qs');
            var data = qs.stringify({
                'restrictionName': `gluten`,
                'alertActivation': true,
            });
            var config = {
                method: 'patch',
                url: 'https://dynafood-server.herokuapp.com/settings',
                data : data
            };
            axios(config).then((res) => {
                //alert("Allergen successfuly deleted")
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    //alert(error.response.data.Error.details[0].message)
                }
            })
        }
        setGluten(!gluten)
    }

    function handlePeanut() {
        if (!peanut) {
            alert(translations["PeanutsMessage"])
            var qs = require('qs');
            var data = qs.stringify({
                'restrictionName': `peanut`,
                'alertActivation': true,
            });
            var config = {
                method: 'post',
                url: 'https://dynafood-server.herokuapp.com/settings',
                data : data
            };
            axios(config).then((res) => {
                //alert("You will know receive notification if we find a scanner ingredient with such option")
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)
                }
            })
        } else {
            alert(translations["AllergenDeleted"])
            var qs = require('qs');
            var data = qs.stringify({
                'restrictionName': `peanut`,
                'alertActivation': true,
            });
            var config = {
                method: 'patch',
                url: 'https://dynafood-server.herokuapp.com/settings',
                data : data
            };
            axios(config).then((res) => {
                //alert("Allergen successfuly deleted")
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    //alert(error.response.data.Error.details[0].message)
                }
            })
        }
        setPeanut(!peanut)
    }

    function handleVegetarian() {
        if (!nuts) {
            alert(translations["VegetarianMessage"])
            var qs = require('qs');
            var data = qs.stringify({
                'restrictionName': `vegetarian`,
                'alertActivation': true,
            });
            var config = {
                method: 'post',
                url: 'https://dynafood-server.herokuapp.com/settings',
                data : data
            };
            axios(config).then((res) => {
                //alert("You will know receive notification if we find a scanner ingredient with such option")
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)
                }
            })
        } else {
            alert(translations["DietDeleted"])
            var qs = require('qs');
            var data = qs.stringify({
                'restrictionName': `vegetarian`,
                'alertActivation': true,
            });
            var config = {
                method: 'patch',
                url: 'https://dynafood-server.herokuapp.com/settings',
                data : data
            };
            axios(config).then((res) => {
                //alert("Allergen successfuly deleted")
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    //alert(error.response.data.Error.details[0].message)
                }
            })
        }
        setVegetarian(!vegetarian)
    }

    function handleVegan() {
        if (!vegan) {
            alert(translations["VeganMessage"])
            var qs = require('qs');
            var data = qs.stringify({
                'restrictionName': `vegan`,
                'alertActivation': true,
            });
            var config = {
                method: 'post',
                url: 'https://dynafood-server.herokuapp.com/settings',
                data : data
            };
            axios(config).then((res) => {
                //alert("You will know receive notification if we find a scanner ingredient with such option")
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)
                }
            })
        } else {
            alert(translations["DietDeleted"])
            var qs = require('qs');
            var data = qs.stringify({
                'restrictionName': `vegan`,
                'alertActivation': true,
            });
            var config = {
                method: 'patch',
                url: 'https://dynafood-server.herokuapp.com/settings',
                data : data
            };
            axios(config).then((res) => {
                //alert("Allergen successfuly deleted")
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    //alert(error.response.data.Error.details[0].message)
                }
            })
        }
        setVegan(!vegan)
    }

    function Linear(props) {
        return (
            <View style={{paddingVertical: 10, paddingHorizontal: 90, flexDirection: "row", justifyContent: "flex-end"}}>
                <Text style={{color: textcolor, alignSelf: "center", fontSize: 14, paddingRight: 20}}>
                    {props.text}
                </Text>
                <Switch
                    trackColor={{false: "#CEE3F8", true: color}}
                    value={props.value}
                    onValueChange={props.onValueChange}
                />
            </View>
        );
      }

    function logoutUser() {
        localStorage.setItem('Swiper', true);
        logout()
    }

    function handleTheme(color, background, textcolor, headercolor, pagecolor) {
        setColor(color);
        setBgcolor(background);
        setTextcolor(textcolor);
        setHeadercolor(headercolor);
        setPagecolor(pagecolor);
    }

    return (
        <RequireJwt>
            <ScrollView style={[styles.wrapperStyle, {backgroundColor: bgcolor}]}>
                <View style={[styles.mainContainerStyle, {backgroundColor: pagecolor}]}>
                    <View style={{marginLeft: 15, marginTop: 10, marginBottom: 10}}>

                        <Text style={[styles.tableHeadTextStyle, {color: headercolor}]}>{translations["Allergies"]}</Text>
                        <Linear text={translations["Lactose"]} value={lactose} onValueChange={() => handleLactose()}/>
                        <Divider style={{ paddingTop: 2, paddingBottom: 2}}/>
                        <Linear text={translations['Nuts']} value={nuts} onValueChange={() => handleNuts()}/>
                        <Divider style={{ paddingTop: 2, paddingBottom: 2}}/>
                        <Linear text={translations['Gluten']} value={gluten} onValueChange={() => handleGluten()}/>
                        <Divider style={{ paddingTop: 2, paddingBottom: 2}}/>
                        <Linear text={translations['Peanut']} value={peanut} onValueChange={() => handlePeanut()}/>
                        <Divider style={{ paddingTop: 2, paddingBottom: 2}}/>

                        <Text style={[styles.tableHeadTextStyle, {color: headercolor}]}>{translations["Diets"]}</Text>
                        <Linear text={translations['Vegetarian']} value={vegetarian} onValueChange={() => handleVegetarian()}/>
                        <Divider style={{ paddingTop: 2, paddingBottom: 2}}/>
                        <Linear text={translations['Vegan']} value={vegan} onValueChange={() => handleVegan()}/>
                        <Divider style={{ paddingTop: 2, paddingBottom: 2}}/>

                        <Text style={[styles.tableHeadTextStyle, {color: headercolor}]}>{translations["Theme"]}</Text>
                        <View style={[styles.button, {backgroundColor: pagecolor}]}>
                            <TouchableOpacity
                                onPress={() => handleTheme('#376D55', '#E2E6DB', '#000', "rgba(0,0,0,0.6)", "#FFFFFF")}
                                style={[styles.signIn, {borderColor: '#376D55', borderWidth: 1,
                                    marginTop: 5, marginBottom: 9, backgroundColor: '#ffff'}]}
                            >
                                <Text style={[styles.textSign, { color: '#376D55'}]}>{translations["LightMode"]}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleTheme("#FFFFFF",'#376D55',"#FFFFFF","#FFFFFF",'#376D55')}
                                style={[styles.signIn, {borderColor: '#ffff', borderWidth: 1,
                                    marginTop: 5, marginBottom: 20, backgroundColor: '#376D55'}]}
                            >
                                <Text style={[styles.textSign, { color: '#ffff'}]}>{translations["DarkMode"]}</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={[styles.tableHeadTextStyle, {color: headercolor}]}>{translations["Account"]}</Text>
                        <View style={[styles.button, {backgroundColor: pagecolor}]}>
                            <TouchableOpacity
                                onPress={() => logoutUser()}
                                style={[styles.signIn, {borderColor: color, borderWidth: 1,
                                    marginTop: 5, marginBottom: 20}]}
                            >
                                <Text style={[styles.textSign, { color: color}]}>{translations["Logout"]}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </RequireJwt>
    );
}
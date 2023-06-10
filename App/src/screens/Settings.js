import React, { useState, useEffect } from "react";
import {
    Linking,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Divider } from "react-native-elements";
import useJwt from "../../Jwt"
import {RequireJwt} from "../components/RequireJwt";
import { styles } from "../styles/Style";
import useLang from "../../Language";
import LanguageDropdown from "../components/LanguageDropdown";
import ThreeStateSlider from "../components/ThreeStateSlider";
import AllergenSearchBar from "../components/AllergenSearchBar";

export default function Settings({navigation}) {
    const {logout} = useJwt()
    let [color, setColor] = useState('#376D55');
    let [bgcolor, setBgcolor] = useState('#E2E6DB');
    let [textcolor, setTextcolor] = useState('#000000');
    let [pagecolor, setPagecolor] = useState("#FFFFFF");
    let [headercolor, setHeadercolor] = useState("rgba(0,0,0,0.6)");
    const isFocused = useIsFocused();
    const translations = require("../../translations/screens/Settings.json")
    const {lang} = useLang()

    function logoutUser() {
        localStorage.setItem('Swiper', true);
        logout()
    }

    const handleBetaLink = () => {
        Linking.openURL("https://forms.gle/pbeV5spNzDMTKb3v7");
    };

    function handleTheme(color, background, textcolor, headercolor, pagecolor) {
        setColor(color);
        setBgcolor(background);
        setTextcolor(textcolor);
        setHeadercolor(headercolor);
        setPagecolor(pagecolor);
    }

    return (
        <RequireJwt>
            <ScrollView style={[styles.wrapperStyle, {backgroundColor: bgcolor}]} nestedScrollEnabled = {true}>
                <View style={[styles.mainContainerStyle, {backgroundColor: pagecolor}]}>
                    <View style={{marginLeft: 15, marginTop: 10, marginBottom: 10}}>
                        <Text style={[styles.tableHeadTextStyle, {color: headercolor}]}>{translations["Language"][lang]}</Text>
                        <View style={{alignItems: "center"}}>
                            <LanguageDropdown/>
                        </View>
                        <Divider style={{ paddingTop: 15, paddingBottom: 2}}/>
                        <Text style={[styles.tableHeadTextStyle, {color: headercolor}]}>{translations["Allergies"][lang]}</Text>
                        <AllergenSearchBar/>
                        <Text style={[styles.tableHeadTextStyle, {color: headercolor}]}>{translations["Vegetarian"][lang]}</Text>
                        <ThreeStateSlider name={"vegetarian"}/>
                        <Text style={[styles.tableHeadTextStyle, {color: headercolor}]}>{translations["Vegan"][lang]}</Text>
                        <ThreeStateSlider name={"vegan"}/>
                        <Text style={[styles.tableHeadTextStyle, {color: headercolor}]}>{translations["Theme"][lang]}</Text>
                        <View style={[styles.button, {backgroundColor: pagecolor}]}>
                            <TouchableOpacity
                                onPress={() => handleTheme('#376D55', '#E2E6DB', '#000', "rgba(0,0,0,0.6)", "#FFFFFF")}
                                style={[styles.signIn, {borderColor: '#376D55', borderWidth: 1,
                                    marginTop: 5, marginBottom: 9, backgroundColor: '#ffff'}]}
                            >
                                <Text style={[styles.textSign, { color: '#376D55'}]}>{translations["LightMode"][lang]}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleTheme("#FFFFFF",'#376D55',"#FFFFFF","#FFFFFF",'#376D55')}
                                style={[styles.signIn, {borderColor: '#ffff', borderWidth: 1,
                                    marginTop: 5, marginBottom: 20, backgroundColor: '#376D55'}]}
                            >
                                <Text style={[styles.textSign, { color: '#ffff'}]}>{translations["DarkMode"][lang]}</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={[styles.tableHeadTextStyle, {color: headercolor}]}>Feedback</Text>
                        <View style={[styles.button, {backgroundColor: pagecolor}]}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Feedback")}
                                style={[styles.signIn, {borderColor: '#376D55', borderWidth: 1,
                                    marginTop: 5, marginBottom: 9, backgroundColor: '#ffff'}]}
                            >
                                <Text style={[styles.textSign, { color: '#376D55'}]}>send feedback</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={[styles.tableHeadTextStyle, {color: headercolor}]}>{translations["Account"][lang]}</Text>
                        <View style={[styles.button, {backgroundColor: pagecolor}]}>
                            <TouchableOpacity
                                onPress={() => logoutUser()}
                                style={[styles.signIn, {borderColor: color, borderWidth: 1,
                                    marginTop: 5, marginBottom: 20}]}
                            >
                                <Text style={[styles.textSign, { color: color}]}>{translations["Logout"][lang]}</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.tableHeadTextStyle, {color: headercolor}]}>Missing Product</Text>
                        <View style={[styles.button, {backgroundColor: pagecolor}]}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("MissingProduct")}
                                style={[styles.signIn, {borderColor: '#376D55', borderWidth: 1,
                                    marginTop: 5, marginBottom: 9, backgroundColor: '#ffff'}]}
                            >
                                <Text style={[styles.textSign, { color: '#376D55'}]}>Upload Information</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.tableHeadTextStyle, {color: headercolor}]}>Beta Feedback</Text>
                        <View style={[styles.button, {backgroundColor: pagecolor}]}>
                            <TouchableOpacity
                                onPress={handleBetaLink}
                                style={[styles.signIn, {borderColor: '#376D55', borderWidth: 1,
                                    marginTop: 5, marginBottom: 9, backgroundColor: '#ffff'}]}
                            >
                                <Text style={[styles.textSign, { color: '#376D55'}]}>Beta Feedback Form</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </RequireJwt>
    );
}
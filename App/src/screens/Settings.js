import React from "react";
import {
    Linking,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
} from 'react-native';
import { Divider } from "react-native-elements";
import { styles } from "../styles/Style";
import useLang from "../../Language";
import LanguageDropdown from "../components/LanguageDropdown";
import ThreeStateSlider from "../components/ThreeStateSlider";
import AllergenSearchBar from "../components/AllergenSearchBar";
import * as SecureStore from 'expo-secure-store';

export default function Settings({navigation}) {
    const translations = require("../../translations/screens/Settings.json")
    const {lang} = useLang()

    function logoutUser() {
        localStorage.setItem('Swiper', true);
        SecureStore.deleteItemAsync('jwt')
        SecureStore.deleteItemAsync('refreshToken')
        navigation.navigate("Login")
    }

    const handleBetaLink = () => {
        Linking.openURL("https://forms.gle/pbeV5spNzDMTKb3v7");
    };

    return (
            <ScrollView style={styles.wrapperStyle} nestedScrollEnabled = {true}>
                <View style={[styles.mainContainerStyle, {backgroundColor: '#FFFFFF'}]}>
                    <View style={{marginLeft: 15, marginTop: 10, marginBottom: 10}}>
                        <Text style={styles.tableHeadTextStyle}>{translations["Language"][lang]}</Text>
                        <View style={{alignItems: "center"}}>
                            <LanguageDropdown/>
                        </View>
                        <Divider style={{ paddingTop: 15, paddingBottom: 2}}/>
                        <Text style={styles.tableHeadTextStyle}>{translations["Allergies"][lang]}</Text>
                        <AllergenSearchBar/>
                        <Text style={styles.tableHeadTextStyle}>{translations["Vegetarian"][lang]}</Text>
                        <ThreeStateSlider name={"vegetarian"}/>
                        <Text style={styles.tableHeadTextStyle}>{translations["Vegan"][lang]}</Text>
                        <ThreeStateSlider name={"vegan"}/>
                        <Text style={styles.tableHeadTextStyle}>Feedback</Text>
                        <View style={[styles.button, {backgroundColor: '#FFFFFF'}]}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Feedback")}
                                style={[styles.signIn, {borderColor: '#376D55', borderWidth: 1,
                                    marginTop: 5, marginBottom: 9, backgroundColor: '#ffffff'}]}
                            >
                                <Text style={[styles.textSign, { color: '#376D55'}]}>send feedback</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.tableHeadTextStyle}>{translations["Account"][lang]}</Text>
                        <View style={[styles.button, {backgroundColor: '#FFFFFF'}]}>
                            <TouchableOpacity
                                onPress={() => logoutUser()}
                                style={[styles.signIn, {borderColor: '#376D55', borderWidth: 1,
                                    marginTop: 5, marginBottom: 9, backgroundColor: '#ffff'}]}
                            >
                                <Text style={[styles.textSign, {color: '#376D55'}]}>{translations["Logout"][lang]}</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.tableHeadTextStyle}>Missing Product</Text>
                        <View style={[styles.button, {backgroundColor: '#FFFFFF'}]}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("MissingProduct")}
                                style={[styles.signIn, {borderColor: '#376D55', borderWidth: 1,
                                    marginTop: 5, marginBottom: 9, backgroundColor: '#ffff'}]}
                            >
                                <Text style={[styles.textSign, { color: '#376D55'}]}>Upload Information</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.tableHeadTextStyle}>Beta Feedback</Text>
                        <View style={[styles.button, {backgroundColor: '#FFFFFF'}]}>
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
    );
}
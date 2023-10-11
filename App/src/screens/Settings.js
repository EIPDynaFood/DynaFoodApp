import {React, useState} from "react";
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
import { endpoint } from '../../config';
import LanguageDropdown from "../components/LanguageDropdown";
import ThreeStateSlider from "../components/ThreeStateSlider";
import AllergenSearchBar from "../components/AllergenSearchBar";
import DeleteAccountAlert from "../components/DeleteAccountAlert";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import APIRoute from "../../API";

export default function Settings({navigation}) {
    const translations = require("../../translations/screens/Settings.json")
    const {lang} = useLang()

    function logoutUser() {
        localStorage.setItem('Swiper', true);
        SecureStore.deleteItemAsync('jwt').then(() => {
            SecureStore.deleteItemAsync('refreshToken').then(() => {
                navigation.navigate("Login")
            })
        })
    }

    const [showAlert, setShowAlert] = useState(false);

    const handleDeleteAccount = () => {
        var email = localStorage.getItem('email');
        var config = {
            method: 'delete',
            url: endpoint + 'user?' + `${email}`,
        };
        APIRoute(() => axios(config)
        .then(function (response) {
            if (response.status === 200) {
                setShowAlert(false);
                SecureStore.deleteItemAsync('jwt').then(() => {
                    SecureStore.deleteItemAsync('refreshToken')});
                navigation.navigate("Login");
            } else {
                console.log(response.status)
            }
        }).catch((error) => {
            if (error.response.status === 401)
                    throw(error);
            alert(translations["ErrorDel"][lang] + '\n' + error.message);
        })).catch();
      };

    const handleBetaLink = () => {
        Linking.openURL("https://forms.gle/pbeV5spNzDMTKb3v7");
    };

    return (
            <ScrollView style={styles.wrapperStyle} nestedScrollEnabled = {true}>
                <DeleteAccountAlert visible={showAlert} onCancel={() => {setShowAlert(false)}} onConfirm={handleDeleteAccount}/>
                <View style={[styles.mainContainerStyle, {backgroundColor: '#FFFFFF'}]}>
                    <View style={{marginLeft: 15, marginTop: 10, marginBottom: 50}}>
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
                            <TouchableOpacity onPress={() => {setShowAlert(true)}} style={[styles.signIn, {borderColor: '#376D55', borderWidth: 1,
                                    marginTop: 5, marginBottom: 20}]}>
                                        <Text style={[styles.textSign, { color: '#376D55'}]}>{translations["Delete"][lang]}</Text>
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
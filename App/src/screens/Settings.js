import {React, useState} from "react";
import {
    Linking,
    View,
    ScrollView,
    Text,
} from 'react-native';
import {Button, Divider} from "react-native-elements";
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
                    <View style={{marginTop: 15, marginBottom: 15}}>
                        <View style={{flexDirection: "row", alignItems:"center", justifyContent: "center"}}>
                            <Text style={[styles.tableHeadTextStyle, {paddingRight: 15}]}>{translations["Language"][lang]}</Text>
                            <LanguageDropdown/>
                        </View>
                        <Divider style={{ paddingTop: 15, paddingBottom: 2}}/>
                        <Text style={[styles.tableHeadTextStyle, {paddingBottom: 0}]}>{translations["Allergies"][lang]}</Text>
                        <AllergenSearchBar/>
                        <Divider style={{ paddingTop: 15, paddingBottom: 2}}/>
                        <Text style={styles.tableHeadTextStyle}>{translations["Vegetarian"][lang]}</Text>
                        <ThreeStateSlider name={"vegetarian"}/>
                        <Text style={styles.tableHeadTextStyle}>{translations["Vegan"][lang]}</Text>
                        <ThreeStateSlider name={"vegan"}/>
                        <Divider style={{ paddingTop: 15, paddingBottom: 2}}/>
                        <Text style={styles.tableHeadTextStyle}>{translations["General"][lang]}</Text>
                        <Button
                            title={translations["Feedback"][lang]}
                            type="outline"
                            containerStyle= {{
                                margin:15
                            }}
                            buttonStyle={[styles.secondaryButtonStyle, {width: "95%", alignSelf: "center"}]}
                            titleStyle={{color:"#376D55", flex:1}}
                            onPress={() => {
                                navigation.navigate("Feedback")
                            }}
                        />

                        <Button
                            title={translations["Beta"][lang]}
                            type="outline"
                            containerStyle= {{
                                margin:15
                            }}
                            buttonStyle={[styles.secondaryButtonStyle, {width: "95%", alignSelf: "center"}]}
                            titleStyle={{color:"#376D55", flex:1}}
                            onPress={() => {
                                handleBetaLink()
                            }}
                        />

                        <Button
                            title={translations["Missing Product"][lang]}
                            type="outline"
                            containerStyle= {{
                                margin:15
                            }}
                            buttonStyle={[styles.secondaryButtonStyle, {width: "95%", alignSelf: "center"}]}
                            titleStyle={{color:"#376D55", flex:1}}
                            onPress={() => {
                                navigation.navigate("MissingProduct")
                            }}
                        />

                        <Divider style={{ paddingTop: 15, paddingBottom: 2}}/>
                        <Text style={styles.tableHeadTextStyle}>{translations["Account"][lang]}</Text>
                        <Button
                            title={translations["Logout"][lang]}
                            type="outline"
                            containerStyle= {{
                                margin:15
                            }}
                            buttonStyle={[styles.secondaryButtonStyle, {width: "95%", alignSelf: "center"}]}
                            titleStyle={{color:"#376D55", flex:1}}
                            onPress={() => {
                                logoutUser()
                            }}
                        />
                        <Button
                            title={translations["Delete"][lang]}
                            type="outline"
                            containerStyle= {{
                                margin:15,
                                marginBottom:30
                            }}
                            buttonStyle={[styles.secondaryButtonStyle, {width: "95%", alignSelf: "center", borderColor: "#DB3A34"}]}
                            titleStyle={{color:"#DB3A34", flex:1}}
                            onPress={() => {
                                setShowAlert(true);
                            }}
                        />

                    </View>
                </View>
            </ScrollView>
    );
}
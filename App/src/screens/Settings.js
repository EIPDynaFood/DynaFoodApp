import React from "react";
import {
    Linking,
    View,
    ScrollView,
    Text,
} from 'react-native';
import {Button, Divider} from "react-native-elements";
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
        SecureStore.deleteItemAsync('jwt').then(() => {
            SecureStore.deleteItemAsync('refreshToken').then(() => {
                navigation.navigate("Login")
            })
        })
    }

    const handleBetaLink = () => {
        Linking.openURL("https://forms.gle/pbeV5spNzDMTKb3v7");
    };

    return (
            <ScrollView style={styles.wrapperStyle} nestedScrollEnabled = {true}>
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
                                navigation.navigate("Missing")
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
                                console.log("Delete")
                            }}
                        />

                    </View>
                </View>
            </ScrollView>
    );
}
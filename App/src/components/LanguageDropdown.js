import useLang from "../../Language"
import React, {useEffect, useState} from "react";
import DropDownPicker from 'react-native-dropdown-picker'
import {Image, SafeAreaView} from "react-native";
import german from "../../assets/flags/germany.png";
import english from "../../assets/flags/united-kingdom.png";
import french from "../../assets/flags/france.png";

export default function LanguageDropdown() {
    const {lang, translate} = useLang()

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(lang)
    const [items, setItems] = useState([
        {
            label: "",
            value: "de",
            icon: () => (<Image source={german} style={{width: 20, height: 20}}/>)
        },
        {
            label: "",
            value: "en",
            icon: () => (<Image source={english} style={{width: 20, height: 20}}/>)
        },
        {
            label: "",
            value: "fr",
            icon: () => (<Image source={french} style={{width: 20, height: 20}}/>)
        },
        {
            label: "",
            value: "pt",
            icon: () => (<Image source={portuguese} style={{width: 20, height: 20}}/>)
        },
        {
            label: "",
            value: "it",
            icon: () => (<Image source={italian} style={{width: 20, height: 20}}/>)
        },
        {
            label: "",
            value: "es",
            icon: () => (<Image source={spanish} style={{width: 20, height: 20}}/>)
        }
    ])
    const german = require("../../assets/flags/germany.png")
    const english = require("../../assets/flags/united-kingdom.png")
    const french = require("../../assets/flags/france.png");
    const italian = require("../../assets/flags/italian.png")
    const spanish = require("../../assets/flags/spanish.png")
    const portuguese = require("../../assets/flags/portuguese.png");

    useEffect(
        () => {
            localStorage.setItem("Language", value.toString());
            translate(value)
        }, [value]
    )

    return (<DropDownPicker
            items={items} setItems={setItems}
         open={open} value={value}
        setOpen={setOpen} setValue={setValue}
        placeholder={""} style={{borderColor: "#2E4D44", borderWidth: 1}}
            containerStyle={{width: 75}}
         dropDownContainerStyle={{borderColor: "#2E4D44", borderWidth: 1}}
            nestedScrollEnabled = {true} listMode="SCROLLVIEW"/>
    )
}
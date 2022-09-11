import useLang from "../../Language"
import {Dropdown} from "rsuite";
import React from "react";

export default function LanguageDropdown() {
    const {lang} = useLang()

    const german = require("../../assets/flags/germany.svg")
    const english = require("../../assets/flags/united.svg")
    const french = require("../../assets/flags/france.svg");

    let selected
    let choice1
    let choice2
    switch (lang) {
        case "en":
            selected = english;
            choice1 = german;
            choice2 = french;
            break;
        case "de":
            selected = german;
            choice1 = english;
            choice2 = french;
            break;
        case "fr":
            selected = french;
            choice1 = english;
            choice1 = german;
            break;
        default:
            selected = english;
            choice1 = german;
            choice2 = french;
    }

    const translate = (option) => {

    }

    return (
        <Dropdown title="Language" icon={selected}>
            <Dropdown.Item icon={choice1}></Dropdown.Item>
            <Dropdown.Item icon={choice2}></Dropdown.Item>
        </Dropdown>
    )
}
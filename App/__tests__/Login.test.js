import React from "react";
import {useNavigation} from "@react-navigation/native";
import {shallow} from "enzyme";
import Login from "../../src/screens/Login"
import {JwtProvider} from "../../Jwt"
import {LangProvider} from "../../Language";
import Provider from "./Wrapper";
import ProductItem from "../../src/components/ProductItem";
import LanguageDropdown from "../../src/components/LanguageDropdown";
import {OAuthButton} from "../../src/components/OAuthButton";
import {Themed} from "react-navigation";
import {SocialIcon} from "react-native-elements";
jest.useFakeTimers()
jest.mock('@react-navigation/native');
jest.mock("react-native-gesture-handler");
jest.mock("react-native-elements");

it("fill in input", () => {
    const inst = shallow(<JwtProvider><LangProvider><Login/></LangProvider></JwtProvider>).dive();
    const mail = inst.find("Email").first()
    expect(mail.exists()).toBe(true);
});

it("click on login", () => {
    const navigation = useNavigation();
    const inst = shallow(<JwtProvider><LangProvider><Login/></LangProvider></JwtProvider>);
    inst.find("Login").simulate("press");
    expect(navigation.navigate).toHaveBeenCalledWith("History");
});

it("click on register", () => {
    const navigation = useNavigation();
    const inst = shallow(<JwtProvider><LangProvider><Login/></LangProvider></JwtProvider>);
    inst.find("Register").simulate("press");
    expect(navigation.navigate).toHaveBeenCalledWith("register");
});

it("OAuth Facebook", () => {
    console.log = jest.fn();
    const inst = shallow(<OAuthButton service={"Facebook"}/>)
    inst.find(SocialIcon).simulate("press");
    expect(console.log).toHaveBeenCalledWith("Facebook")
})

it("OAuth Google", () => {
    console.log = jest.fn();
    const inst = shallow(<OAuthButton service={"Google"}/>)
    inst.find(SocialIcon).simulate("press");
    expect(console.log).toHaveBeenCalledWith("Google")
})

it("check language dropdown", () => {
    const inst = shallow(<JwtProvider><LangProvider><Login/></LangProvider></JwtProvider>);
    const dropdown = inst.find(LanguageDropdown)
    expect(dropdown.exists()).toBe(true);
});

it("switch language", () => {
    const inst = shallow(<JwtProvider><LangProvider><Login/></LangProvider></JwtProvider>);
    const dropdown = inst.find(LanguageDropdown)
    dropdown.simulate("press")
    expect(dropdown.open).toBe(true);
});

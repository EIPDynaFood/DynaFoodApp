import React from "react";
import {useNavigation} from "@react-navigation/native";
import {shallow} from "enzyme";
import Login from "../src/screens/Login"
import JwtProvider from "../Jwt"
import TrendBar from "../src/components/Trendbar";
import {OAuthButton} from "../src/components/OAuthButton";
import {Themed} from "react-navigation";
import {SocialIcon} from "react-native-elements";
jest.useFakeTimers()
jest.mock('@react-navigation/native');
jest.mock("react-native-gesture-handler");
jest.mock("react-native-elements");

it("fill in input", () => {
    const inst = shallow(<JwtProvider><Login/></JwtProvider>);
    const mail = inst.find("email").first()
    expect(mail.exists()).toBe(true);
});

it("click on login", () => {
    const navigation = useNavigation();
    const inst = shallow(<JwtProvider><Login/></JwtProvider>);
    inst.find("Login").simulate("press");
    expect(navigation.navigate).toHaveBeenCalledWith("History");
});

it("click on register", () => {
    const navigation = useNavigation();
    const inst = shallow(<JwtProvider><Login/></JwtProvider>);
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
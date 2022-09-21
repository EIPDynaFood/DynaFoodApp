import React from "react";
import {useNavigation} from "@react-navigation/native";
import {shallow} from "enzyme";
import Login from "../src/screens/Login"
import JwtProvider from "../Jwt"
jest.useFakeTimers()
jest.mock('@react-navigation/native');
jest.mock("react-native-gesture-handler");
jest.mock("react-native-elements");

it("fill in input", () => {
    const inst = shallow(<JwtProvider><Login/></JwtProvider>);
    inst.find("Login as guest").simulate("click")
    const mail = inst.find("email")
    expect(mail.exists).toBe(true)
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
import React from "react";
import {useNavigation} from "@react-navigation/native";
import {shallow} from "enzyme";
import Login from "../src/screens/Login"
import JwtProvider from "../Jwt"
import TrendBar from "../src/components/Trendbar";
import { Navigate } from "react-router-dom";
import Register from "../src/screens/Register";
jest.useFakeTimers()
jest.mock('@react-navigation/native');
jest.mock("react-native-gesture-handler");
jest.mock("react-native-elements");

it("navigat to Login", () => {
    const navigation = useNavigation();
    const inst = shallow(<JwtProvider><Register/></JwtProvider>)
    inst.find("Login").simulate('press');
    expect(navigation.navigate).toHaveBeenCalledWith("Login")
});

it("fill the data", () => {
    const inst = shallow()
})
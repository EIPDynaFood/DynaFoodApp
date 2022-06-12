import React from "react";
import {useNavigation} from "@react-navigation/native";
import {shallow} from "enzyme";
import Swiper from '../src/screens/Swiper'
import TrendBar from "../src/components/Trendbar";
jest.useFakeTimers()
jest.mock('@react-navigation/native');
jest.mock("react-native-gesture-handler");
jest.mock("react-native-elements")

it("goes to login", () => {
    const navigation = useNavigation();
    const inst = shallow(<Swiper/>);
    inst.find("Skip").simulate("press");
    expect(navigation.navigate).toHaveBeenCalledWith("Login");
});

it("goes to next", () => {
    const inst = shallow(<Swiper/>);
    inst.find("next").simulate("press");
    expect();
});
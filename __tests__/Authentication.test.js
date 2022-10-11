import React from "react";
import {useNavigation} from "@react-navigation/native";
import {shallow} from "enzyme";
import {TextInput} from "react-native";
import {Button} from "react-native-elements";
import VerifyCode from "../src/screens/Authentication";

jest.useFakeTimers()
const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
        ...actualNav,
        useNavigation: () => ({
            navigate: mockedNavigate,
        }),
    };
});
jest.mock("react-native-gesture-handler");
jest.mock("react-native-elements");
jest.setTimeout(30000);

it("success", () => {
    const navigation = useNavigation();
    const inst = shallow(<VerifyCode/>);
    inst.find(TextInput).simulate("change", {target: {value: 'niklas.scheffler@epitech.eu'}})
    inst.find(Button).simulate("press")
    expect(mockedNavigate).toHaveBeenCalledTimes(1)
});

it("no code", () => {
    alert = jest.fn()
    const inst = shallow(<VerifyCode/>);
    console.log(inst.debug())
    inst.find(Button).simulate("press")
    setTimeout(() => {
        expect(alert).toHaveBeenCalledTimes(1)
    }, 2000)
    jest.runAllTimers
});

it("wrong code", () => {
    global.alert = jest.fn()
    const inst = shallow(<VerifyCode/>);
    inst.find(TextInput).simulate("change", {target: {value: 'marianne is cool'}})
    inst.find(Button).simulate("press")
    setTimeout(() => {
        expect(alert).toHaveBeenCalledTimes(1)
    }, 2000)
    jest.runAllTimers
});
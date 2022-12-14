import React from "react";
import {shallow} from "enzyme";
import PasswordInput from "../../src/components/PasswordInput";
jest.useFakeTimers()
jest.mock('@react-navigation/native');
jest.mock("react-native-gesture-handler");
jest.mock("react-native-elements")

it("check is false", () => {
    const inst = shallow(<PasswordInput/>)
    const isShown = inst.find("textTouchable")
    expect(isShown.exists()).toBe(false);
});

it("check if changed", () => {
    const inst = shallow(<PasswordInput/>)
    inst.find("TouchableOpacity").simulate("press")
    const isSown = inst.find("textTouchable")
    expect(isSown.exists()).toBe(true);
})
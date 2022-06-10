import React from "react";
import {useNavigation} from "@react-navigation/native";
import {FAB} from "react-native-elements";
import {mount, shallow} from "enzyme";
import Login from "./src/screens/Login";
import useJwt, {JwtProvider} from "./Jwt"

/*jest.useFakeTimers()
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
const result = mount(
    <JwtProvider>
        <Login/>
    </JwtProvider>
)


it("navigate to register", () => {
    const navigation = useNavigation();
    const inst = shallow(<JwtProvider><Login/></JwtProvider>);
    console.log(result.debug())
    result.find({ title: "Register"}).simulate("press")
    expect(mockedNavigate).toHaveBeenCalledTimes(1)
});

it("login as guest", () => {
    const navigation = useNavigation();
    const inst = shallow(<Login/>);
    inst.find(FAB).simulate("press");
    inst.find({ title: "Login"}).simulate("press");
    expect(mockedNavigate).toHaveBeenCalledTimes(1)
});*/
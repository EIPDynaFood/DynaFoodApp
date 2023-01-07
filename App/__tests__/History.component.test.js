import React from "react";
import History from "../../src/screens/History";
import {useNavigation} from "@react-navigation/native";
import {FAB} from "react-native-elements";
import {shallow} from "enzyme";
import ProductHistory from "../../src/components/ProductHistory";
import TrendBar from "../../src/components/Trendbar";
import * as router from 'react-router'
import {TouchableOpacity} from "react-native";
import ProductItem from "../../src/components/ProductItem";
import * as LangContext from "../../Language";
import LangProvider from "../../Language";


class LocalStorageMock {
    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        this.store[key] = String(value);
    }

    removeItem(key) {
        delete this.store[key];
    }
}

global.localStorage = new LocalStorageMock;

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

it("navigate to scanner", () => {
    const navigation = useNavigation();
    const inst = shallow(<LangProvider><History/></LangProvider>);
    console.log(inst.debug())
    inst.find(FAB).simulate("press")
    expect(mockedNavigate).toHaveBeenCalledTimes(1)
});

it("no item", () => {
    const navigation = useNavigation();
    const inst = shallow(<LangProvider><ProductHistory data={{"elements": []}}/></LangProvider>);
    const views = inst.find("View")
    views.at(3).simulate("press")
    expect(mockedNavigate).toHaveBeenCalledWith("Scanner")
});

it("at least one item", () => {
    const inst = shallow(<LangProvider><ProductHistory data={{"elements": [{}, {}, {}]}}/></LangProvider>);
    const item = inst.find("ProductItem").first()
    expect(item.exists()).toBe(true)
});

it("at least one item + navigation", () => {
    const navigation = useNavigation();
    const inst = shallow(<LangProvider><ProductItem/></LangProvider>);
    inst.find("TouchableOpacity").first().simulate("press")
    expect(navigation.navigate).toHaveBeenCalledWith("Product")
});

it("check TrendBar navigation", () => {
    const navigation = useNavigation();
    const inst = shallow(<LangProvider><TrendBar/></LangProvider>);
    inst.find("TouchableOpacity").first().simulate("press")
    expect(navigation.navigate).toHaveBeenCalledWith("Product")
});

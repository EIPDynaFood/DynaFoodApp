import React from "react";
import History from "../src/screens/History";
import {useNavigation} from "@react-navigation/native";
import {FAB} from "react-native-elements";
import {shallow} from "enzyme";
import ProductHistory from "../src/components/ProductHistory";
import TrendBar from "../src/components/Trendbar";
import * as router from 'react-router'
import {TouchableOpacity} from "react-native";
import ProductItem from "../src/components/ProductItem";


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
    const inst = shallow(<History/>);
    inst.find(FAB).simulate("press")
    expect(mockedNavigate).toHaveBeenCalledTimes(1)
});

it("no item", () => {
    const navigation = useNavigation();
    const inst = shallow(<ProductHistory data={{"elements": []}}/>);
    const views = inst.find("View")
    views.at(3).simulate("press")
    expect(mockedNavigate).toHaveBeenCalledWith("Scanner")
});

it("at least one item", () => {
    const inst = shallow(<ProductHistory data={{"elements": [{}, {}, {}]}}/>);
    const item = inst.find("ProductItem").first()
    expect(item.exists()).toBe(true)
});

it("at least one item + navigation", () => {
    const navigation = useNavigation();
    const inst = shallow(<ProductItem/>);
    inst.find("ForwardRef").first().simulate("press")
    expect(navigation.navigate).toHaveBeenCalledWith("Product")
});

it("check TrendBar navigation", () => {
    const navigation = useNavigation();
    const inst = shallow(<TrendBar/>);
    inst.find("ForwardRef").first().simulate("press")
    expect(navigation.navigate).toHaveBeenCalledWith("Product")
});

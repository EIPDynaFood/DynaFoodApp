import React from "react";
import History from "../src/screens/History";
import {useNavigation} from "@react-navigation/native";
import {FAB} from "react-native-elements";
import {shallow} from "enzyme";
import ProductHistory from "../src/components/ProductHistory";
jest.useFakeTimers()
jest.mock('@react-navigation/native');
jest.mock("react-native-gesture-handler");
jest.mock("react-native-elements")
it("navigate to scanner", () => {
    const navigation = useNavigation()
    const inst = shallow(<History/>);
    inst.find("FAB").simulate("click")
    expect(navigation.navigate).toHaveBeenCalledWith("Scanner")
});

it("no item", () => {
    const navigation = useNavigation()
    const inst = shallow(<ProductHistory data={{"elements": []}}/>);
    inst.find("TouchableWithoutFeedback").simulate("click")
    expect(navigation.navigate).toHaveBeenCalledWith("Scanner")
});

it("at least one item", () => {
    const navigation = useNavigation()
    const inst = shallow(<ProductHistory data={{"elements": [{}, {}, {}]}}/>);
    const item = inst.find("ProductItem").first()
    expect(item.exists()).toBe(true)
});

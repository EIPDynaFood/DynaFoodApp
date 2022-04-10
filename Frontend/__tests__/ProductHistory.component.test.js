import "react-native";
import React from "react";
import renderer from "react-test-renderer";
import ProductHistory from "../src/components/ProductHistory";
jest.useFakeTimers()
jest.mock('@react-navigation/native');

it("renders history correctly", () => {
    const tree = renderer.create(
        <ProductHistory/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});
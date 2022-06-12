import React from "react";
import {useNavigation} from "@react-navigation/native";
import {shallow} from "enzyme";
import Login from "../src/screens/Login"
import JwtProvider from "../Jwt"
import TrendBar from "../src/components/Trendbar";
jest.useFakeTimers()
jest.mock('@react-navigation/native');
jest.mock("react-native-gesture-handler");
jest.mock("react-native-elements");


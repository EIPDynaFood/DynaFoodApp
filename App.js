import React, {useState, useEffect} from 'react';
//testing test feature
import {Text, View, StyleSheet, Button, LogBox, StatusBar, StatusBarStyle} from 'react-native';
import Scanner from "./src/screens/Scanner";
import Product from "./src/screens/Product";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import 'localstorage-polyfill';
import History from "./src/screens/History";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import Settings from "./src/screens/Settings";
import SearchResult from './src/screens/SearchResult';
import MissingProduct from "./src/screens/MissingProduct";
import Swiper from './src/screens/Swiper';
import ForgotID from './src/screens/ForgotID';
import {Icon} from "react-native-elements";
import useJwt, {JwtProvider} from "./Jwt"
import useLang, {LangProvider} from "./Language";
import {RequireJwt} from "./src/components/RequireJwt"
import isReadyRef from "react-native/Libraries/Components/DrawerAndroid/DrawerLayoutAndroid";

const Stack = createNativeStackNavigator();

export function Navigation() {
  const {jwt} = useJwt();
  let swiper = localStorage.getItem('Swiper');

  return (
      jwt === null ? (
          <NavigationContainer>
            <Stack.Navigator screenOptions={{
              headerShown: false,
              headerStyle: {
                backgroundColor: '#376D55',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold'
              }
            }}>
              {swiper === null ? 
              <Stack.Screen name="Swiper" component={Swiper}/>
               : <></>}
              <Stack.Screen name="Login" component={Login}/>
              <Stack.Screen name="Register" component={Register}/>
              <Stack.Screen name="ForgotID" component={ForgotID}/>
            </Stack.Navigator>
          </NavigationContainer>) : (
          <NavigationContainer>
            <Stack.Navigator screenOptions={{
              headerStyle: {
                backgroundColor: '#376D55',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold'
              }
            }}>
              <Stack.Screen name="History" component={History}
                            options={({navigation, route}) => ({
                              headerRight: () => (
                                  <Icon
                                      onPress={() => navigation.navigate("Settings")}
                                      name="settings"
                                      color="white"
                                  />
                              )
                            })}
              />
              <Stack.Screen name="Scanner" component={Scanner}/>
              <Stack.Screen name="Product" component={Product}/>
              <Stack.Screen name="Settings" component={Settings}/>
              <Stack.Screen name="Search Result" component={SearchResult}/>
              <Stack.Screen name="MissingProduct" component={MissingProduct}/>
            </Stack.Navigator>
          </NavigationContainer>)
  )
}

export default function App() {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  // I know that this seems weird, but the maintainer of react-native-navigation suggests this fix...

  return (
      <View style={{flex: 1}}>
          <StatusBar
              animated={true}
              backgroundColor="#2E4D44"
          />
        <JwtProvider>
            <LangProvider>
                <Navigation/>
            </LangProvider>
        </JwtProvider>
      </View>
  );
}

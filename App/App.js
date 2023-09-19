import React, {useEffect, useState} from 'react';
import {View, LogBox, StatusBar} from 'react-native';
import Scanner from "./src/screens/Scanner";
import Product from "./src/screens/Product";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import 'localstorage-polyfill';
import History from "./src/screens/History";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import Settings from "./src/screens/Settings";
import MissingProduct from "./src/screens/MissingProduct";
import Feedback from "./src/screens/Feedback";
import Swiper from './src/screens/Swiper';
import {Icon} from "react-native-elements";
import useLang, {LangProvider} from "./Language";
import SendEmail from "./src/screens/SendEmail";
import VerifyCode from "./src/screens/Authentication";
import ResetPassword from "./src/screens/ResetPassword";
import ShoppingOverview from "./src/screens/ShoppingOverview";
import ShoppingListItems from "./src/screens/ShoppingListItems";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SecureStore from "expo-secure-store";
import translations from "./translations/App.json";

const Stack = createNativeStackNavigator();
export function Navigation(props) {
  let swiper = localStorage.getItem('Swiper');

    const translations = require("./translations/App.json")
    const {lang} = useLang()

  return (
      <GestureHandlerRootView style={{flex: 1}}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName={props.initialRoute} screenOptions={{
              headerStyle: {
                backgroundColor: '#376D55',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold'
              }
            }}>
                {swiper === null ?
                    <Stack.Screen options={{headerShown: false, title: translations["Welcome"][lang]}} name="Swiper" component={Swiper}/>
                    : <></>}
                <Stack.Screen options={{headerShown: false, title: translations["Login"][lang]}} name="Login" component={Login}/>
                <Stack.Screen options={{headerShown: false, title: translations["Register"][lang]}} name="Register" component={Register}/>
                <Stack.Screen options={{title: translations["Reset Password"][lang]}} name="SendEmail" component={SendEmail}/>
                <Stack.Screen options={{title: translations["Reset Password"][lang]}} name="VerifyCode" component={VerifyCode}/>
                <Stack.Screen options={{title: translations["Reset Password"][lang]}} name="ResetPassword" component={ResetPassword}/>

                <Stack.Screen name="History" component={History}
                            options={({navigation}) => ({title: "DynaFood",
                              headerRight: () => (
                                  <View style={{display:"flex", flexDirection:"row"}}>
                                      <View style={{right: 15}}>
                                          <Icon
                                          onPress={() => navigation.navigate("ShoppingOverview")}
                                          name="list"
                                          color="white"
                                        />
                                      </View>
                                      <View>
                                        <Icon
                                      onPress={() => navigation.navigate("Settings")}
                                      name="settings"
                                      color="white"
                                        />
                                      </View>
                                  </View>
                              )
                            })}
              />
              <Stack.Screen options={{title: translations["Scanner"][lang]}} name="Scanner" component={Scanner}/>
              <Stack.Screen options={{title: translations["Feedback"][lang]}} name="Feedback" component={Feedback}/>
              <Stack.Screen options={{title: translations["Product"][lang]}} name="Product" component={Product}/>
              <Stack.Screen options={{title: translations["Settings"][lang]}} name="Settings" component={Settings}/>
              <Stack.Screen options={{title: translations["Missing Product"][lang]}} name="MissingProduct" component={MissingProduct}/>
              <Stack.Screen options={{title: translations["Shopping Lists"][lang]}} name="ShoppingOverview" component={ShoppingOverview}/>
              <Stack.Screen options={{title: translations["Shopping Items"][lang]}} name="ShoppingListItems" component={ShoppingListItems}/>
            </Stack.Navigator>
          </NavigationContainer>
      </GestureHandlerRootView>)
}

export default function App() {
    LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
    ]);
  // I know that this seems weird, but the maintainer of react-native-navigation suggests this fix...

    const [initialRoute, setInitialRoute] = useState(undefined);

    useEffect(() => {
        async function getToken() {
            await SecureStore.getItemAsync("refreshToken").then((refreshToken) => {
                setInitialRoute(refreshToken)
            }).catch()
        }
        getToken().then(() => {})
    });

    if (initialRoute === undefined)
        return (<></>)
    else
        return (
          <View style={{flex: 1}}>
              <StatusBar
                  animated={true}
                  backgroundColor="#2E4D44"
              />
            <LangProvider>
                <Navigation initialRoute={initialRoute !== null ? "History" : "Login"}/>
            </LangProvider>
          </View>
        );
}
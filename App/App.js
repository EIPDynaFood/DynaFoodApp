import React from 'react';
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
import SearchResult from './src/screens/SearchResult';
import MissingProduct from "./src/screens/MissingProduct";
import Feedback from "./src/screens/Feedback";
import Swiper from './src/screens/Swiper';
import {Icon} from "react-native-elements";
import {LangProvider} from "./Language";
import SendEmail from "./src/screens/SendEmail";
import VerifyCode from "./src/screens/Authentication";
import ResetPassword from "./src/screens/ResetPassword";
import ShoppingOverview from "./src/screens/ShoppingOverview";
import ShoppingListItems from "./src/screens/ShoppingListItems";

const Stack = createNativeStackNavigator();
export function Navigation() {
  let swiper = localStorage.getItem('Swiper');

  return (
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
                {swiper === null ?
                    <Stack.Screen options={{headerShown: false}} name="Swiper" component={Swiper}/>
                    : <></>}
                <Stack.Screen options={{headerShown: false}} name="Login" component={Login}/>
                <Stack.Screen options={{headerShown: false}} name="Register" component={Register}/>
                <Stack.Screen options={{headerShown: true, title: "Reset Password"}} name="SendEmail" component={SendEmail}/>
                <Stack.Screen options={{headerShown: true, title: "Reset Password"}} name="VerifyCode" component={VerifyCode}/>
                <Stack.Screen options={{headerShown: true, title: "Reset Password"}} name="ResetPassword" component={ResetPassword}/>

                <Stack.Screen name="History" component={History}
                            options={({navigation}) => ({
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
              <Stack.Screen name="Scanner" component={Scanner}/>
              <Stack.Screen name="Feedback" component={Feedback}/>
              <Stack.Screen name="Product" component={Product}/>
              <Stack.Screen name="Settings" component={Settings}/>
              <Stack.Screen name="Search Result" component={SearchResult}/>
              <Stack.Screen name="MissingProduct" component={MissingProduct}/>
              <Stack.Screen name="ShoppingOverview" component={ShoppingOverview}/>
                <Stack.Screen name="ShoppingListItems" component={ShoppingListItems}/>
            </Stack.Navigator>
          </NavigationContainer>)
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
        <LangProvider>
            <Navigation/>
        </LangProvider>
      </View>
  );
}
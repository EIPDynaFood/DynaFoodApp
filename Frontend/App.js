import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Button, LogBox} from 'react-native';
import Scanner from "./src/screens/Scanner";
import Product from "./src/screens/Product";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import 'localstorage-polyfill';
import History from "./src/screens/History";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import Settings from "./src/screens/Settings";
import {Icon} from "react-native-elements";
import {JwtProvider} from "./Jwt"
import {RequireJwt} from "./src/components/RequireJwt"
const Stack = createNativeStackNavigator();

export default function App() {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  // I know that this seems weird, but the maintainer of react-native-navigation suggests this fix...

  return (
        <View style={{flex: 1}}>
          <JwtProvider>
              <NavigationContainer>
                <Stack.Navigator>
                  <Stack.Screen name="Login" component={Login}/>
                  <Stack.Screen name="Register" component={Register}/>
                  <Stack.Screen name="History" component={History}
                                options={({navigation, route}) => ({
                                  headerRight: () => (
                                      <Icon
                                          onPress={() => navigation.navigate("Settings")}
                                          name="settings"
                                      />
                                  )
                                })}
                  />
                  <Stack.Screen name="Scanner" component={Scanner}/>
                  <Stack.Screen name="Product" component={Product}/>
                  <Stack.Screen name="Settings" component={Settings}/>
                </Stack.Navigator>
              </NavigationContainer>
          )}
          </JwtProvider>
        </View>
  );
}

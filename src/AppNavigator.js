import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './screen/Login';
import { Home } from './screen/Home';
import { SplashScreen } from './screen/SplashScreen';
const Stack = createNativeStackNavigator();
export function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen component={SplashScreen} name={"Splash"} />
                <Stack.Screen component={Login} name={"Login"} />
                <Stack.Screen component={Home} name={"Home"} />
            </Stack.Navigator>
        </NavigationContainer>

    )
}

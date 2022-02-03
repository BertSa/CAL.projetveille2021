/**
 * Sample React Native App
 * @format
 * @flow strict-local
 */

import type { Node } from 'react';
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './components/SplashScreen';
import 'react-native-gesture-handler';

const App : () => Node = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const Stack = createStackNavigator();
    const mHome = ( props ) => <Home stack={ Stack }  navigation={props.navigation}/>;
    const Auth = () => {
        return (
            <Stack.Navigator initialRouteName="LoginScreen">
                <Stack.Screen
                    name="LoginScreen"
                    component={ LoginScreen }
                    options={ {
                        headerBackTitleStyle: {
                            color: isDarkMode ? '#fff' : '#000'
                        }
                    } }
                />
                <Stack.Screen
                    name="RegisterScreen"
                    component={ RegisterScreen }
                    options={ {
                        headerBackTitleVisible: false
                    } }
                />
            </Stack.Navigator>
        );
    };

    return (
        <SafeAreaView
            style={ {
                ...styles.container,
                backgroundColor: isDarkMode ? '#333' : '#EEE'
            } }>
            <StatusBar
                translucent={ true }
                barStyle={ isDarkMode ? 'light-content' : 'dark-content' }
                backgroundColor={ '#00000000' }
            />
            <NavigationContainer
                theme={ {
                    colors: {
                        background: '#00000000',
                        primary: isDarkMode ? '#333' : '#EEE',
                        text: isDarkMode ? '#fff' : '#000',
                        card: isDarkMode ? '#333' : '#EEE',
                        border: isDarkMode ? '#333' : '#EEE',
                        notification: isDarkMode ? '#333' : '#EEE'
                    },
                    dark: isDarkMode
                } }>
                <Stack.Navigator initialRouteName="SplashScreen">
                    <Stack.Screen
                        name="SplashScreen"
                        component={ SplashScreen }
                        options={ {headerShown: false} }
                    />
                    <Stack.Screen
                        name="Auth"
                        component={ Auth }
                        options={ {headerShown: false} }
                    />
                    <Stack.Screen
                        name="Home"
                        component={ mHome }
                        options={ {headerShown: false} }
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
};
export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 55,
        paddingHorizontal: 20
    }
});

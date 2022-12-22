import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/home/Home';
import Header from '../components/header';
import {RouteNames} from '../constants/RouteNames';
import SplashScreen from '../screens/splash/SplashScreen';
import LoginScreen from '../screens/login/Login';
import SignUpScreen from '../screens/login/SignUp';
import OTP from '../screens/login/OTP';
import ScanNfc from '../screens/home/ScanNfc';
import HomeStackNavigator from './HomeStackNavigator';
import BottomTabNavigator from '../components/BottomTabNavigator';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name={RouteNames.HOME_STACK_NAV}
          component={HomeStackNavigator}
          options={({navigation}) => {
            return {
              header: () => <Header navigation={navigation} />,
            };
          }}
        />
      </Stack.Navigator>
      <BottomTabNavigator />
    </>
  );
};

const styles = StyleSheet.create({});

export default HomeStack;

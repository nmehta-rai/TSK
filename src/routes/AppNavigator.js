import React from 'react';
import {View, StyleSheet} from 'react-native';
import RootNavigator from './RootNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {RouteNames} from '../constants/RouteNames';
import SplashScreen from '../screens/splash/SplashScreen';
import Login from '../screens/login/Login';
import OTP from '../screens/login/OTP';
import SignUp from '../screens/login/SignUp';
import ChooseMethod from '../screens/password/ChooseMethod';
import NewPassword from '../screens/password/NewPassword';
import ForgotPassword from '../screens/password/ForgotPassword';
import MyAccount from '../screens/drawer/MyAccount';
import {useLang} from '../contexts/languageContext';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const langContext = useLang(useLang);
  const {dictionary, userLanguageChange} = langContext;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={RouteNames.SPLASH}
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={RouteNames.LOGIN}
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={RouteNames.OTP}
          component={OTP}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={RouteNames.SIGNUP}
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={RouteNames.CHOOSE_METHOD}
          component={ChooseMethod}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={RouteNames.NEW_PASSWORD}
          component={NewPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={RouteNames.FORGOT_PASSWORD}
          component={ForgotPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={RouteNames.ROOT_NAV}
          component={RootNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={dictionary.drawerLabelAct}
          component={MyAccount}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default AppNavigator;

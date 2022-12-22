import React from 'react';
import {View, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RouteNames} from '../constants/RouteNames';
import ScanNfc from '../screens/home/ScanNfc';
import ScanQr from '../screens/home/ScanQr';
import ModuleDetails from '../screens/home/ModuleDetails';
import ModuleHistory from '../screens/history/ModuleHistory';
import StartQr from '../screens/home/StartQr';

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={RouteNames.SCAN_NFC}
        component={ScanNfc}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={RouteNames.SCAN_QR}
        component={ScanQr}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={RouteNames.QR_HISTORY}
        component={ModuleDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={RouteNames.MODULE_HISTORY}
        component={ModuleHistory}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={RouteNames.START_QR}
        component={StartQr}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default HomeStackNavigator;

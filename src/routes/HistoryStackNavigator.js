import React from 'react';
import {View, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RouteNames} from '../constants/RouteNames';
import ScanNfc from '../screens/home/ScanNfc';
import ScanQr from '../screens/home/ScanQr';
import ModuleDetails from '../screens/home/ModuleDetails';
import ModuleConfiguration from '../screens/history/ModuleConfiguration';
import OrderDetails from '../screens/history/OrderDetails';
import ConnectInformation from '../screens/history/ConnectInformation';
import ProjectSettings from '../screens/history/ProjectSettings';
import MSF from '../screens/history/MSF';
import Remark from '../screens/history/Remark';
import ModuleHistory from '../screens/history/ModuleHistory';
import KomaxDirect from '../screens/history/KomaxDirect';
import {useLang} from '../contexts/languageContext';

const Stack = createNativeStackNavigator();

const HistoryStackNavigator = () => {
  const langContext = useLang(useLang);
  const {dictionary, userLanguageChange} = langContext;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={dictionary.moduleConfigTitle}
        component={ModuleConfiguration}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={dictionary.orderDetailsTitle}
        component={OrderDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={dictionary.connectorInfoTitle}
        component={ConnectInformation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={dictionary.projectSettingsLabel}
        component={ProjectSettings}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={dictionary.MsfTitle}
        component={MSF}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={dictionary.remarkTitle}
        component={Remark}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name={RouteNames.KOMAX_DIRECT}
        component={KomaxDirect}
        options={{headerShown: false}}
      /> */}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default HistoryStackNavigator;

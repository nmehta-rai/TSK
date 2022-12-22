import React from 'react';
import {View, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RouteNames} from '../constants/RouteNames';
import HomeStack from './HomeStack';
import HistoryStack from './HistoryStack';

const Stack = createNativeStackNavigator();

const AppHomeStackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={RouteNames.HOME_STACK_SCREEN}
        component={HomeStack}
        options={{
          drawerPosition: 'right',
          headerShown: false,
          drawerStyle: {width: '60.5%'},
          drawerItemStyle: {
            display: 'none',
          },
        }}
      />
      <Stack.Screen
        name={RouteNames.HISTORY_STACK_SCREEN}
        component={HistoryStack}
        options={{
          drawerPosition: 'right',
          headerShown: false,
          drawerStyle: {width: '60.5%'},
          drawerItemStyle: {
            display: 'none',
          },
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default AppHomeStackNav;

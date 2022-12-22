import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Header from '../components/header';
import {RouteNames} from '../constants/RouteNames';
import HomeStackNavigator from './HomeStackNavigator';
import BottomTabNavigator from '../components/BottomTabNavigator';
import HistoryStackNavigator from './HistoryStackNavigator';
import HistoryFooter from '../components/HistoryFooter';
import KomaxDirect from '../screens/history/KomaxDirect';

const Stack = createNativeStackNavigator();

const HistoryStack = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name={RouteNames.HISTORY_STACK_NAV}
          component={HistoryStackNavigator}
          options={({navigation}) => {
            return {
              header: () => <Header navigation={navigation} />,
            };
          }}
        />
        <Stack.Screen
          name={RouteNames.KOMAX_DIRECT}
          component={KomaxDirect}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      <HistoryFooter />
    </>
  );
};

const styles = StyleSheet.create({});

export default HistoryStack;

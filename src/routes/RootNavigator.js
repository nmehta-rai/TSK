import React from 'react';
import {View, StyleSheet} from 'react-native';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {RouteNames} from '../constants/RouteNames';
import DrawerContent from '../components/DrawerContent';
import {defaultTheme} from '../themes/Themes';
import MyAccount from '../screens/drawer/MyAccount';
import ChangePassword from '../screens/drawer/ChangePassword';
import Settings from '../screens/drawer/Settings';
import Contact from '../screens/drawer/Contact';
import Imprint from '../screens/drawer/Imprint';

import UserIcon from '../assets/svgs/drawerNav/userIcon.svg';
import ImprintIcon from '../assets/svgs/drawerNav/imprintIcon.svg';
import SettingsIcon from '../assets/svgs/drawerNav/settingsIcon.svg';
import LocationIcon from '../assets/svgs/drawerNav/locationIcon.svg';
import KeyIcon from '../assets/svgs/drawerNav/keyIcon.svg';
import AppHomeStackNav from './AppHomeStackNav';
import ViewPdf from '../screens/drawer/ViewPdf';
import {useLang} from '../contexts/languageContext';

const Drawer = createDrawerNavigator();

const RootNavigator = () => {
  const langContext = useLang(useLang);
  const {dictionary, userLanguageChange} = langContext;

  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name={RouteNames.APP_HOME_STACK_NAV}
        component={AppHomeStackNav}
        options={{
          drawerPosition: 'right',
          headerShown: false,
          drawerStyle: {width: '60.5%'},
          drawerItemStyle: {
            display: 'none',
          },
        }}
      />
      <Drawer.Screen
        name={dictionary.drawerLabelAct}
        component={MyAccount}
        options={{
          drawerPosition: 'right',
          headerShown: false,
          drawerItemStyle: {
            borderTopColor: defaultTheme.midBlue,
            borderTopWidth: 1,
            borderBottomColor: defaultTheme.midBlue,
            borderBottomWidth: 1,
            width: '100%',
            marginLeft: 0,
          },
          drawerLabelStyle: styles.drawerLabel,
          drawerIcon: () => <UserIcon style={styles.iconStyle} />,
          drawerActiveBackgroundColor: 'transparent',
          drawerActiveTintColor: 'transparent',
        }}
      />
      <Drawer.Screen
        name={dictionary.drawerLabelPass}
        component={ChangePassword}
        options={{
          drawerPosition: 'right',
          headerShown: false,
          drawerItemStyle: {
            borderBottomColor: defaultTheme.midBlue,
            borderBottomWidth: 1,
            width: '100%',
            marginLeft: 0,
          },
          drawerLabelStyle: styles.drawerLabel,
          drawerIcon: () => <KeyIcon style={styles.iconStyle} />,
          drawerActiveBackgroundColor: 'transparent',
          drawerActiveTintColor: 'transparent',
        }}
      />
      <Drawer.Screen
        name={dictionary.drawerLabelSettings}
        component={Settings}
        options={{
          drawerPosition: 'right',
          headerShown: false,
          drawerItemStyle: {
            borderBottomColor: defaultTheme.midBlue,
            borderBottomWidth: 1,
            width: '100%',
            marginLeft: 0,
          },
          drawerLabelStyle: styles.drawerLabel,
          drawerIcon: () => <SettingsIcon style={styles.iconStyle} />,
          drawerActiveBackgroundColor: 'transparent',
          drawerActiveTintColor: 'transparent',
        }}
      />
      <Drawer.Screen
        name={dictionary.drawerLabelContacts}
        component={Contact}
        options={{
          drawerPosition: 'right',
          headerShown: false,
          drawerItemStyle: {
            borderBottomColor: defaultTheme.midBlue,
            borderBottomWidth: 1,
            width: '100%',
            marginLeft: 0,
          },
          drawerLabelStyle: styles.drawerLabel,
          drawerIcon: () => <LocationIcon style={styles.iconStyle} />,
          drawerActiveBackgroundColor: 'transparent',
          drawerActiveTintColor: 'transparent',
        }}
      />
      <Drawer.Screen
        name={dictionary.drawerLabelImprint}
        component={Imprint}
        options={{
          drawerPosition: 'right',
          headerShown: false,
          drawerItemStyle: {
            width: '100%',
            marginLeft: 0,
            borderBottomColor: defaultTheme.midBlue,
            borderBottomWidth: 1,
          },
          drawerLabelStyle: styles.drawerLabel,
          drawerIcon: () => <ImprintIcon style={styles.iconStyle} />,
          drawerActiveBackgroundColor: 'transparent',
          drawerActiveTintColor: 'transparent',
        }}
      />
      <Drawer.Screen
        name={dictionary.drawerLabelPdf}
        component={ViewPdf}
        options={{
          drawerPosition: 'right',
          headerShown: false,
          drawerItemStyle: {
            width: '100%',
            marginLeft: 0,
          },
          drawerLabelStyle: styles.drawerLabel,
          drawerIcon: () => <ImprintIcon style={styles.iconStyle} />,
          drawerActiveBackgroundColor: 'transparent',
          drawerActiveTintColor: 'transparent',
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerLabel: {
    fontFamily: defaultTheme.familyRegular,
    fontSize: defaultTheme.fontSizeBodyLarge,
    fontWeight: '400',
    color: defaultTheme.black,
    paddingVertical: 8,
  },
  iconStyle: {
    marginLeft: 10,
    marginRight: -5,
  },
});

export default RootNavigator;

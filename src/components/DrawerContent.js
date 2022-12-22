import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import UserIcon from '../assets/svgs/drawerNav/userIcon.svg';
import ImprintIcon from '../assets/svgs/drawerNav/imprintIcon.svg';
import SettingsIcon from '../assets/svgs/drawerNav/settingsIcon.svg';
import LocationIcon from '../assets/svgs/drawerNav/locationIcon.svg';
import KeyIcon from '../assets/svgs/drawerNav/keyIcon.svg';
import {RouteNames} from '../constants/RouteNames';
import {defaultTheme} from '../themes/Themes';
import BurgerIcon from '../assets/svgs/headerComponent/hamburgerIcon.svg';

const DrawerContent = props => {
  return (
    <DrawerContentScrollView {...props}>
      <TouchableOpacity
        style={styles.burgerRow}
        onPress={() => props.navigation.closeDrawer()}>
        <BurgerIcon />
      </TouchableOpacity>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    borderBottomColor: defaultTheme.midBlue,
    borderBottomWidth: 1,
  },
  burgerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 25,
    marginVertical: 18,
  },
});

export default DrawerContent;

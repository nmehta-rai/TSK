import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Platform} from 'react-native';
import NfcTabIconWhite from '../assets/svgs/bottomTabNav/nfcTabIconWhite.svg';
import NfcTabIconGray from '../assets/svgs/bottomTabNav/nfcTabIconGray.svg';
import QrTabIconGray from '../assets/svgs/bottomTabNav/qrTabIconGray.svg';
import QrTabIconWhite from '../assets/svgs/bottomTabNav/qrTabIconWhite.svg';
import ModuleDetails from '../assets/svgs/bottomTabNav/qrHistory.svg';
import QrHistoryWhite from '../assets/svgs/bottomTabNav/qrHistoryWhite.svg';
import {defaultTheme} from '../themes/Themes';
import {useNavigation} from '@react-navigation/native';
import {RouteNames} from '../constants/RouteNames';
import {useLang} from '../contexts/languageContext';

const BottomTabNavigator = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const naviagtion = useNavigation();

  const langContext = useLang(useLang);
  const {dictionary, userLanguageChange} = langContext;

  const tabPressHandle = index => {
    setTabIndex(index);
    if (index == 0) {
      naviagtion.navigate(RouteNames.SCAN_NFC);
    } else if (index == 1) {
      naviagtion.navigate(RouteNames.START_QR);
    } else if (index == 2) {
      naviagtion.navigate(RouteNames.MODULE_HISTORY);
    }
  };
  return (
    <View
      style={
        Platform.OS === 'android'
          ? styles.bottomTabsContainerAndroid
          : styles.bottomTabsContainerIos
      }>
      <View style={tabIndex == 0 ? styles.NfcCol : styles.NfcColInactive}>
        <TouchableOpacity
          style={styles.NfcBtn}
          onPress={() => tabPressHandle(0)}>
          {tabIndex == 0 ? (
            <NfcTabIconWhite style={styles.tabIcon} height={25} width={25} />
          ) : (
            <NfcTabIconGray style={styles.tabIcon} height={25} width={25} />
          )}
          <Text style={styles.nfcIconTxt}>{dictionary.nfcTabLabel}</Text>
        </TouchableOpacity>
      </View>
      <View style={tabIndex == 1 ? styles.QrCodeCol : styles.QrCodeColInactive}>
        <TouchableOpacity
          style={styles.QrBtn}
          onPress={() => tabPressHandle(1)}>
          {tabIndex == 1 ? (
            <QrTabIconWhite style={styles.tabIcon} height={25} width={25} />
          ) : (
            <QrTabIconGray style={styles.tabIcon} height={25} width={25} />
          )}

          <Text style={styles.QrIconTxt}>{dictionary.qrTabLabel}</Text>
        </TouchableOpacity>
      </View>
      <View style={tabIndex == 2 ? styles.QrCodeCol : styles.QrCodeColInactive}>
        <TouchableOpacity
          style={styles.QrBtn}
          onPress={() => tabPressHandle(2)}>
          {tabIndex == 2 ? (
            <QrHistoryWhite style={styles.tabIcon} height={25} width={25} />
          ) : (
            <ModuleDetails style={styles.tabIcon} height={25} width={25} />
          )}

          <Text style={styles.QrIconTxt}>{dictionary.historyTabLabel}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomTabsContainerIos: {
    flexDirection: 'row',
    backgroundColor: defaultTheme.midBlue,
    paddingBottom: 35,
    paddingHorizontal: 10,
    paddingTop: 10,
    alignItems: 'center',
  },
  bottomTabsContainerAndroid: {
    flexDirection: 'row',
    backgroundColor: defaultTheme.midBlue,
    paddingBottom: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
    alignItems: 'center',
  },
  NfcCol: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
  },
  NfcColInactive: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
    opacity: 0.6,
  },
  QrCodeColInactive: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
    opacity: 0.6,
  },
  QrCodeCol: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
  },
  NfcBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  QrBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    marginBottom: 5,
  },
  nfcIconTxt: {
    color: defaultTheme.white,
    fontFamily: defaultTheme.familyRegular,
    fontSize: defaultTheme.fontSizeCaption,
    fontWeight: '400',
  },
  QrIconTxt: {
    color: defaultTheme.white,
    fontFamily: defaultTheme.familyRegular,
    fontSize: defaultTheme.fontSizeCaption,
    fontWeight: '400',
  },
});

export default BottomTabNavigator;

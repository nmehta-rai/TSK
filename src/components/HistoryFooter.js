import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import {defaultTheme} from '../themes/Themes';
import {useNavigation} from '@react-navigation/native';
import {RouteNames} from '../constants/RouteNames';
import Shape from '../assets/svgs/historyFooter/shape.svg';
import HomeIcon from '../assets/svgs/historyFooter/home.svg';
import ForwardArrow from '../assets/svgs/historyFooter/forwardArrow.svg';
import BackArrow from '../assets/svgs/historyFooter/backArrow.svg';
import {useHistoryStack} from '../contexts/historyStackContext';
import {CommonActions} from '@react-navigation/native';
import {useLang} from '../contexts/languageContext';

const HistoryFooter = () => {
  const navigation = useNavigation();

  const [width, setWidth] = useState();
  const [shapeWidth, setShapeWidth] = useState();

  const navigateHome = () => {
    navigation.navigate(RouteNames.HOME_STACK_SCREEN);
    changeCurrentScreen('mc');
  };

  const langContext = useLang(useLang);
  const {dictionary, userLanguageChange} = langContext;

  const historyStackContext = useHistoryStack(useHistoryStack);
  const {currentScreen, changeCurrentScreen} = historyStackContext;
  const navigateForward = () => {
    if (currentScreen == 'mc') {
      navigation.navigate(dictionary.orderDetailsTitle);
      changeCurrentScreen('od');
    } else if (currentScreen == 'od') {
      navigation.navigate(dictionary.connectorInfoTitle);
      changeCurrentScreen('ci');
    } else if (currentScreen == 'ci') {
      navigation.navigate(dictionary.projectSettingsLabel);
      changeCurrentScreen('ps');
    } else if (currentScreen == 'ps') {
      navigation.navigate(dictionary.MsfTitle);
      changeCurrentScreen('msf');
    } else if (currentScreen == 'msf') {
      navigation.navigate(dictionary.remarkTitle);
      changeCurrentScreen('r');
    } else {
      return;
    }
  };

  const navigateBack = () => {
    if (currentScreen == 'mc') {
      navigation.goBack();
    } else if (currentScreen == 'od') {
      navigation.navigate(dictionary.moduleConfigTitle);
      changeCurrentScreen('mc');
    } else if (currentScreen == 'ci') {
      navigation.navigate(dictionary.orderDetailsTitle);
      changeCurrentScreen('od');
    } else if (currentScreen == 'ps') {
      navigation.navigate(dictionary.connectorInfoTitle);
      changeCurrentScreen('ci');
    } else if (currentScreen == 'msf') {
      navigation.navigate(dictionary.projectSettingsLabel);
      changeCurrentScreen('ps');
    } else if (currentScreen == 'r') {
      navigation.navigate(dictionary.MsfTitle);
      changeCurrentScreen('msf');
    } else {
      return;
    }
  };

  return (
    <>
      <View style={styles.bottomTabsContainer}>
        {/* arrows btns col */}
        <View
          style={styles.shapeCol}
          onLayout={event => {
            setWidth(event.nativeEvent.layout.width * 0.85);
            setShapeWidth(event.nativeEvent.layout.width);
          }}>
          <Shape style={styles.shape} />
          {width && (
            <View style={[styles.arrowsRow, {width: width}]}>
              <TouchableOpacity
                style={styles.backArrowContainer}
                onPress={() => navigateBack()}>
                <BackArrow />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.forwardArrowContainer}
                onPress={() => {
                  navigateForward();
                }}>
                <ForwardArrow />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* home button col */}
        <TouchableOpacity style={styles.homeBtnCol} onPress={navigateHome}>
          <HomeIcon />
        </TouchableOpacity>
      </View>
      {Platform.OS == 'ios' ? <View style={styles.spacer} /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  bottomTabsContainer: {
    flexDirection: 'row',
    backgroundColor: defaultTheme.white,
    borderTopColor: defaultTheme.midBlue,
    borderTopWidth: 2,
  },
  shapeCol: {
    flex: 0.7,
    // zIndex: 0,
    justifyContent: 'center',
  },
  shape: {
    marginTop: -6,
    flexDirection: 'row',
  },
  arrowsRow: {
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'space-between',
    paddingHorizontal: 55,
  },
  homeBtnCol: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    flexDirection: 'row',
    backgroundColor: defaultTheme.midBlue,
    paddingVertical: 10,
  },
});

export default HistoryFooter;

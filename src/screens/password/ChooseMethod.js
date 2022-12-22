import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/header';
import {defaultTheme} from '../../themes/Themes';

import ArrowIcon from '../../assets/svgs/forgotPassword/arrow.svg';
import FrontArrow from '../../assets/svgs/chooseMethod/frontArrow.svg';
import EmailIcon from '../../assets/svgs/chooseMethod/email.svg';
import MobileIcon from '../../assets/svgs/chooseMethod/mobile.svg';
import {useNavigation} from '@react-navigation/native';
import {RouteNames} from '../../constants/RouteNames';

const ChooseMethod = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.safeArea}>
        <Header otp={true} />
        <View style={styles.spacer} />

        {/* content section */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Choose Method</Text>

          {/* input section */}
          <View style={styles.methodRow}>
            <View style={styles.methodIconCol}>
              <MobileIcon />
            </View>
            <View style={styles.methodTxtCol}>
              <Text style={styles.methodTitleTxt}>Mobile OTP</Text>
              <Text style={styles.contactMethodTxt}>+91 98******98</Text>
            </View>
            <View style={styles.methodArrowCol}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(RouteNames.OTP, {stage: 'signUp'})
                }>
                <FrontArrow />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.methodRow}>
            <View style={styles.methodIconCol}>
              <MobileIcon />
            </View>
            <View style={styles.methodTxtCol}>
              <Text style={styles.methodTitleTxt}>Email OTP</Text>
              <Text style={styles.contactMethodTxt}>gous******@komax.com</Text>
            </View>
            <View style={styles.methodArrowCol}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(RouteNames.OTP, {stage: 'signUp'})
                }>
                <FrontArrow />
              </TouchableOpacity>
            </View>
          </View>

          {/* buttons section */}

          <View style={styles.createAcctRow}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backBtnRow}>
              <ArrowIcon />
              <Text style={styles.createAcctBtnTxt}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  spacer: {
    flex: 0.1,
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 25,
  },
  title: {
    color: defaultTheme.darkGray,
    fontFamily: defaultTheme.familyMedium,
    fontSize: defaultTheme.fontSizeLargeDisplay,
    marginBottom: 25,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(118, 122, 124, 0.2)',
    paddingVertical: 15,
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  inputTxt: {
    marginLeft: 13,
    color: defaultTheme.midGray,
    fontFamily: defaultTheme.familyRegular,
    fontSize: defaultTheme.fontSizeBody,
    fontWeight: '400',
  },

  signInRow: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 35,
  },
  signInBtn: {
    backgroundColor: defaultTheme.grayBlue,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 2,
  },
  signInTxt: {
    color: defaultTheme.white,
    fontFamily: defaultTheme.familyMedium,
    fontSize: defaultTheme.fontSizeSubheading,
  },
  createAcctRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },

  createAcctBtnTxt: {
    fontFamily: defaultTheme.familyRegular,
    fontSize: defaultTheme.fontSizeSubheading,
    fontWeight: '500',
    color: defaultTheme.midBlue,
    marginLeft: 2,
  },
  backBtnRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(148, 160, 174, 0.11)',
    paddingVertical: 25,
    paddingHorizontal: 10,
    borderRadius: 2,
    marginBottom: 18,
  },
  methodIconCol: {
    flex: 0.1,
    alignItems: 'center',
  },
  methodTxtCol: {
    flex: 0.8,
    marginLeft: 10,
  },
  methodArrowCol: {
    flex: 0.1,
  },
  methodTitleTxt: {
    fontFamily: defaultTheme.familyRegular,
    fontWeight: '400',
    fontSize: defaultTheme.fontSizeBody,
    marginBottom: 5,
  },
  contactMethodTxt: {
    fontFamily: defaultTheme.familyRegular,
    fontWeight: '400',
    fontSize: defaultTheme.fontSizeSubheading,
  },
});

export default ChooseMethod;

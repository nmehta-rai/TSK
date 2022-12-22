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
import UserIcon from '../../assets/svgs/login/userIcon.svg';
import PasswordIcon from '../../assets/svgs/login/passwordIcon.svg';
import MobileIcon from '../../assets/svgs/login/mobileIcon.svg';
import {useNavigation} from '@react-navigation/native';
import {RouteNames} from '../../constants/RouteNames';
import ArrowIcon from '../../assets/svgs/forgotPassword/arrow.svg';
import {CommonActions} from '@react-navigation/native';

const NewPassword = () => {
  const navigation = useNavigation();

  const [password, setPassword] = useState('');
  const handlePassword = input => {
    setPassword(input);
  };
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleConfirmPassword = input => {
    setConfirmPassword(input);
  };

  // one upper case, one lower case, one digit, one special character and minimum eight in length
  const validatePassword = password => {
    if (
      password.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/,
      )
    ) {
      return true;
    } else return false;
  };

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.safeArea}>
        <Header otp={true} />
        <View style={styles.spacer} />

        {/* content section */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>New Password</Text>

          {/* input section */}
          <View style={styles.inputRow}>
            <PasswordIcon />
            <TextInput
              placeholder="Password"
              style={styles.inputTxt}
              placeholderTextColor={defaultTheme.midGray}
              onChangeText={input => handlePassword(input)}
              value={password}
              secureTextEntry={true}
              autoCorrect={false}
              autoComplete="off"
              autoCapitalize={'none'}
            />
          </View>
          <View style={styles.inputRow}>
            <PasswordIcon />
            <TextInput
              placeholder="Confirm Password"
              style={styles.inputTxt}
              placeholderTextColor={defaultTheme.midGray}
              onChangeText={input => handleConfirmPassword(input)}
              value={confirmPassword}
              secureTextEntry={true}
              autoCorrect={false}
              autoComplete="off"
              autoCapitalize={'none'}
            />
          </View>

          {/* buttons section */}

          <View style={styles.signInRow}>
            <TouchableOpacity
              style={
                validatePassword(password) &&
                validatePassword(confirmPassword) &&
                password === confirmPassword
                  ? styles.signInBtn
                  : styles.signInBtnDisabled
              }
              disabled={
                validatePassword(password) &&
                validatePassword(confirmPassword) &&
                password === confirmPassword
                  ? false
                  : true
              }
              onPress={() =>
                navigation.dispatch(
                  CommonActions.reset({
                    index: 1,
                    routes: [
                      {
                        name: RouteNames.ROOT_NAV,
                        routes: [{name: RouteNames.HOME_STACK_NAV}],
                      },
                    ],
                  }),
                )
              }>
              <Text style={styles.signInTxt}>SAVE</Text>
            </TouchableOpacity>
          </View>

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
    marginBottom: 15,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(118, 122, 124, 0.2)',
    paddingVertical: 15,
    marginVertical: 20,
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
  signInBtnDisabled: {
    backgroundColor: defaultTheme.grayBlue,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 2,
  },
  signInBtn: {
    backgroundColor: defaultTheme.midBlue,
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
  createAcctTxt: {
    fontFamily: defaultTheme.familyRegular,
    fontSize: defaultTheme.fontSizeSubheading,
    fontWeight: '400',
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
  createAcctTitleTxt: {
    fontFamily: defaultTheme.familyRegular,
    fontSize: defaultTheme.fontSizeSubheading,
    fontWeight: '500',
    color: defaultTheme.midBlue,
    marginBottom: 20,
  },
});

export default NewPassword;

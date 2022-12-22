import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import {defaultTheme} from '../../themes/Themes';
import UserIcon from '../../assets/svgs/login/userIcon.svg';
import MobileIcon from '../../assets/svgs/login/mobileIcon.svg';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {RouteNames} from '../../constants/RouteNames';
import DrawerScreenHeader from '../../components/DrawerScreenHeader';
import {logout} from 'react-native-app-auth';
import {useAuth} from '../../contexts/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLang} from '../../contexts/languageContext';

const MyAccount = () => {
  const langContext = useLang(useLang);
  const {dictionary, userLanguageChange} = langContext;

  const config = {
    issuer: 'https://komax-dmi-sts-we-test-web.azurewebsites.net',
    clientId: 'tsk.mobile',
    redirectUrl: 'com.tsk.connect:/logout',
    scopes: ['openid', 'profile', 'email', 'tsk_mobile'],
  };

  const signOut = async () => {
    try {
      let auth = await AsyncStorage.getItem('auth');
      auth = JSON.parse(auth);
      const result = await logout(config, {
        idToken: auth.idToken,
        postLogoutRedirectUrl: 'com.tsk.connect:/logout',
      });
      AsyncStorage.removeItem('auth');
      console.log('Result of logout: ', result);
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: RouteNames.SPLASH}],
        }),
      );
    } catch (e) {
      console.log(e);
    }
  };

  const validateEmail = email => {
    if (
      email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
    ) {
      return true;
    } else return false;
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

  const navigation = useNavigation();
  const [email, setEmail] = useState('gous@komax.com');
  const handleEmail = input => {
    setEmail(input);
  };
  const [password, setPassword] = useState('');
  const handlePassword = input => {
    setPassword(input);
  };
  const [mobile, setMobile] = useState('+91 9632652630');
  const handleMobile = input => {
    setMobile(input);
  };
  return (
    <View style={styles.mainContainer}>
      <DrawerScreenHeader screenName={dictionary.myAccountTitle} />
      <View style={styles.spacer} />

      {/* content section */}
      <View style={styles.contentContainer}>
        {/* input section */}
        <View style={styles.inputRow}>
          <UserIcon />
          <Text style={styles.inputTxt}>{email}</Text>
        </View>
        <View style={styles.inputRow}>
          <MobileIcon />
          <Text style={styles.inputTxt}>{mobile}</Text>
        </View>

        {/* buttons section */}
        <View style={styles.signInRow}>
          <TouchableOpacity
            style={
              validateEmail(email) && validatePassword(password)
                ? styles.signInBtn
                : styles.signInBtnDisabled
            }
            disabled={
              // validateEmail(email) && validatePassword(password) ? false : true
              false
            }
            onPress={() =>
              // navigation.navigate(RouteNames.OTP, {stage: 'login'})
              signOut()
            }>
            <Text style={styles.signInTxt}>SIGN OUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },

  spacer: {
    flex: 0.03,
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
  createAcctTxt: {
    fontFamily: defaultTheme.familyRegular,
    fontSize: defaultTheme.fontSizeSubheading,
    fontWeight: '400',
  },
  createAcctBtnTxt: {
    fontFamily: defaultTheme.familyRegular,
    fontSize: defaultTheme.fontSizeSubheading,
    fontWeight: '400',
    color: defaultTheme.midBlue,
  },
  createAcctTitleTxt: {
    fontFamily: defaultTheme.familyRegular,
    fontSize: defaultTheme.fontSizeSubheading,
    fontWeight: '500',
    color: defaultTheme.midBlue,
    marginBottom: 20,
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
});

export default MyAccount;

import React, {useState, useContext, useEffect} from 'react';
import {authorize} from 'react-native-app-auth';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {defaultTheme} from '../../themes/Themes';
import UserIcon from '../../assets/svgs/login/userIcon.svg';
import PasswordIcon from '../../assets/svgs/login/passwordIcon.svg';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {RouteNames} from '../../constants/RouteNames';
import Header from '../../components/header';
import {useLang} from '../../contexts/languageContext';
import {logout} from 'react-native-app-auth';
import {useAuth} from '../../contexts/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const authContext = useAuth(useAuth);
  const {saveAuthData} = authContext;
  //login credentials
  // nmehta.rai@gmail.com
  //Password - Admin@123

  // Okta config
  // const config = {
  //   issuer: 'https://dev-64684897.okta.com/oauth2/default',
  //   clientId: '0oa51mwyyamt5kMRQ5d7',
  //   redirectUrl: 'com.okta.dev-64684897:/login',
  //   scopes: ['openid', 'profile'],
  // };

  const config = {
    issuer: 'https://komax-dmi-sts-we-test-web.azurewebsites.net',
    clientId: 'tsk.mobile',
    redirectUrl: 'com.tsk.connect:/login',
    scopes: ['openid', 'profile', 'email', 'tsk_mobile'],
  };

  const login = async () => {
    const authState = await authorize(config);
    console.log('This is the auth state: ', authState);
    if (authState.accessToken) {
      try {
        await AsyncStorage.setItem('auth', JSON.stringify(authState));
        console.log('Token Stored');
      } catch (e) {
        console.log(e);
      }
      saveAuthData(authState);
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: RouteNames.ROOT_NAV}],
        }),
      );
    } else {
      Alert.alert('Unable to login');
    }
  };

  const langContext = useLang(useLang);
  const {dictionary, userLanguageChange} = langContext;
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const handleEmail = input => {
    setEmail(input);
  };
  const [password, setPassword] = useState('');
  const handlePassword = input => {
    setPassword(input);
  };
  // const {dictionary} = useContext(LanguageContext);

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

  return (
    <View style={styles.mainContainer}>
      <Header login={true} />
      <View style={styles.spacer} />

      {/* content section */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{dictionary.loginTitle}</Text>

        {/* input section */}
        <View style={styles.inputRow}>
          <UserIcon style={styles.inputIcon} />
          <TextInput
            placeholder="Email Id"
            style={styles.inputTxt}
            placeholderTextColor={defaultTheme.midGray}
            onChangeText={input => handleEmail(input)}
            value={email}
            keyboardType="email-address"
            autoCorrect={false}
            autoComplete="off"
            autoCapitalize={'none'}
          />
        </View>
        <View style={styles.inputRow}>
          <PasswordIcon style={styles.inputIcon} />
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

        {/* buttons section */}
        <View style={styles.forgotPasswordRow}>
          <TouchableOpacity
            onPress={() => navigation.navigate(RouteNames.FORGOT_PASSWORD)}>
            <Text style={styles.forgotPasswordTxt}>Forgot Password ?</Text>
          </TouchableOpacity>
        </View>
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
              login()
            }>
            <Text style={styles.signInTxt}>SIGN IN</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.createAcctRow}>
          <Text style={styles.createAcctTxt}>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(RouteNames.SIGNUP)}>
            <Text style={styles.createAcctBtnTxt}>create a new account</Text>
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
    marginBottom: 30,
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
    color: defaultTheme.midGray,
    fontFamily: defaultTheme.familyRegular,
    fontSize: defaultTheme.fontSizeBody,
    fontWeight: '400',
  },
  forgotPasswordRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginBottom: 20,
  },
  forgotPasswordTxt: {
    color: defaultTheme.red,
  },
  signInRow: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 30,
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
    marginTop: 15,
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
  inputIcon: {marginRight: 13},
});

export default Login;

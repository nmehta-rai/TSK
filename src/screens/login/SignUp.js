import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {defaultTheme} from '../../themes/Themes';
import UserIcon from '../../assets/svgs/login/userIcon.svg';
import PasswordIcon from '../../assets/svgs/login/passwordIcon.svg';
import MobileIcon from '../../assets/svgs/login/mobileIcon.svg';
import {useNavigation} from '@react-navigation/native';
import {RouteNames} from '../../constants/RouteNames';
import Header from '../../components/header';

const SignUp = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const handleEmail = input => {
    setEmail(input);
  };
  const [password, setPassword] = useState('');
  const handlePassword = input => {
    setPassword(input);
  };
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleConfirmPassword = input => {
    setConfirmPassword(input);
  };
  const [mobile, setMobile] = useState('');
  const handleMobile = input => {
    setMobile(input);
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

  const validateMobile = mobile => {
    if (mobile.match(/^\d{10}$/)) {
      return true;
    } else return false;
  };

  const checkSubmit = () => {
    if (
      validateEmail(email) &&
      validatePassword(password) &&
      validatePassword(confirmPassword) &&
      validateMobile(mobile) &&
      password === confirmPassword
    ) {
      return true;
    } else return false;
  };

  return (
    <View style={styles.mainContainer}>
      <Header otp />

      {/* content section */}
      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView style={{flexGrow: 1}} behavior="padding">
          <View style={styles.spacer} />
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.createAcctTitleTxt}>Create a new account</Text>

          {/* input section */}
          <View style={styles.inputRow}>
            <UserIcon />
            <TextInput
              placeholder="Email Id"
              style={styles.inputTxt}
              placeholderTextColor={defaultTheme.midGray}
              onChangeText={input => handleEmail(input)}
              value={email}
              autoCorrect={false}
              keyboardType={'email-address'}
            />
          </View>
          <View style={styles.inputRow}>
            <MobileIcon />
            <TextInput
              placeholder="Mobile Number"
              style={styles.inputTxt}
              placeholderTextColor={defaultTheme.midGray}
              onChangeText={input => handleMobile(input)}
              value={mobile}
              keyboardType={'phone-pad'}
            />
          </View>
          <View style={styles.inputRow}>
            <PasswordIcon />
            <TextInput
              placeholder="Password"
              style={styles.inputTxt}
              placeholderTextColor={defaultTheme.midGray}
              onChangeText={input => handlePassword(input)}
              value={password}
              secureTextEntry={true}
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
            />
          </View>

          {/* buttons section */}

          <View style={styles.signInRow}>
            <TouchableOpacity
              style={
                checkSubmit() ? styles.signInBtn : styles.signInBtnDisabled
              }
              onPress={() => navigation.navigate(RouteNames.CHOOSE_METHOD)}>
              <Text style={styles.signInTxt}>SIGN UP</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.createAcctRow}>
            <Text style={styles.createAcctTxt}>Existing User? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(RouteNames.LOGIN)}>
              <Text style={styles.createAcctBtnTxt}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  spacer: {
    marginBottom: 40,
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
    marginBottom: 110,
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
});

export default SignUp;

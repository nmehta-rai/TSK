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
import ArrowIcon from '../../assets/svgs/forgotPassword/arrow.svg';
import {useNavigation} from '@react-navigation/native';
import {RouteNames} from '../../constants/RouteNames';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const handleEmail = input => {
    setEmail(input);
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

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.safeArea}>
        <Header otp={true} />
        <View style={styles.spacer} />

        {/* content section */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Forgot Password</Text>

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
              autoComplete="off"
              autoCapitalize={'none'}
            />
          </View>

          {/* buttons section */}
          <View style={styles.signInRow}>
            <TouchableOpacity
              style={
                validateEmail(email)
                  ? styles.signInBtn
                  : styles.signInBtnDisabled
              }
              disabled={validateEmail(email) ? false : true}
              onPress={() => navigation.navigate(RouteNames.CHOOSE_METHOD)}>
              <Text style={styles.signInTxt}>NEXT</Text>
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
});

export default ForgotPassword;

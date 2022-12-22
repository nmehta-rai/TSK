import React, {useState, useEffect} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import {RouteNames} from '../../constants/RouteNames';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Header from '../../components/header';
import ArrowIcon from '../../assets/svgs/forgotPassword/arrow.svg';
import {CommonActions} from '@react-navigation/native';

const OTP = ({route}) => {
  const navigation = useNavigation();

  const handleSubmit = () => {
    if (route) {
      if (route.params.stage === 'login') {
        // navigation.navigate(RouteNames.ROOT_NAV, RouteNames.HOME_STACK_NAV);
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
        );
      } else if (route.params.stage === 'signUp') {
        // navigation.navigate(RouteNames.NEW_PASSWORD);
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [
              {
                name: RouteNames.NEW_PASSWORD,
              },
            ],
          }),
        );
      }
    }
  };

  const [otp, setOtp] = useState();
  const otpFilled = otp => {
    if (otp && otp.length >= 4) {
      return true;
    } else {
      return false;
    }
  };

  const renderBackBtn = () => {
    if (route) {
      if (route.params.stage === 'login') {
        return null;
      } else if (route.params.stage === 'signUp') {
        return (
          <View style={styles.createAcctRow}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backBtnRow}>
              <ArrowIcon />
              <Text style={styles.createAcctBtnTxt}>Back</Text>
            </TouchableOpacity>
          </View>
        );
      }
    }
  };

  //otp timer
  const [seconds, setSeconds] = useState(59);
  const [isActive, setIsActive] = useState(true);

  const resetTimer = () => {
    setSeconds(59);
    setIsActive(true);
  };

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        if (seconds > 10) {
          setSeconds(seconds => seconds - 1);
        } else {
          setSeconds(seconds => `0${seconds - 1}`);
        }
      }, 1000);
    } else if (seconds == 0) {
      setIsActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <View style={styles.mainContainer}>
      <Header otp={true} />

      {/* content section */}
      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={{flexGrow: 0.8, flex: 1}}>
        <KeyboardAvoidingView style={styles.keyboardView} behavior="padding">
          <View style={styles.spacer} />
          <Text style={styles.title}>OTP Verification</Text>
          <Text style={styles.createAcctTitleTxt}>
            OTP sent to +91 ******9867
          </Text>

          {/* OTP section */}
          <View style={styles.otpSectionContainer}>
            <View style={styles.otpRow}>
              <View style={styles.otpContainer}>
                <OTPInputView
                  pinCount={4}
                  codeInputFieldStyle={styles.otpInput}
                  autoFocusOnLoad
                  onCodeFilled={otp => setOtp(otp)}
                />
              </View>
            </View>
            <View style={styles.timerRow}>
              <View style={styles.timerCol}>
                <Text style={styles.timerTxt}>00 : {seconds}</Text>
              </View>
            </View>

            <View style={styles.didntRecieveRow}>
              <View style={styles.didntRecieveCol}>
                <Text style={styles.didntRecieveTxt}>Didn’t receive Otp?</Text>
                <TouchableOpacity
                  disabled={isActive ? true : false}
                  onPress={() => resetTimer()}>
                  <Text
                    style={
                      isActive
                        ? styles.resendOtpTxtInactive
                        : styles.resendOtpTxt
                    }>
                    Resend OTP
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* buttons section */}
          <View style={styles.signInRow}>
            <TouchableOpacity
              style={
                otpFilled(otp) ? styles.signInBtn : styles.signInBtnDisabled
              }
              disabled={otpFilled(otp) ? false : true}
              onPress={() => {
                handleSubmit();
              }}>
              <Text style={styles.signInTxt}>NEXT</Text>
            </TouchableOpacity>
          </View>
          {renderBackBtn()}
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
    flex: 0.15,
  },
  contentContainer: {
    marginHorizontal: 25,
  },
  title: {
    color: defaultTheme.darkGray,
    fontFamily: defaultTheme.familyMedium,
    fontSize: defaultTheme.fontSizeLargeDisplay,
    marginBottom: 15,
  },
  signInRow: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 25,
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
  createAcctTitleTxt: {
    fontFamily: defaultTheme.familyRegular,
    fontSize: defaultTheme.fontSizeBody,
    fontWeight: '500',
    color: defaultTheme.midGray,
    marginBottom: 20,
  },
  otpSectionContainer: {
    flex: 0.6,
    justifyContent: 'center',
  },
  otpInput: {
    backgroundColor: defaultTheme.lightGray,
    width: 30,
    height: 40,
    color: defaultTheme.darkGray,
    fontFamily: defaultTheme.familyMedium,
    fontSize: defaultTheme.fontSizeLargeDisplay,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',

    flex: 0.2,
  },
  otpContainer: {
    flex: 0.5,
    alignItems: 'center',
  },
  timerTxt: {
    color: defaultTheme.midBlue,
    fontFamily: defaultTheme.familyRegular,
    fontSize: defaultTheme.fontSizeBody,
    fontWeight: '500',
  },
  timerRow: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 25,
  },
  timerCol: {
    flex: 0.725,
    alignItems: 'flex-end',
  },
  didntRecieveRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  didntRecieveCol: {
    alignItems: 'center',
  },
  didntRecieveTxt: {
    color: defaultTheme.midGray,
    fontFamily: defaultTheme.familyRegular,
    fontSize: defaultTheme.fontSizeSubheading,
    fontWeight: '400',
    marginBottom: 10,
  },
  resendOtpTxt: {
    color: defaultTheme.midBlue,
    fontFamily: defaultTheme.familyRegular,
    fontSize: defaultTheme.fontSizeSubheading,
    fontWeight: '500',
  },
  resendOtpTxtInactive: {
    color: defaultTheme.midBlue,
    fontFamily: defaultTheme.familyRegular,
    fontSize: defaultTheme.fontSizeSubheading,
    fontWeight: '500',
    opacity: 0.3,
  },
  createAcctRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  backBtnRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  createAcctBtnTxt: {
    fontFamily: defaultTheme.familyRegular,
    fontSize: defaultTheme.fontSizeSubheading,
    fontWeight: '500',
    color: defaultTheme.midBlue,
    marginLeft: 2,
  },
  keyboardView: {
    flex: 1,
  },
});

export default OTP;

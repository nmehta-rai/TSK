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
import DrawerScreenHeader from '../../components/DrawerScreenHeader';
import {useLang} from '../../contexts/languageContext';

const ChangePassword = () => {
  const navigation = useNavigation();
  const langContext = useLang(useLang);
  const {dictionary, userLanguageChange} = langContext;

  const [password, setPassword] = useState('');
  const handlePassword = input => {
    setPassword(input);
  };
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleConfirmPassword = input => {
    setConfirmPassword(input);
  };
  const [oldPassword, setOldPassword] = useState('');
  const handleOldPassword = input => {
    setOldPassword(input);
  };

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.safeArea}>
        <DrawerScreenHeader screenName={dictionary.changePasswordTitle} />
        <View style={styles.spacer} />

        {/* content section */}
        <View style={styles.contentContainer}>
          {/* input section */}
          <View style={styles.inputRow}>
            <PasswordIcon />
            <TextInput
              placeholder="Old Password"
              style={styles.inputTxt}
              placeholderTextColor={defaultTheme.midGray}
              onChangeText={input => handleOldPassword(input)}
              value={oldPassword}
              secureTextEntry={true}
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
              style={styles.signInBtn}
              onPress={() =>
                // navigation.navigate(
                //   RouteNames.ROOT_NAV,
                //   RouteNames.HOME_STACK_NAV,
                // )
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
    flex: 0.025,
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
    marginTop: 25,
  },
  signInBtn: {
    backgroundColor: defaultTheme.grayBlue,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 2,
    marginTop: 20,
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

export default ChangePassword;

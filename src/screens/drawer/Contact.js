import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import DrawerScreenHeader from '../../components/DrawerScreenHeader';
import {useLang} from '../../contexts/languageContext';
import {defaultTheme} from '../../themes/Themes';

const Contact = () => {
  const langContext = useLang(useLang);
  const {dictionary, userLanguageChange} = langContext;
  return (
    <View style={styles.mainContainer}>
      <DrawerScreenHeader screenName={dictionary.contactsTitle} />
      <View style={styles.contentContainer}>
        <Text style={styles.titleTxt}>
          TSK Prufsystemsfur elekrrische Komponenten Gmbh
        </Text>
        <Text style={styles.subHeadingTxt}>Sterengelrott 4</Text>
        <Text style={styles.regularTxt}>D-32457 Porta Westfalica</Text>
        <Text style={styles.regularTxt}>Fon: ++49 (0) 571 79 58 0</Text>
        <Text style={styles.regularTxt}>Fac: ++49 (0) 571 79 58 40</Text>
        <Text style={styles.regularTxt}>E-mail: info.pwf@komaxgroup.com</Text>
        <Text style={styles.regularTxt}>Internet: www.t-s-k.de</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 15,
    paddingHorizontal: 22,
    marginTop: 15,
  },
  titleTxt: {
    fontSize: defaultTheme.fontSizeBodyLarge,
    fontFamily: defaultTheme.familyRegular,
    fontWeight: '500',
    color: defaultTheme.darkGray,
    marginBottom: 25,
    marginTop: 10,
  },
  subHeadingTxt: {
    fontSize: defaultTheme.fontSizeBodyLarge,
    fontFamily: defaultTheme.familyRegular,
    fontWeight: '400',
    color: defaultTheme.darkGray,
    marginBottom: 17,
  },
  regularTxt: {
    fontSize: defaultTheme.fontSizeBodyLarge,
    fontFamily: defaultTheme.familyRegular,
    fontWeight: '400',
    color: defaultTheme.darkGray,
    marginBottom: 10,
  },
});

export default Contact;

import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import DrawerScreenHeader from '../../components/DrawerScreenHeader';
import {useLang} from '../../contexts/languageContext';
import {defaultTheme} from '../../themes/Themes';

const Imprint = () => {
  const langContext = useLang(useLang);
  const {dictionary, userLanguageChange} = langContext;
  return (
    <View style={styles.mainContainer}>
      <DrawerScreenHeader screenName={dictionary.imprintTitle} />
      <View style={styles.contentContainer}>
        {/* section */}
        <Text style={styles.titleTxt}>
          TSK Prufsystemsfur elekrrische Komponenten Gmbh
        </Text>
        <Text style={styles.subHeadingTxt}>Sterengelrott 4</Text>
        <Text style={styles.regularTxt}>D-32457 Porta Westfalica</Text>
        <Text style={styles.regularTxt}>Fon: ++49 (0) 571 79 58 0</Text>
        <Text style={styles.regularTxt}>Fac: ++49 (0) 571 79 58 40</Text>
        <Text style={styles.regularTxt}>E-mail: info.pwf@komaxgroup.com</Text>
        <Text style={styles.regularTxt}>Internet: www.t-s-k.de</Text>

        {/* section */}
        <Text style={styles.titleTwoTxt}>
          Vertretungsberechtigts Geschaftuhrer:
        </Text>
        <Text style={styles.subHeadingTwoTxt}>
          Marcus Setterberg, Matthias Otte, Andreas Wolfisberg
        </Text>

        {/* section */}
        <Text style={styles.titleTwoTxt}>Zustandiges Amtsgericht:</Text>
        <Text style={styles.subHeadingTwoTxt}>AG Bad Oeynhausen HRB 4815</Text>

        {/* section */}
        <Text style={styles.titleTwoTxt}>USt-Ident-NR:</Text>
        <Text style={styles.subHeadingTwoTxt}>DE 811 569 893</Text>

        {/* section */}
        <Text style={styles.titleTwoTxt}>
          Inhaltlich verantwortlicher gemab s 10 Abstz 3 MDStv:
        </Text>
        <Text style={styles.subHeadingTwoTxt}>Andreas Wolfisberg</Text>
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
  titleTwoTxt: {
    fontSize: defaultTheme.fontSizeBodyLarge,
    fontFamily: defaultTheme.familyRegular,
    fontWeight: '500',
    color: defaultTheme.darkGray,
    marginBottom: 15,
    marginTop: 10,
  },
  subHeadingTwoTxt: {
    fontSize: defaultTheme.fontSizeBodyLarge,
    fontFamily: defaultTheme.familyRegular,
    fontWeight: '400',
    color: defaultTheme.darkGray,
    marginBottom: 25,
  },
});

export default Imprint;

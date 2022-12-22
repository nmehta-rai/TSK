import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import DrawerScreenHeader from '../../components/DrawerScreenHeader';
import DownArrow from '../../assets/svgs/settingsScreen/downArrow.svg';
import {defaultTheme} from '../../themes/Themes';
import {useLang} from '../../contexts/languageContext';

const Settings = () => {
  const langContext = useLang(useLang);
  const {dictionary, userLanguageChange} = langContext;
  const [languages, setLanguages] = useState([
    {name: 'en', selected: true},
    {name: 'de', selected: false},
    {name: 'cn', selected: false},
    {name: 'fr', selected: false},
    {name: 'es', selected: false},
  ]);

  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleSelectLanguage = lang => {
    userLanguageChange(lang);
    console.log('langContext: ', langContext);

    const languagesCopy = [...languages];
    languagesCopy.forEach(element => {
      if (element.name === lang) {
        element.selected = true;
        setSelectedLanguage(element.name);
      } else {
        element.selected = false;
      }
    });

    setLanguages(languagesCopy);
  };

  const LanguageItem = (lang, selected) => {
    return (
      <TouchableOpacity
        style={styles.languageItemRow}
        onPress={() => handleSelectLanguage(lang)}>
        <View
          style={selected ? styles.selectedOuterCircle : styles.outerCircle}>
          {selected ? <View style={styles.selectedInnerCircle} /> : null}
        </View>
        <Text
          style={
            selected ? styles.languageTxtSelected : styles.languageNotSelected
          }>
          {lang}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <DrawerScreenHeader screenName={dictionary.settingsTitle} />
      <View style={styles.contentContainer}>
        {/* language row section */}
        <View style={styles.languageRow}>
          <Text style={styles.languageTxt}>Language in {selectedLanguage}</Text>
          {/* <DownArrow /> */}
        </View>

        {/* language selector row */}
        <View style={styles.languageSelectorRow}>
          {/* en */}
          {LanguageItem(languages[0].name, languages[0].selected)}
          {LanguageItem(languages[1].name, languages[1].selected)}
          {LanguageItem(languages[2].name, languages[2].selected)}
          {LanguageItem(languages[3].name, languages[3].selected)}
          {LanguageItem(languages[4].name, languages[4].selected)}

          {/* //? */}
        </View>
        <Text style={styles.versionTitleTxt}>Version</Text>
        <Text style={styles.versionTxt}>2.2.3</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    marginBottom: 27,
  },
  languageTxt: {
    color: defaultTheme.darkGray,
    fontFamily: defaultTheme.familyRegular,
    fontWeight: '500',
  },
  languageSelectedTxt: {
    color: defaultTheme.darkGray,
    fontFamily: defaultTheme.familyRegular,
    fontWeight: '600',
  },
  languageSelectorRow: {
    flexDirection: 'row',
    marginLeft: 3,
    marginBottom: 27,
  },
  selectedInnerCircle: {
    height: 6,
    width: 6,
    borderRadius: 3,
    backgroundColor: defaultTheme.midBlue,
  },
  selectedOuterCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    borderColor: defaultTheme.midBlue,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  outerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    borderColor: defaultTheme.darkGray,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  languageItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  versionTitleTxt: {
    color: defaultTheme.darkGray,
    fontFamily: defaultTheme.familyRegular,
    fontWeight: '500',
    marginBottom: 10,
  },
  versionTxt: {
    color: defaultTheme.darkGray,
    fontFamily: defaultTheme.familyRegular,
    fontWeight: '400',
  },
});

export default Settings;

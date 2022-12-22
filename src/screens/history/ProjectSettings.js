import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {defaultTheme} from '../../themes/Themes';
import {useNavigation} from '@react-navigation/native';
import {RouteNames} from '../../constants/RouteNames';
import ForwardArrow from '../../assets/svgs/qrHistory/forwardArrow.svg';
import {useCurrentTag} from '../../contexts/currentTagContext';
import {useLang} from '../../contexts/languageContext';

const ProjectSettings = () => {
  const navigation = useNavigation();
  const currentTagContext = useCurrentTag(useCurrentTag);
  const {decodedData, saveDecodedData} = currentTagContext;

  const [xCode, setXCode] = useState('');
  const [yCoordinate, setYCoordinate] = useState('');
  const [xCoordinate, setXCoordinate] = useState('');
  const [sysNumber, setsysNumber] = useState('');
  const [tblNumber, setTblNumber] = useState('');

  const langContext = useLang(useLang);
  const {dictionary, userLanguageChange} = langContext;

  const handleInputTxt = (title, value) => {
    if (title === 'XCode') {
      setXCode(value);
    } else if (title === 'Y Coordinate') {
      setYCoordinate(value);
    } else if (title === 'X Coordinate') {
      setXCoordinate(value);
    } else if (title === 'System Number') {
      setsysNumber(value);
    } else if (title === 'Table Number') {
      setTblNumber(value);
    }
  };

  const inputRow = (title, value, chars) => {
    return (
      <View>
        <Text style={styles.remarkTitle}>{title}</Text>
        <TextInput
          style={styles.remarkInput}
          placeholder={'Value...'}
          multiline={true}
          value={value}
          maxLength={chars}
          onChangeText={text => handleInputTxt(title, text)}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View style={styles.divider} />
        <View style={styles.charsLeftRow}>
          <Text style={styles.charsLeft}>
            {value.length} / {chars}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
      pagingEnabled={true}>
      {/* content section */}
      <View style={styles.contentContainer}>
        <Text style={styles.mainTitle}>{dictionary.projectSettingsLabel}</Text>
        <Text style={styles.title}>Module No</Text>
        <Text style={styles.createAcctTitleTxt}>
          {decodedData &&
            decodedData.barcodeData.tskSwitches &&
            decodedData.barcodeData.tskSwitches.get('mo')}
        </Text>

        {/* input section */}
        <View>
          {inputRow(dictionary.xCode, xCode, 50)}
          <View style={styles.remarkRow}>
            <View style={styles.remarkCol}>
              {inputRow(dictionary.xCoordinate, xCoordinate, 2)}
            </View>
            <View style={styles.spacer} />
            <View style={styles.remarkCol}>
              {inputRow(dictionary.yCoordinate, yCoordinate, 2)}
            </View>
          </View>
          {inputRow(dictionary.sysNumber, sysNumber, 50)}
          {inputRow(dictionary.tableNumber, tblNumber, 50)}
        </View>

        {/* button */}
        <View style={styles.signInRow}>
          <TouchableOpacity
            style={styles.signInBtn}
            onPress={() => navigation.goBack()}>
            <Text style={styles.signInTxt}>SAVE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 25,
  },
  contentContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  title: {
    color: defaultTheme.darkGray,
    fontFamily: defaultTheme.familyMedium,
    fontSize: defaultTheme.fontSizeTitle,
    fontWeight: '500',
    marginBottom: 8,
  },
  createAcctTitleTxt: {
    fontFamily: defaultTheme.familyRegular,
    fontSize: defaultTheme.fontSizeSubDisplay,
    fontWeight: '500',
    color: defaultTheme.midBlue,
    marginBottom: 20,
  },
  mainTitle: {
    fontFamily: defaultTheme.familyRegular,
    fontSize: defaultTheme.fontSizeTitle,
    color: defaultTheme.midBlue,
    fontWeight: '500',
    marginBottom: 18,
    letterSpacing: 1.055,
  },
  tskDirectTxt: {
    fontFamily: defaultTheme.familyRegular,
    fontSize: defaultTheme.fontSizeTitle,
    color: defaultTheme.midBlue,
    fontWeight: '500',
    letterSpacing: 1.055,
  },
  btnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingRight: 5,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(77, 78, 77, 0.2)',
    flexDirection: 'row',
    marginBottom: 15,
  },
  //////////////////////
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
  charsLeftRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  charsLeft: {
    color: defaultTheme.midGray,
    fontFamily: defaultTheme.familyRegular,
    fontSize: defaultTheme.fontSizeCaptionSmall,
    fontWeight: '400',
  },
  remarkTitle: {
    color: defaultTheme.midGray,
    fontFamily: defaultTheme.familyRegular,
    fontSize: defaultTheme.fontSizeBody,
    fontWeight: '400',
    marginBottom: 14,
  },
  remarkInput: {
    fontFamily: defaultTheme.familyRegular,
    fontSize: defaultTheme.fontSizeBody,
    fontWeight: '400',
    marginBottom: 15,
  },
  remarkRow: {
    flexDirection: 'row',
  },
  remarkCol: {
    flex: 0.45,
  },
  spacer: {
    flex: 0.1,
  },
});

export default ProjectSettings;

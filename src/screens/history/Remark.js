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
import NfcManager, {NfcTech, Ndef} from 'react-native-nfc-manager';
import {useLang} from '../../contexts/languageContext';

const Remark = () => {
  const [remark, setRemark] = useState('');

  async function writeNdef({type, value}) {
    let result = false;

    try {
      // STEP 1
      await NfcManager.requestTechnology(NfcTech.Ndef);

      const bytes = Ndef.encodeMessage([Ndef.textRecord('Hello NFC')]);

      if (bytes) {
        await NfcManager.ndefHandler // STEP 2
          .writeNdefMessage(bytes); // STEP 3
        result = true;
      }

      console.log('Successfully wrote to NFC!');
    } catch (ex) {
      console.warn(ex);
    } finally {
      // STEP 4

      NfcManager.cancelTechnologyRequest();
    }

    return result;
  }

  const navigation = useNavigation();

  const currentTagContext = useCurrentTag(useCurrentTag);
  const {decodedData, saveDecodedData} = currentTagContext;

  const langContext = useLang(useLang);
  const {dictionary, userLanguageChange} = langContext;

  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}>
      {/* content section */}
      <View style={styles.contentContainer}>
        <Text style={styles.mainTitle}>{dictionary.remarkTitle}</Text>
        <Text style={styles.title}>{dictionary.moduleNumber}</Text>
        <Text style={styles.createAcctTitleTxt}>
          {decodedData &&
            decodedData.barcodeData.tskSwitches &&
            decodedData.barcodeData.tskSwitches.get('mo')}
        </Text>

        {/* info section 1 */}
        <View>
          <Text style={styles.remarkTitle}>{dictionary.remarkTitle}</Text>
          <TextInput
            style={styles.remarkInput}
            placeholder={dictionary.typePlaceholder}
            multiline={true}
            value={remark}
            maxLength={100}
            onChangeText={text => setRemark(text)}
          />
          <View style={styles.divider} />
          <View style={styles.charsLeftRow}>
            <Text style={styles.charsLeft}>{remark.length} / 100</Text>
          </View>
        </View>

        {/* button section */}
        <View style={styles.signInRow}>
          <TouchableOpacity style={styles.signInBtn} onPress={writeNdef}>
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
    paddingBottom: 35,
  },
  title: {
    color: defaultTheme.darkGray,
    fontFamily: defaultTheme.familyMedium,
    fontSize: defaultTheme.fontSizeTitle,
    fontWeight: '500',
    marginBottom: 10,
  },
  createAcctTitleTxt: {
    fontFamily: defaultTheme.familyRegular,
    fontSize: defaultTheme.fontSizeSubDisplay,
    fontWeight: '500',
    color: defaultTheme.midBlue,
    marginBottom: 15,
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
  tskBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(77, 78, 77, 0.2)',
    flexDirection: 'row',
    marginBottom: 6,
  },
  //////////////////////
  charsLeftRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
    marginBottom: 15,
  },
  remarkInput: {
    color: defaultTheme.midGray,
    fontFamily: defaultTheme.familyRegular,
    fontSize: defaultTheme.fontSizeBody,
    fontWeight: '500',
    marginBottom: 15,
  },
});

export default Remark;

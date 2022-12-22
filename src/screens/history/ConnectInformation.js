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

const ConnectInformation = () => {
  const navigation = useNavigation();
  const currentTagContext = useCurrentTag(useCurrentTag);
  const {decodedData, saveDecodedData} = currentTagContext;

  const langContext = useLang(useLang);
  const {dictionary, userLanguageChange} = langContext;

  const infoItemRow = (title, data) => {
    return (
      <View style={styles.infoItemRow}>
        <View style={styles.infoTitleCol}>
          <Text style={styles.infoTitleTxt}>{title}</Text>
        </View>
        <View style={styles.spacer} />
        <View style={styles.infoDataCol}>
          <Text style={styles.infoDataTxt}>{data}</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}>
      {/* content section */}
      <View style={styles.contentContainer}>
        <Text style={styles.mainTitle}>{dictionary.connectorInfoTitle}</Text>
        <Text style={styles.title}>{dictionary.moduleNumber}</Text>
        <Text style={styles.createAcctTitleTxt}>
          {decodedData &&
            decodedData.barcodeData.tskSwitches &&
            decodedData.barcodeData.tskSwitches.get('mo')}
        </Text>

        {/* info section 1 */}
        <View>
          {infoItemRow(
            dictionary.connectorNo,
            decodedData &&
              decodedData.barcodeData.tskSwitches &&
              decodedData.barcodeData.tskSwitches.get('cn'),
          )}
          {infoItemRow(
            dictionary.connectorTskNo,
            decodedData &&
              decodedData.barcodeData.tskSwitches &&
              decodedData.barcodeData.tskSwitches.get('tn'),
          )}
          {infoItemRow(
            dictionary.connectorAmtOfCavities,
            decodedData &&
              decodedData.barcodeData.tskSwitches &&
              decodedData.barcodeData.tskSwitches.get('cc'),
          )}
          {infoItemRow(
            dictionary.connectorAmtOfCavitiesTP,
            decodedData &&
              decodedData.barcodeData.tskSwitches &&
              decodedData.barcodeData.tskSwitches.get('ct'),
          )}
          {infoItemRow(
            dictionary.connectorTpsPerCavity,
            decodedData &&
              decodedData.barcodeData.tskSwitches &&
              decodedData.barcodeData.tskSwitches.get('tc'),
          )}
          {infoItemRow(
            dictionary.connectorTpsPerSwitch,
            decodedData &&
              decodedData.barcodeData.tskSwitches &&
              decodedData.barcodeData.tskSwitches.get('ts'),
          )}
          {infoItemRow(
            dictionary.connectorAirbagType,
            decodedData &&
              decodedData.barcodeData.tskSwitches &&
              decodedData.barcodeData.tskSwitches.get('ab'),
          )}
          {infoItemRow(
            dictionary.connectorFiberOpticType,
            decodedData &&
              decodedData.barcodeData.tskSwitches &&
              decodedData.barcodeData.tskSwitches.get('fo'),
          )}
          {infoItemRow(
            dictionary.connectorHighVoltageTest,
            decodedData &&
              decodedData.barcodeData.tskSwitches &&
              decodedData.barcodeData.tskSwitches.get('hv'),
          )}
        </View>
        <View style={styles.divider} />
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
    marginBottom: 15,
  },
  //////////////////////
  infoItemRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  infoTitleCol: {
    flex: 0.55,
  },
  infoDataCol: {
    flex: 0.25,
  },
  spacer: {
    flex: 0.2,
  },
  infoTitleTxt: {
    fontFamily: defaultTheme.familyRegular,
    fontSize: defaultTheme.fontSizeBody,
    color: defaultTheme.darkGray,
    fontWeight: '400',
  },
  infoDataTxt: {
    fontFamily: defaultTheme.familyRegular,
    fontSize: defaultTheme.fontSizeBody,
    color: defaultTheme.darkGray,
    fontWeight: '500',
  },
  /////////////
  tableRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  tableCol: {
    flex: 0.25,
  },
  tableTitleTxt: {
    fontFamily: defaultTheme.familyRegular,
    fontSize: defaultTheme.fontSizeCaption,
    color: defaultTheme.darkGray,
    fontWeight: '500',
  },
  tableColTxt: {
    fontFamily: defaultTheme.familyRegular,
    fontSize: defaultTheme.fontSizeCaption,
    color: defaultTheme.darkGray,
    fontWeight: '400',
  },
  tableTitleTxt2: {
    fontFamily: defaultTheme.familyRegular,
    fontSize: defaultTheme.fontSizeCaption,
    color: defaultTheme.darkGray,
    fontWeight: '500',
    marginBottom: 17,
  },
  tableColTxt2: {
    fontFamily: defaultTheme.familyRegular,
    fontSize: defaultTheme.fontSizeCaption,
    color: defaultTheme.darkGray,
    fontWeight: '400',
    marginBottom: 17,
  },
});

export default ConnectInformation;

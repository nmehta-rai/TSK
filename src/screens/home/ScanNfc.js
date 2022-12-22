import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import NfcManager, {NfcTech, Ndef, NfcEvents} from 'react-native-nfc-manager';
import NfcButton from '../../components/NfcButton';
import {defaultTheme} from '../../themes/Themes';
import {useNavigation} from '@react-navigation/native';
import {RouteNames} from '../../constants/RouteNames';
import {useCurrentTag} from '../../contexts/currentTagContext';
import {useLang} from '../../contexts/languageContext';

// Pre-step, call this before any NFC operations
NfcManager.start();
// LinkedHashMap<String, String> moduleData;
const ScanNfc = () => {
  const currentTagContext = useCurrentTag(useCurrentTag);
  const {saveDecodedData, saveRawData} = currentTagContext;
  var moduleData = new Map();
  var tskSwitchesLocal = new Map();
  const navigation = useNavigation();

  const langContext = useLang(useLang);
  const {dictionary, userLanguageChange} = langContext;

  // var headerData = {name: 'header', tskSwitches: new Map()};
  // var barcodeData = {name: 'barcode', tskSwitches: new Map()};
  // var factoryData = {name: 'factory', tskSwitches: new Map()};
  // var leakageData = {name: 'leakage', tskSwitches: new Map()};
  // var projectData = {name: 'project', tskSwitches: new Map()};
  // var statisticData = {name: 'statistic', tskSwitches: new Map()};
  // var remarksData = {name: 'remarks', tskSwitches: new Map()};

  var headerData = {};
  var barcodeData = {};
  var factoryData = {};
  var leakageData = {};
  var projectData = {};
  var statisticData = {};
  var remarksData = {};
  // protected TSKModuleTag headerData;
  // protected TSKModuleTag barcodeData;
  // protected TSKModuleTag factoryData;
  // protected TSKModuleTag leakageData;
  // protected TSKModuleTag projectData;
  // protected TSKModuleTag statisticData;
  // protected TSKModuleTag remarksData;

  let rawMessage;
  console.log('ScanNfc is called');
  // readNdef();
  function readNdef() {
    console.log('readNdef is called');

    const cleanUp = () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.setEventListener(NfcEvents.SessionClosed, null);
    };

    return new Promise(resolve => {
      console.log('Promise is called');

      let tagFound = null;
      console.log('TAG: ', 'inside resolve tsk');

      NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
        console.log('setEventListener is called');

        tagFound = tag;
        resolve(tagFound);
        // NfcManager.setAlertMessageIOS('NDEF tag found');
        console.log('TAG: ', 'tagFound next decode it');
        let payloadData;
        var fullString = '';
        if (tag.ndefMessage && tag.ndefMessage.length > 0) {
          const ndefRecord = tag.ndefMessage[0].payload;

          // rawMessage = Ndef.text.decodePayload(ndefRecord);
          rawMessage = `[header]ud=0;sh=1;mf=1
          [barcode]ft=ma;mo=999999999;mv=3;ms=100X100;sh=1;xa=1;tp=7;cn=E13716500;tn=109302690500;cc=7;ct=7;tc=2;ts=1;ab=T;fo=F;hv=0;sw=40449948;od=1059105;ps=2080;dt=30.07.2018;cu=602100;co=MI119420;cm=E13716500;mc=MS-540 E/A 3 BUE1 DE1 PR2;my=MS-540;tx=Test Modul;pt=113471
          [project]xc=XCode4;cx=ab;cy=32;sn=123;tr=1
          [factory]dm=12.12.2018;pp=DE;pl=113471>4<113477>2<112988>1
          [statistic]pc=000022;fc=000001;lc=000000
          [leakage]stp=1;std=2;stf=3;slt=4;
          [tracking]dc=20.05.2022;tc=132915;un=NNL;id=DE20PC085
          [remarks]fubar`;

          payloadData = `[header]ud=0;sh=1;mf=1
          [barcode]ft=ma;mo=999999999;mv=3;ms=100X100;sh=1;xa=1;tp=7;cn=E13716500;tn=109302690500;cc=7;ct=7;tc=2;ts=1;ab=T;fo=F;hv=0;sw=40449948;od=1059105;ps=2080;dt=30.07.2018;cu=602100;co=MI119420;cm=E13716500;mc=MS-540 E/A 3 BUE1 DE1 PR2;my=MS-540;tx=Test Modul;pt=113471
          [project]xc=XCode4;cx=ab;cy=32;sn=123;tr=1
          [factory]dm=12.12.2018;pp=DE;pl=113471>4<113477>2<112988>1
          [statistic]pc=000022;fc=000001;lc=000000
          [leakage]stp=1;std=2;stf=3;slt=4;
          [tracking]dc=20.05.2022;tc=132915;un=NNL;id=DE20PC085
          [remarks]fubar`;
          // payloadData = Ndef.text.decodePayload(ndefRecord);
          console.log('DecodedMessage', payloadData);
          Alert.alert('Success', 'Data read from nfc tag!');

          const payloadDataArrayAfterSplit = payloadData.split('\n');

          for (let i = 0; i < payloadDataArrayAfterSplit.length; i++) {
            let word = payloadDataArrayAfterSplit[i].trim();
            console.log('WORD : ', word);
            payloadDataArrayAfterSplit[i] = word;
            console.log(
              'i and length ',
              i + ' length ',
              payloadDataArrayAfterSplit.length,
            );
            if (i == payloadDataArrayAfterSplit.length - 1) {
              fullString = fullString + word + '[';
            } else {
              fullString = fullString + word;
            }
          }
          console.log('fullString > ', fullString);
        }
        let a = 0;
        var group = null;
        var values = null;
        while (true) {
          let f = fullString.indexOf('[', a);
          if (f == -1) break;
          console.log('TSKModuleData', 'f value' + f + '');
          if (a > 0 && group != null) {
            values = fullString.substring(a, f);

            moduleData[group] = values;
            console.log(
              'TSKModuleData Group' +
                ' <<<< ' +
                group +
                ' >>> ' +
                ' VALUE' +
                values,
            );

            addSwitches(group, values);
          }

          let e = fullString.indexOf(']', f);
          if (e == -1) break;
          console.log('TSKModuleData', 'e value' + e + '');

          group = fullString.substring(f + 1, e);
          console.log('TSKModuleData: ', 'group value ' + group);

          a = e + 1;
          console.log('TSKModuleData: ', 'a value ' + a + '');
        }
        NfcManager.unregisterTagEvent().catch(() => 0);
      });

      NfcManager.setEventListener(NfcEvents.SessionClosed, () => {
        cleanUp();
        if (!tagFound) {
          resolve();
        }
      });

      NfcManager.registerTagEvent();
    });
  }
  function addSwitches(group, rawData) {
    console.log('TAG', 'rawData in addSwitches > ' + rawData);
    tskSwitchesLocal = new Map();

    if (rawData != null) {
      // String[] valuesArray = TextUtils.split(rawData, ";");
      const valuesArray = rawData.split(';');

      if (valuesArray.length > 0) {
        for (let i = 0; i < valuesArray.length; i++) {
          var value = valuesArray[i];
          // for (String value : valuesArray) {
          let f = value.indexOf('=');
          if (f == -1) break;
          console.log('TAG', 'value > ' + value);
          var switchName = value.substring(0, f);
          var switchValue = value.substring(f + 1);

          if (switchName.length > 0) {
            console.log(
              '<switchName > ',
              switchName,
              '< switchValue > ',
              switchValue,
            );
            // tskSwitchesLocal[switchName] = switchValue;
            tskSwitchesLocal.set(switchName, switchValue);
            console.log('tskSwitchesLocal : ', tskSwitchesLocal);

            // addSwitch(switchName, switchValue);
          }
        }
        console.log('==============================================');
        console.log('For loop over rawData : ' + rawData);
        console.log('For loop over group :  ' + group);
        console.log(
          'tskSwitchesLocal map values 1' + [...tskSwitchesLocal.entries()],
        );
        console.log('tskSwitchesLocal map values 2 ' + tskSwitchesLocal);

        if (group == 'header') {
          console.log('inside header if :  ');

          headerData['tskSwitches'] = tskSwitchesLocal;
        }
        if (group == 'barcode') barcodeData['tskSwitches'] = tskSwitchesLocal;
        if (group == 'factory') factoryData['tskSwitches'] = tskSwitchesLocal;
        if (group == 'leakage') leakageData['tskSwitches'] = tskSwitchesLocal;
        if (group == 'project') projectData['tskSwitches'] = tskSwitchesLocal;
        if (group == 'statistic')
          statisticData['tskSwitches'] = tskSwitchesLocal;
        if (group == 'remarks') remarksData['tskSwitches'] = tskSwitchesLocal;
        if (headerData.hasOwnProperty('tskSwitches')) {
          console.log('headerData.tskSwitches ', headerData.tskSwitches);
          console.log(
            'headerData.tskSwitches.get ud',
            headerData.tskSwitches.get('ud'),
          );
          console.log(
            'headerData.tskSwitches.get sh',
            headerData.tskSwitches.get('sh'),
          );
        }
        if (barcodeData.hasOwnProperty('tskSwitches')) {
          console.log('barcodeData.tskSwitches ', barcodeData.tskSwitches);
        }
        if (statisticData.hasOwnProperty('tskSwitches')) {
          console.log('statisticData.tskSwitches ', statisticData.tskSwitches);
        }
      }

      console.log('-Values', rawData);
    }
    let decodedDataCopy = {};
    decodedDataCopy.headerData = headerData;
    decodedDataCopy.barcodeData = barcodeData;
    decodedDataCopy.factoryData = factoryData;
    decodedDataCopy.leakageData = leakageData;
    decodedDataCopy.statisticData = statisticData;
    decodedDataCopy.remarksData = remarksData;

    saveDecodedData(decodedDataCopy);
    saveRawData(rawMessage);
    navigation.navigate(RouteNames.QR_HISTORY);

    console.log('DECODED DATA FINAL: ', decodedDataCopy);

    // if (
    //   headerData &&
    //   barcodeData &&
    //   factoryData &&
    //   leakageData &&
    //   statisticData &&
    //   remarksData
    // ) {
    //   console.log('Barcode data you are sending', barcodeData);
    //   navigation.navigate(RouteNames.QR_HISTORY, {
    //     headerData: headerData,
    //     barcodeData: barcodeData,
    //     factoryData: factoryData,
    //     leakageData: leakageData,
    //     statisticData: statisticData,
    //     remarksData: remarksData,
    //   });
    // }
  }

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={() => readNdef()}>
        <NfcButton />
      </TouchableOpacity>
      <View style={styles.txtRow}>
        <View style={styles.txtCol}>
          <Text style={styles.nfcTxt}>{dictionary.scanNFCText}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 75,
  },
  nfcTxt: {
    fontSize: defaultTheme.fontSizeTitle,
    fontFamily: defaultTheme.familyRegular,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 75,
  },
  txtCol: {
    flex: 0.55,
  },
  txtRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  textContainer: {
    alignItems: 'center',
  },
});
const TSKModuleTag = {
  // data property
  name: '',
  information: '',
  tskSwitches: '',
};
export default ScanNfc;

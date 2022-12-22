import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import QrButton from '../../components/QrButton';
import {RouteNames} from '../../constants/RouteNames';
import {useScanQr} from '../../contexts/scanQrContext';
import {defaultTheme} from '../../themes/Themes';
import Realm from 'realm';
import {useLang} from '../../contexts/languageContext';
import {useCurrentTag} from '../../contexts/currentTagContext';
import {Ndef} from 'react-native-nfc-manager';

const StartQr = () => {
  const [qrStage, setQrStage] = useState(0);
  const navigation = useNavigation();
  const scanQrContext = useScanQr(useScanQr);
  const {moduleNum, rawData1, rawData2} = scanQrContext;

  const currentTagContext = useCurrentTag(useCurrentTag);
  const {saveDecodedData, saveRawData} = currentTagContext;

  const langContext = useLang(useLang);
  const {dictionary, userLanguageChange} = langContext;

  var moduleData = new Map();
  var tskSwitchesLocal = new Map();
  var headerData = {};
  var barcodeData = {};
  var factoryData = {};
  var leakageData = {};
  var projectData = {};
  var statisticData = {};
  var remarksData = {};
  let rawMessage;

  const ModuleSchema = {
    name: 'Module',
    properties: {
      _id: 'int',
      rawData: 'string?',
      rawData1: 'string?',
      rawData2: 'string?',
      type: 'string',
    },
    primaryKey: '_id',
  };

  // const saveModule = async () => {
  //   //Start realm
  //   const realm = await Realm.open({
  //     path: 'tskrealm',
  //     schema: [ModuleSchema],
  //   });

  //   //Check if module exists
  //   const modules = realm.objects('Module');
  //   const filteredModule = modules.filtered(`_id = ${moduleNum * 1}`);
  //   if (filteredModule.isEmpty()) {
  //     //No existing module save current scanned
  //     let mod;
  //     realm.write(() => {
  //       mod = realm.create('Module', {
  //         _id: moduleNum * 1,
  //         rawData1: JSON.stringify(rawData1.rawData),
  //         rawData2: JSON.stringify(rawData2.rawData),
  //         type: 'qr',
  //       });
  //       console.log(`saved module in DB: ${mod}`);
  //     });
  //   } else {
  //     console.log(
  //       `Module already exists: ${filteredModule.map(
  //         filteredModule => filteredModule._id,
  //       )}`,
  //     );
  //   }

  //   realm.close();
  // };

  useEffect(() => {
    if (rawData1) {
      setQrStage(1);
      console.log('THIS IS RAW DATA 1: ', rawData1.data);
    }
    if (rawData1 && rawData2) {
      setQrStage(2);
      console.log('THIS IS RAW DATA 2: ', rawData2.data);
      console.log('THIS IS COMBINED DATA: ', rawData1.data + rawData2.data);
      saveRawData(rawData1.data + rawData2.data);
      decodeMessage(rawData1.data + rawData2.data);
      // saveModule();
      // navigation.navigate(RouteNames.APP_HOME_STACK_NAV, {
      //   screen: RouteNames.HISTORY_STACK_SCREEN,
      //   params: {screen: RouteNames.QR_HISTORY},
      // }
      // );
    }
  }, [rawData1, rawData2]);

  const decodeMessage = payloadData => {
    console.log('THIS IS THE PAYLOAD DATA: ', payloadData);
    var fullString = '';

    const rawMessage = Ndef.text.decodePayload(payloadData);
    payloadData = Ndef.text.decodePayload(payloadData);
    console.log('DecodedMessage', payloadData);

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
  };

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
    console.log(
      'DDData you are sending',
      headerData,
      barcodeData,
      factoryData,
      leakageData,
      statisticData,
      remarksData,
    );
    // navigation.navigate(RouteNames.QR_HISTORY, {
    //   headerData: headerData,
    //   barcodeData: barcodeData,
    //   factoryData: factoryData,
    //   leakageData: leakageData,
    //   statisticData: statisticData,
    //   remarksData: remarksData,
    //   });
    // }
  }

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={() => navigation.navigate(RouteNames.SCAN_QR)}>
        <QrButton />
      </TouchableOpacity>

      <View style={styles.txtRow}>
        <View style={styles.txtCol}>
          <Text style={styles.nfcTxt}>
            {dictionary.scanQrText} {qrStage}/2
          </Text>
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
    flex: 0.4,
  },
  txtRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
});

export default StartQr;

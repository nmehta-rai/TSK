import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {defaultTheme} from '../../themes/Themes';
import {useNavigation} from '@react-navigation/native';
import {RouteNames} from '../../constants/RouteNames';
import ForwardArrow from '../../assets/svgs/qrHistory/forwardArrow.svg';
import NfcIcon from '../../assets/svgs/moduleHistory/nfcIcon.svg';
import QrIcon from '../../assets/svgs/moduleHistory/qrIcon.svg';
import Realm from 'realm';
import {Ndef} from 'react-native-nfc-manager';
import {useCurrentTag} from '../../contexts/currentTagContext';

const ModuleHistory = () => {
  const navigation = useNavigation();
  const [modList, setModList] = useState();
  const currentTagContext = useCurrentTag(useCurrentTag);
  const {saveDecodedData, saveRawData} = currentTagContext;

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

  const getModules = async () => {
    const realm = await Realm.open({
      path: 'tskrealm',
      schema: [ModuleSchema],
    });
    const mods = realm.objects('Module');
    let list = mods.map(mod => mod);
    setModList(list);
  };

  useEffect(() => {
    getModules();
  }, []);

  const deleteAllModules = async () => {
    const realm = await Realm.open({
      path: 'tskrealm',
      schema: [ModuleSchema],
    });

    const modules = realm.objects('Module');

    realm.write(() => {
      // Delete all history from realm.
      realm.deleteAll();
      console.log('Modules successfully deleted from the local db!');
    });

    setModList(null);

    realm.close();
  };

  const handleModulePress = async moduleNum => {
    const realm = await Realm.open({
      path: 'tskrealm',
      schema: [ModuleSchema],
    });
    // navigation.navigate(RouteNames.QR_HISTORY)
    console.log('THIS IS THE MODULE NUM: ', moduleNum);

    const modules = realm.objects('Module');
    const currentModule = modules.filtered(`_id = ${moduleNum}`);
    const rawFromDB = currentModule.map(current => current.rawData);
    console.log('RAW FROM DB: ', rawFromDB);
    decodeMessage(rawFromDB[0]);
  };

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

  const moduleItem = ({item}) => (
    <View key={item.key}>
      <TouchableOpacity
        style={styles.btnRow}
        onPress={() => handleModulePress(item._id)}>
        {item.type === 'qr' ? (
          <QrIcon style={styles.nfcIcon} />
        ) : (
          <NfcIcon style={styles.nfcIcon} />
        )}

        <Text style={styles.moduleTxt}>Module No. {item._id}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      style={styles.mainContainer}
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
      data={modList}
      renderItem={moduleItem}
      keyExtractor={({item}) => item}
      ListFooterComponent={() => (
        <TouchableOpacity onPress={deleteAllModules}>
          <Text>Clear</Text>
        </TouchableOpacity>
      )}
      ListFooterComponentStyle={{
        alignSelf: 'center',
        marginTop: 30,
      }}
    />
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
    marginVertical: 10,
  },
  tskBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(77, 78, 77, 0.18)',
    flexDirection: 'row',
    marginVertical: 15,
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
  nfcIcon: {
    marginRight: 21,
  },
  moduleTxt: {
    color: defaultTheme.darkGray,
    fontFamily: defaultTheme.familyRegular,
    fontSize: defaultTheme.fontSizeSubheading,
    fontWeight: '400',
  },
  listContainer: {
    marginTop: 8,
  },
});

export default ModuleHistory;

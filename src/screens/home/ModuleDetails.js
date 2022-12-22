import React, {useState, useEffect} from 'react';
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
import {useHistoryStack} from '../../contexts/historyStackContext';
import {CommonActions} from '@react-navigation/native';
import {useCurrentTag} from '../../contexts/currentTagContext';
import Realm from 'realm';
import {useLang} from '../../contexts/languageContext';

const ModuleDetails = () => {
  const navigation = useNavigation();
  const currentTagContext = useCurrentTag(useCurrentTag);
  const {decodedData, rawData} = currentTagContext;

  const langContext = useLang(useLang);
  const {dictionary, userLanguageChange} = langContext;

  //Realm code
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

  const saveModule = async () => {
    //Start realm
    const realm = await Realm.open({
      path: 'tskrealm',
      schema: [ModuleSchema],
    });

    //Check if module exists
    const modules = realm.objects('Module');
    const filteredModule = modules.filtered(
      `_id = ${decodedData.barcodeData.tskSwitches.get('mo') * 1}`,
    );
    if (filteredModule.isEmpty()) {
      //No existing module save current scanned
      let mod;
      realm.write(() => {
        mod = realm.create('Module', {
          _id: decodedData.barcodeData.tskSwitches.get('mo') * 1,
          rawData: rawData,
          type: 'nfc',
        });
        console.log(`saved module in DB: ${mod}`);
      });
    } else {
      console.log(
        `Module already exists: ${filteredModule.map(
          filteredModule => filteredModule._id,
        )}`,
      );
    }

    realm.close();
  };

  useEffect(() => {
    console.log('THIS IS THE RAW DATA TO SAVE: ', rawData);
    console.log(
      'THIS IS THE MODULE NUMBER: ',
      decodedData.barcodeData.tskSwitches.get('mo'),
    );
    saveModule();
  }, []);

  const infoBoxRow = (title, item) => {
    return (
      <View style={styles.infoBoxRow}>
        <View style={styles.infoTitleCol}>
          <Text style={styles.infoTitleTxt}>{title}</Text>
        </View>
        <View style={styles.infoItemCol}>
          <Text style={styles.infoDataTxt}>{item}</Text>
        </View>
      </View>
    );
  };

  const historyStackContext = useHistoryStack(useHistoryStack);
  const {changeCurrentScreen} = historyStackContext;

  const handleNavigation = title => {
    console.log('this is the titlee:: ', title);

    if (title === dictionary.moduleConfigTitle) {
      navigation.navigate(RouteNames.HISTORY_STACK_SCREEN, {
        screen: RouteNames.HISTORY_STACK_NAV,
        params: {
          screen: dictionary.moduleConfigTitle,
        },
      });
      changeCurrentScreen('mc');
    } else if (title === dictionary.orderDetailsTitle) {
      console.log('HIIHIHIH::', dictionary.orderDetailsTitle);
      navigation.navigate(RouteNames.HISTORY_STACK_SCREEN, {
        screen: RouteNames.HISTORY_STACK_NAV,
        params: {
          screen: dictionary.orderDetailsTitle,
        },
      });
      changeCurrentScreen('od');
    } else if (title === dictionary.connectorInfoTitle) {
      navigation.navigate(RouteNames.HISTORY_STACK_SCREEN, {
        screen: RouteNames.HISTORY_STACK_NAV,
        params: {
          screen: dictionary.connectorInfoTitle,
        },
      });
      changeCurrentScreen('ci');
    } else if (title === dictionary.projectSettingsLabel) {
      navigation.navigate(RouteNames.HISTORY_STACK_SCREEN, {
        screen: RouteNames.HISTORY_STACK_NAV,
        params: {
          screen: dictionary.projectSettingsLabel,
        },
      });
      changeCurrentScreen('ps');
    } else if (title === dictionary.MsfTitle) {
      navigation.navigate(RouteNames.HISTORY_STACK_SCREEN, {
        screen: RouteNames.HISTORY_STACK_NAV,
        params: {
          screen: dictionary.MsfTitle,
        },
      });
      changeCurrentScreen('msf');
    } else if (title === dictionary.remarkTitle) {
      changeCurrentScreen('r');
      navigation.navigate(RouteNames.HISTORY_STACK_SCREEN, {
        screen: RouteNames.HISTORY_STACK_NAV,
        params: {
          screen: dictionary.remarkTitle,
        },
      });
      changeCurrentScreen('r');
    }
  };

  const navigationRow = title => {
    return (
      <View
        style={
          title === 'Remark' ? styles.navigationRowRemark : styles.navigationRow
        }>
        <View style={styles.navigaitonInnerRow}>
          <View style={styles.navTitleCol}>
            <Text style={styles.infoTitleTxt}>{title}</Text>
          </View>
          <TouchableOpacity
            style={styles.navButtonCol}
            onPress={() => handleNavigation(title)}>
            <ForwardArrow />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={styles.scrollContentContainer}
      showsVerticalScrollIndicator={false}>
      {/* content section */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{dictionary.moduleNumber}</Text>
        <Text style={styles.createAcctTitleTxt}>
          {decodedData &&
            decodedData.barcodeData.tskSwitches &&
            decodedData.barcodeData.tskSwitches.get('mo')}
        </Text>

        {/* info Box */}
        <View style={styles.infoBoxContainer}>
          {infoBoxRow(
            `${dictionary.customersMaterialNo}`,
            decodedData &&
              decodedData.barcodeData.tskSwitches &&
              decodedData.barcodeData.tskSwitches.get('cm'),
          )}
          {infoBoxRow(
            `${dictionary.connectorNo}`,
            decodedData &&
              decodedData.barcodeData.tskSwitches &&
              decodedData.barcodeData.tskSwitches.get('cn'),
          )}
          {infoBoxRow(dictionary.xCode, '')}
          {infoBoxRow(dictionary.xCoordinate, '')}
          {infoBoxRow(dictionary.yCoordinate, '')}
        </View>

        {/* navigation section */}
        <View>
          {navigationRow(dictionary.moduleConfigTitle)}
          {navigationRow(dictionary.orderDetailsTitle)}
          {navigationRow(dictionary.connectorInfoTitle)}
          {navigationRow(dictionary.projectSettingsLabel)}
          {navigationRow(dictionary.MsfTitle)}
          {navigationRow(dictionary.remarkTitle)}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexGrow: 1,
    padding: 25,
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 35,
  },
  title: {
    color: defaultTheme.darkGray,
    fontFamily: defaultTheme.familyMedium,
    fontSize: defaultTheme.fontSizeTitle,
    marginBottom: 10,
    fontWeight: '500',
  },
  createAcctTitleTxt: {
    fontFamily: defaultTheme.familyRegular,
    fontSize: defaultTheme.fontSizeSubDisplay,
    fontWeight: '500',
    color: defaultTheme.midBlue,
    marginBottom: 12,
  },
  infoBoxRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginVertical: 7.5,
  },
  infoBoxContainer: {
    backgroundColor: defaultTheme.lightGray,
    paddingVertical: 10,
    marginBottom: 20,
  },
  infoTitleCol: {
    flex: 0.7,
  },
  infoItemCol: {
    flex: 0.3,
  },
  navigationRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(118, 122, 124, 0.2)',
  },
  navigationRowRemark: {
    flexDirection: 'row',
  },
  navigaitonInnerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    marginVertical: 15,
  },
  navTitleCol: {},
  navButtonCol: {
    marginRight: 15,
  },
  infoTitleTxt: {
    fontFamily: defaultTheme.familyRegular,
    fontSize: defaultTheme.fontSizeBody,
    fontWeight: '400',
    color: defaultTheme.darkGray,
  },
  infoDataTxt: {
    fontFamily: defaultTheme.familyMedium,
    fontSize: defaultTheme.fontSizeBody,
    fontWeight: '500',
    color: defaultTheme.midGray,
  },
});

export default ModuleDetails;

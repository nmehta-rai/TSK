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
import {useLang} from '../../contexts/languageContext';
import {useHistoryStack} from '../../contexts/historyStackContext';
import {useCurrentTag} from '../../contexts/currentTagContext';

const ModuleConfiguration = () => {
  const navigation = useNavigation();

  const langContext = useLang(useLang);
  const {dictionary, userLanguageChange} = langContext;

  const historyStackContext = useHistoryStack(useHistoryStack);
  const {currentScreen, changeCurrentScreen} = historyStackContext;

  const currentTagContext = useCurrentTag(useCurrentTag);
  const {decodedData, saveDecodedData} = currentTagContext;

  // console.log('<><><><><><>', decodedData.barcodeData.tskSwitches.get('my'));

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

  const tableRow = (swit, abbrev, moa, support) => {
    return (
      <>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableColTxt}>{swit}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableColTxt}>{abbrev}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableColTxt}>{moa}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableColTxt}>{support}</Text>
          </View>
        </View>
        <View style={styles.divider} />
      </>
    );
  };

  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}>
      {/* content section */}
      <View style={styles.contentContainer}>
        <Text style={styles.mainTitle}>{dictionary.moduleConfigTitle}</Text>
        <Text style={styles.title}>{dictionary.moduleNumber}</Text>
        <Text style={styles.createAcctTitleTxt}>
          {decodedData &&
            decodedData.barcodeData.tskSwitches &&
            decodedData.barcodeData.tskSwitches.get('mo')}
        </Text>

        {/* TSK Direct Button */}
        <View style={styles.tskBtnSection}>
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.btnRow}
            onPress={() => {
              navigation.navigate(RouteNames.APP_HOME_STACK_NAV, {
                screen: RouteNames.HISTORY_STACK_SCREEN,
                params: {screen: RouteNames.KOMAX_DIRECT},
              });
              changeCurrentScreen('komax');
            }}>
            <Text style={styles.tskDirectTxt}>{dictionary.tskDirectTitle}</Text>
            <View style={styles.tskBtn}>
              <ForwardArrow />
            </View>
          </TouchableOpacity>
          <View style={styles.divider} />
        </View>
        {/* info section 1 */}
        <View>
          {infoItemRow(dictionary.tskDirectText, '')}
          {infoItemRow(
            dictionary.moduleSystem,
            decodedData &&
              decodedData.barcodeData.tskSwitches &&
              decodedData.barcodeData.tskSwitches.get('my'),
          )}
          {infoItemRow(
            dictionary.moduleVersion,
            decodedData &&
              decodedData.barcodeData.tskSwitches &&
              decodedData.barcodeData.tskSwitches.get('mv'),
          )}
          {infoItemRow(
            dictionary.moduleSize,
            decodedData &&
              decodedData.barcodeData.tskSwitches &&
              decodedData.barcodeData.tskSwitches.get('ms'),
          )}
          {infoItemRow(
            dictionary.modAmountofShapes,
            decodedData &&
              decodedData.barcodeData.tskSwitches &&
              decodedData.barcodeData.tskSwitches.get('sh'),
          )}
          {infoItemRow(
            dictionary.modAmtCTP,
            decodedData &&
              decodedData.barcodeData.tskSwitches &&
              decodedData.barcodeData.tskSwitches.get('tp'),
          )}
        </View>
        <View style={styles.divider} />

        {/* info section 2 */}
        <View>
          {infoItemRow(
            dictionary.dateOfManufacture,
            decodedData &&
              decodedData.barcodeData.tskSwitches &&
              decodedData.barcodeData.tskSwitches.get('dt'),
          )}
          {infoItemRow(
            dictionary.placeOfProduction,
            decodedData &&
              decodedData.factoryData.tskSwitches &&
              decodedData.factoryData.tskSwitches.get('pp'),
          )}
          {infoItemRow(
            dictionary.testPinArticleNumber,
            decodedData &&
              decodedData.factoryData.tskSwitches &&
              decodedData.factoryData.tskSwitches.get('pm'),
          )}
          {infoItemRow(
            dictionary.powerOnCounter,
            decodedData &&
              decodedData.statisticData.tskSwitches &&
              decodedData.statisticData.tskSwitches.get('pc'),
          )}
          {infoItemRow(
            dictionary.fixingCounter,
            decodedData &&
              decodedData.statisticData.tskSwitches &&
              decodedData.statisticData.tskSwitches.get('fc'),
          )}
          {infoItemRow(
            dictionary.plainMoreCounter,
            decodedData &&
              decodedData.statisticData.tskSwitches &&
              decodedData.statisticData.tskSwitches.get('lc'),
          )}
        </View>
        <View style={styles.divider} />

        {/* info section 3 */}
        <View>
          <Text style={styles.title}>{dictionary.switchesLabel}</Text>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableTitleTxt}>{dictionary.switchType}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableTitleTxt}>
                {dictionary.abbreviation}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableTitleTxt}>
                {dictionary.modeOfAction}
              </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableTitleTxt}>
                {dictionary.codeingSupport}
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          {tableRow('', '', '', '')}
          {tableRow('', '', '', '')}
        </View>
        {/* info section 4 */}
        <View>
          <Text style={styles.tableTitleTxt2}>
            {dictionary.modConfigString}
          </Text>
          <Text style={styles.tableColTxt2}>
            {decodedData &&
              decodedData.barcodeData.tskSwitches &&
              decodedData.barcodeData.tskSwitches.get('mc')}
          </Text>
          <Text style={styles.tableTitleTxt2}>{dictionary.articleTxt}</Text>
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
    marginBottom: 15,
  },
  //////////////////////
  infoItemRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  infoTitleCol: {
    flex: 0.45,
  },
  infoDataCol: {
    flex: 0.2,
  },
  spacer: {
    flex: 0.35,
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

export default ModuleConfiguration;

import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import QrButton from '../../components/QrButton';
import {defaultTheme} from '../../themes/Themes';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {useNavigation} from '@react-navigation/native';
import {useScanQr} from '../../contexts/scanQrContext';

const ScanQr = () => {
  const navigation = useNavigation();

  const scanQrContext = useScanQr(useScanQr);
  const {rawData1, rawData2, saveRawData1, saveRawData2, saveModuleNum} =
    scanQrContext;

  const onSuccess = e => {
    Alert.alert('Successfully scanned the Qr code!');
    console.log('EEE::: ', e);

    if (!rawData1 && !rawData2) {
      saveRawData1(e);
      console.log('rawData1: ', rawData1);
      console.log('rawData2: ', rawData2);
    }
    if (rawData1) {
      saveRawData2(e);
      let modNum = e.data.split(';');
      modNum = modNum.filter(item => {
        if (!item.indexOf('mo=')) {
          return item;
        }
      });
      modNum = modNum[0].split('=');
      modNum = modNum[1] * 1;
      saveModuleNum(modNum);

      console.log('rawData1: ', rawData1);
      console.log('rawData2: ', rawData2);
      console.log('modNum: ', modNum);
      // console.log('THIS IS THE COMBINED RAW DATA: ', rawData1 + rawData2);
    }

    if (rawData1 && rawData2) {
      Alert.alert('Already scanned both Qr codes!');
    }

    navigation.goBack();
  };

  return (
    <View style={styles.mainContainer}>
      <QRCodeScanner
        onRead={onSuccess}
        // flashMode={RNCamera.Constants.FlashMode.torch}
      />
      <View style={styles.txtRow}>
        <View style={styles.txtCol}>
          <Text style={styles.nfcTxt}></Text>
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

export default ScanQr;

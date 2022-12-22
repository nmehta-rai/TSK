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
import {WebView} from 'react-native-webview';
import {useCurrentTag} from '../../contexts/currentTagContext';

const KomaxDirect = () => {
  const navigation = useNavigation();
  const currentTagContext = useCurrentTag(useCurrentTag);

  const {decodedData} = currentTagContext;
  // decodedData &&
  // decodedData.barcodeData.tskSwitches &&
  useEffect(() => {
    console.log(`https://tsk.direct.komaxgroup.com/`);
  }, []);
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {/* content section */}
        <View style={styles.contentContainer}>
          {decodedData && decodedData.barcodeData && (
            <WebView
              source={{
                uri: `https://tsk.direct.komaxgroup.com/`,
              }}
              style={{flex: 1}}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: defaultTheme.white,
  },
  contentContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});

export default KomaxDirect;

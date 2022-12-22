import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import WebView from 'react-native-webview';
import {scale, DEVICE_HEIGHT, DEVICE_WIDTH} from '../../utils/Scaling';
import DrawerScreenHeader from '../../components/DrawerScreenHeader';
import {useLang} from '../../contexts/languageContext';

const ViewPdf = ({route, navigation}) => {
  const langContext = useLang(useLang);
  const {dictionary, userLanguageChange} = langContext;
  console.log('%c3D URL', 'color:red', route?.params?.three_d_url ?? '');
  const three_d_url =
    'https://github.com/BonnierNews/react-native-3d-model-view/blob/master/example/obj/Hamburger.zip?raw=true';
  return (
    <View style={styles.container}>
      <DrawerScreenHeader screenName={dictionary.viewPdfTitle} />
      <WebView
        source={{
          html: `
          <div class="sketchfab-embed-wrapper"> <iframe height='100%' width='100%' src="https://sketchfab.com/models/18b6bab9082249a38a60b953b85dce42/embed"></iframe></div>`,
        }}
      />
    </View>
  );
};
export default ViewPdf;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modelContainer: {
    width: '100%',
    alignSelf: 'center',
  },
  modelView: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    paddingVertical: 10,
  },
  btnCommonStyles: {
    height: 40,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A61FF',
    elevation: 15,
    width: '90%',
    zIndex: 2,
    position: 'absolute',
    bottom: 10,
  },
  btnText: {
    color: 'white',
    fontSize: 14,
  },
  backIconContainer: {
    height: 35,
    width: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: 20,
    borderRadius: 10,
    elevation: 10,
    marginTop: 10,
    position: 'absolute',
    zIndex: 1,
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: '80%',
    width: '80%',
    borderRadius: 10,
    paddingVertical: 10,
  },
});

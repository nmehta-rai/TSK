import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  StatusBar,
} from 'react-native';
import Logo from '../../assets/svgs/splash/logo.svg';
import Triangles from '../../assets/svgs/splash/triangles.svg';
import {useNavigation} from '@react-navigation/native';
import {RouteNames} from '../../constants/RouteNames';
import {defaultTheme} from '../../themes/Themes';
import Header from '../../components/header';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
  const navigation = useNavigation();
  const originalWidth = 360;
  const originalHeight = 480;
  const aspectRatio = originalWidth / originalHeight;
  const windowWidth = Dimensions.get('window').width;

  const checkAuth = async () => {
    let auth;
    try {
      auth = await AsyncStorage.getItem('auth');
    } catch (e) {
      console.log(e);
    }
    setTimeout(() => {
      if (auth) {
        navigation.navigate(RouteNames.ROOT_NAV);
      } else {
        navigation.navigate(RouteNames.LOGIN);
      }
    }, 2000);
  };

  useEffect(() => {
    checkAuth();
  });

  return (
    <>
      <SafeAreaView style={styles.mainContainer}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={defaultTheme.white}
        />
        <View style={styles.logoContainer}>
          <Logo />
        </View>
      </SafeAreaView>
      <View style={styles.triangleSection}>
        <View
          style={[
            {width: windowWidth, aspectRatio},
            styles.trianglesContainer,
          ]}>
          <Triangles
            width={'100%'}
            height={'100%'}
            viewBox={`0 0 ${originalWidth} ${originalHeight}`}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 0.4,
    backgroundColor: defaultTheme.white,
  },
  logoContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    paddingBottom: 50,
  },
  trianglesContainer: {
    paddingHorizontal: 0.15,
  },
  triangleSection: {
    flex: 0.6,
    backgroundColor: defaultTheme.white,
  },
});

export default SplashScreen;

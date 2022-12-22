import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  Dimensions,
  StatusBar,
} from 'react-native';
import HamburgerIcon from '../assets/svgs/headerComponent/hamburgerIcon.svg';
import HeaderLabel from '../assets/svgs/headerComponent/headerLabel.svg';
import KomaxLabel from '../assets/svgs/headerComponent/komaxLabel.svg';
import {defaultTheme} from '../themes/Themes';
import WorldIcon from '../assets/svgs/headerComponent/worldIcon.svg';
import DownArrow from '../assets/svgs/headerComponent/downArrow.svg';
import {MotiView} from '@motify/components';
import {useAnimationState} from 'moti';
import {Easing} from 'react-native-reanimated';
import {useLang} from '../contexts/languageContext';
import {useHistoryStack} from '../contexts/historyStackContext';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const Header = ({navigation, login, otp}) => {
  const [size, setSize] = useState(null);

  const onLayout = useCallback(event => {
    const {width, height} = event.nativeEvent.layout;

    setSize({width, height});
  }, []);

  const langContext = useLang(useLang);
  const {userLanguageChange} = langContext;

  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const changeLanguage = index => {
    if (index === 0) {
      setSelectedLanguage(languages[0]);
      userLanguageChange('en');
    } else if (index === 1) {
      setSelectedLanguage(languages[1]);
      userLanguageChange('de');
    } else if (index === 2) {
      setSelectedLanguage(languages[2]);
      userLanguageChange('cn');
    } else if (index === 3) {
      setSelectedLanguage(languages[3]);
      userLanguageChange('fr');
    } else if (index === 4) {
      setSelectedLanguage(languages[4]);
      userLanguageChange('es');
    } else {
      return;
    }
  };

  const languages = ['English', 'Deutsch', '中国人', 'Française', 'Español'];

  const openMenu = () => {
    navigation.openDrawer();
  };

  const animationState = useAnimationState({
    open: {
      top: size && size.height - 1.9,
    },
    closed: {
      top: -148,
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  const [zValue, setZValue] = useState(0);

  const toggleDropDown = () => {
    if (isOpen) {
      setZValue(0);
      setIsOpen(false);
      animationState.transitionTo('closed');
    } else {
      setIsOpen(true);
      animationState.transitionTo('open');
    }
  };

  useEffect(() => {
    animationState.transitionTo('closed');
  }, []);

  const headerOptionsRender = () => {
    if (login) {
      return (
        <View style={styles.languageRow}>
          <View style={styles.worldIconCol}>
            <WorldIcon />
          </View>
          <View style={styles.languageTextCol}>
            <Text style={styles.languageTxt}>{selectedLanguage}</Text>
          </View>
          <TouchableOpacity
            style={styles.downArrow}
            onPress={() => toggleDropDown()}>
            <DownArrow />
          </TouchableOpacity>
        </View>
      );
    } else if (otp) {
      return null;
    } else {
      return (
        <View style={styles.menuCol}>
          <TouchableOpacity onPress={openMenu}>
            <HamburgerIcon />
          </TouchableOpacity>
        </View>
      );
    }
  };

  const dropDownList = (element, index) => {
    return (
      <View style={styles.listItemContainer} key={index}>
        <TouchableOpacity
          style={styles.listItemButton}
          onPress={() => changeLanguage(index)}
          key={element}>
          <Text style={styles.dropDownTxt}>{element}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const historyStackContext = useHistoryStack(useHistoryStack);
  const {currentScreen, changeCurrentScreen} = historyStackContext;

  return (
    <>
      <SafeAreaView style={styles.headerContainer} onLayout={onLayout}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.brandingCol}>
          {currentScreen === 'komax' ? <KomaxLabel /> : <HeaderLabel />}
        </View>
        {headerOptionsRender()}
      </SafeAreaView>

      <MotiView
        state={animationState}
        transition={{
          type: 'timing',
          duration: 350,
          easing: Easing.out(Easing.ease),
          loop: false,
          repeatReverse: false,
        }}
        style={[styles.dropDownCol, {zIndex: zValue}]}
        children={languages.map((element, index) =>
          dropDownList(element, index),
        )}
        onDidAnimate={didAnimationFinish => {
          if (didAnimationFinish && isOpen) {
            setZValue(1);
          }
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: defaultTheme.midBlue,
    backgroundColor: defaultTheme.white,
    zIndex: 1,
  },
  brandingCol: {
    flex: 0.6,
    marginBottom: -3,
  },
  menuCol: {
    flex: 0.4,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 25,
  },
  languageRow: {
    flexDirection: 'row',
    flex: 0.56,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  worldIconCol: {
    flex: 1,
    alignItems: 'center',
  },
  languageTextCol: {
    flex: 1,
    alignItems: 'center',
  },
  downArrow: {
    flex: 1,
    alignItems: 'center',
  },
  languageTxt: {
    fontFamily: defaultTheme.familyRegular,
    fontWeight: '500',
    color: defaultTheme.darkGray,
    fontSize: defaultTheme.fontSizeBody,
  },
  dropDownCol: {
    borderColor: defaultTheme.midBlue,
    borderWidth: 1,
    borderTopWidth: 2,
    borderBottomLeftRadius: 2,
    position: 'absolute',
    alignSelf: 'flex-end',
    width: SCREEN_WIDTH / 2.075,
    paddingHorizontal: 5,
    paddingTop: 5,
    backgroundColor: defaultTheme.white,
    // height: SCREEN_HEIGHT / 5,
  },
  dropDownTxt: {
    marginVertical: 4,
    fontFamily: defaultTheme.familyRegular,
    fontWeight: '500',
    color: defaultTheme.darkGray,
    fontSize: defaultTheme.fontSizeBody,
  },
  listItemContainer: {},
  listItemButton: {},
});

export default Header;

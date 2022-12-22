import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {defaultTheme} from '../themes/Themes';
import BackArrow from '../assets/svgs/drawerScreenHeader/backArrow.svg';
import {useNavigation} from '@react-navigation/native';

const DrawerScreenHeader = ({screenName}) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => navigation.goBack()}>
          <BackArrow />
        </TouchableOpacity>
        <View>
          <Text style={styles.txt}>{screenName}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    backgroundColor: defaultTheme.midBlue,
    paddingVertical: 20,
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  backArrow: {
    marginRight: 25,
  },
  txt: {
    fontFamily: defaultTheme.familyRegular,
    fontWeight: '400',
    fontSize: defaultTheme.fontSizeTitle,
    color: defaultTheme.white,
  },
});

export default DrawerScreenHeader;

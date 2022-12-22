import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {defaultTheme} from '../../themes/Themes';
const Home = () => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.txt}>Hello World</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  txt: {
    fontSize: defaultTheme.fontSizeTitle,
    fontFamily: defaultTheme.familyBold,
  },
});

export default Home;

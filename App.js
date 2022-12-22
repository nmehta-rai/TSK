import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AuthProvider} from './src/contexts/authContext';
import {CurrentTagProvider} from './src/contexts/currentTagContext';
import {HistoryStackProvider} from './src/contexts/historyStackContext';
import {LanguageProvider} from './src/contexts/languageContext';
import {ScanQrProvider} from './src/contexts/scanQrContext';

import AppNavigator from './src/routes/AppNavigator';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AuthProvider>
        <LanguageProvider>
          <HistoryStackProvider>
            <CurrentTagProvider>
              <ScanQrProvider>
                <AppNavigator />
              </ScanQrProvider>
            </CurrentTagProvider>
          </HistoryStackProvider>
        </LanguageProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({});

export default App;

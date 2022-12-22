import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import NfcButtonIcon from '../assets/svgs/home/nfcButtonIcon.svg';
import {MotiView} from '@motify/components';
import {Easing} from 'react-native-reanimated';
import {defaultTheme} from '../themes/Themes';
import {useAnimationState} from 'moti';

const NfcButton = () => {
  const animationState = useAnimationState({
    inactive: {
      opacity: 0.5,
      scale: 1,
    },
    active: {
      opacity: 0,
      scale: 4,
    },
  });

  const [isActive, setIsActive] = useState(false);

  const handlePress = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    if (isActive) {
      animationState.transitionTo('active');
    } else {
      animationState.transitionTo('inactive');
    }
  }, [isActive]);

  const [transition, setTransition] = useState();

  return (
    <View>
      {Platform.OS === 'ios' ? (
        <View style={styles.fourthView}>
          <View style={styles.thirdView}>
            <View style={styles.secondView}>
              <View style={styles.firstView}>
                {[...Array(3).keys()].map(index => {
                  return (
                    <MotiView
                      key={index}
                      state={animationState}
                      transition={
                        // duration: 0,
                        // loop: false,
                        // repeatReverse: false,

                        {
                          type: 'timing',
                          duration: isActive ? 3000 : 0,
                          easing: Easing.out(Easing.ease),
                          loop: isActive ? true : false,
                          delay: isActive ? index * 400 : 0,
                          repeatReverse: false,
                        }
                      }
                      style={[StyleSheet.absoluteFillObject, styles.firstView]}
                    />
                  );
                })}
                <NfcButtonIcon fill={defaultTheme.white} />
              </View>
            </View>
          </View>
        </View>
      ) : (
        <TouchableOpacity style={styles.firstView} onPress={handlePress}>
          {[...Array(3).keys()].map(index => {
            return (
              <MotiView
                key={index}
                state={animationState}
                transition={
                  // duration: 0,
                  // loop: false,
                  // repeatReverse: false,

                  {
                    type: 'timing',
                    duration: isActive ? 3000 : 0,
                    easing: Easing.out(Easing.ease),
                    loop: isActive ? true : false,
                    delay: isActive ? index * 400 : 0,
                    repeatReverse: false,
                  }
                }
                style={[StyleSheet.absoluteFillObject, styles.firstView]}
              />
            );
          })}
          <NfcButtonIcon fill={defaultTheme.white} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  firstView: {
    backgroundColor: 'rgba(41, 80, 119, 0.5)',
    height: 64,
    width: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
  },
  secondView: {
    backgroundColor: 'rgba(41, 80, 119, 0.3)',
    height: 84,
    width: 84,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 42,
  },
  thirdView: {
    backgroundColor: 'rgba(41, 80, 119, 0.2)',
    height: 124,
    width: 124,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 62,
  },
  fourthView: {
    backgroundColor: 'rgba(41, 80, 119, 0.1)',
    height: 184,
    width: 184,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 92,
  },
});

export default NfcButton;

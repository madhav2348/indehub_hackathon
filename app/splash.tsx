import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export default function SplashScreen() {
  useEffect(() => {
    const checkSplashShown = async () => {
      const hasShownSplash = await AsyncStorage.getItem('hasShownSplash');
      
      if (hasShownSplash === 'true') {
        router.replace('/'); // skip splash
      } else {
        setTimeout(async () => {
          await AsyncStorage.setItem('hasShownSplash', 'true');
          router.replace('/'); // move to tabs/home
        }, 10000);
      }
    };

    checkSplashShown();
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/animation/dialy_star.json')}
        autoPlay={true}
        loop={false}
        style={styles.lottie}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 200,
    height: 200,
  },
});

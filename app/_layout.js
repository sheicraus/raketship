import { View, Text } from 'react-native'
import React, { useCallback } from 'react'
import { Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded] = useFonts({
    WSRegular: require('../assets/fonts/WorkSans-Regular.ttf'),
    WSBold: require('../assets/fonts/WorkSans-Bold.ttf'),
    WSMedium: require('../assets/fonts/WorkSans-Medium.ttf'),
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack onLayout={onLayoutRootView}/>
  )
}
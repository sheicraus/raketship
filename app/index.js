import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'

import { COLORS, icons, images, SIZES } from '../constants'
import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome}
from '../components';
import AppLogo from '../components/common/AppLogo';

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView style={{flex:1, backgroundColor: COLORS.lightWhite}}>
      <Stack.Screen
        options={{
          headerStyle: {backgroundColor: COLORS.lightWhite},
          headerShadowVisible: false,
          headerLeft: () => (<AppLogo/>),
          headerRight: () => (<ScreenHeaderBtn iconUrl={images.profile} dimension="60%"/>),
          headerTitle: ""
        }}
      />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{flex:1, padding: SIZES.medium}}>
            <Welcome/>
            <Popularjobs/>
            <Nearbyjobs />
          </View>
        </ScrollView>

    </SafeAreaView>
  )
}
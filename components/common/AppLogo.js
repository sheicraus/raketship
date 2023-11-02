import { View, Text } from 'react-native'
import React from 'react'
import { COLORS, FONT, SIZES } from '../../constants'

export default function AppLogo() {
  return (
    <View>
      <Text style={{fontFamily: FONT.bold, fontSize: SIZES.large, color: COLORS.primary}}>raketship</Text>
    </View>
  )
}
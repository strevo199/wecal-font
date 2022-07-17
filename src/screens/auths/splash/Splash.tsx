import { ActivityIndicator, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../../constants/theme';

export const Splash = () => {
  return (
    <>
    <StatusBar barStyle={'light-content'} /><View style={{ flex: 1, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={'large'} color={COLORS.white} />
      </View>
      </>
  )
}


const styles = StyleSheet.create({})
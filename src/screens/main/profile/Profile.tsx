import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActionButton } from '../../../components/ActionButton';
import { COLORS } from '../../../constants/theme';
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNRestart from 'react-native-restart';

export const Profile = () => {


  
  const handleLogoutOut = async () => {
    await AsyncStorage.multiSet([
      ['token',''],
      ['user', '']
    ])
    RNRestart.Restart()
  }

  return (
    <View>
      <ActionButton title={'Logout'} handleAction={handleLogoutOut} style={{backgroundColor: COLORS.primary}}/>
    </View>
  )
}


const styles = StyleSheet.create({})
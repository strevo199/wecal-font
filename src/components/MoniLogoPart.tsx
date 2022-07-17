import { View } from 'react-native'
import React from 'react'
import { COLORS } from '../constants/theme'

export const MoniLogoPart:React.FC <{style:any}> = ({style}) => {
  return (
    <View style ={[style,{ transform: [{rotate: '45deg'}]}]}></View>
  )
}



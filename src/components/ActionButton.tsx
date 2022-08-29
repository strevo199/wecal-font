import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES } from '../constants/theme'

export const ActionButton:React.FC <{title: any,handleAction:any, style:any}>= ({title,handleAction,style}) => {


  return (
    <TouchableOpacity
        onPress={handleAction}
        style ={[style,{ height: 40, justifyContent: 'center', alignItems: 'center'}]}
    >
        <Text style ={[{textTransform:'uppercase', ...FONTS.h3, color: COLORS.white}]}>{title}</Text>
    </TouchableOpacity>
  )
}



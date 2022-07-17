import { View, Text } from 'react-native'
import React, { FC } from 'react'
import { COLORS, FONTS } from '../constants';



export const ParagraphText:FC <{message: string; style: any}>= ({message,style}) => {
    return (
        <View>
            <Text style ={[{color: COLORS.gray ,...FONTS.body3},style]}>{message}</Text>
        </View>
    )
}
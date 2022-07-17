import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { SIZES, COLORS, arrowdown, arrowup, FONTS } from '../constants'



export const CardList:FC <{icon1: any; icon2: any; title: string, content: string;handleAction: any}>= ({handleAction, icon1,icon2, title,content}) => {
  return (
    <TouchableOpacity
        onPress={handleAction}
     style={{marginHorizontal: SIZES.padding,marginVertical: SIZES.padding/2,borderWidth: 0.6, borderColor: COLORS.ligthGray, borderRadius: SIZES.padding, backgroundColor: COLORS.lightBlue }}>
        <View style={{flexDirection: 'row', alignItems: 'center', padding: SIZES.padding }}>

          <View>
               { icon1 &&
                <Image
                  source={icon1} 
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: COLORS.link
                  }}
                />}
          </View>
          <View style={{ flex: 1, marginHorizontal: SIZES.padding }}>
            <Text style={{ ...FONTS.h3, color: COLORS.gray }}>{title}</Text>
            <Text style={{ ...FONTS.body4, color: COLORS.gray }}> {content}</Text>
          </View>
          <View>
          <Image
                  source={icon2} 
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: COLORS.gray
                  }}
                />
          </View>        
        </View> 

      </TouchableOpacity>
  )
}



const styles = StyleSheet.create({})
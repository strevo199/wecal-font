import { StyleSheet, Text, TextInput, View,Image } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTS, SIZES } from '../constants/theme';
import { search } from '../constants/icons';

export const TextInputField:React.FC <{multiline:boolean, placeholder:string,style:{}, setValue: any,hint :any, secureTextEntry: boolean, value:any,}> = ({placeholder,style,value, setValue, hint, secureTextEntry,multiline}) => {
  const [isFoucs, setisFoucs] = useState(false)
    return (
        <View>
            <TextInput
                placeholder= {placeholder}
                placeholderTextColor ={COLORS.gray}
                secureTextEntry = {secureTextEntry}
                onChangeText = {(val) => setValue(val)}
                value = {value}
                multiline = {multiline}
                onFocus ={() => setisFoucs(true)}
                style ={[isFoucs? {borderColor: COLORS.primary,borderWidth: 2}:{borderColor: COLORS.darkgray} ,{...FONTS.body3,backgroundColor: COLORS.white, borderRadius: SIZES.base, padding: SIZES.padding2+2, borderWidth: 1.2},style]}
            />
            <Text style ={{color: COLORS.gray, marginLeft:SIZES.padding,marginBottom:SIZES.base}}>{hint}</Text>
        </View>
  )
}
export const SearchInputField:React.FC <{multiline:boolean, placeholder:string,style:{}, setValue: any,hint :any, secureTextEntry: boolean, value:any,}> = ({placeholder,style,value, setValue, hint, secureTextEntry,multiline}) => {
  const [isFoucs, setisFoucs] = useState(false)
    return ( 
        <View>
            <Image
              source={search}
              style ={{
                width:20,
                height: 20,
                position: 'absolute',
                bottom: "42%",
                left: 10,
                tintColor: COLORS.gray,
                zIndex:20,

              }}
            />
            <TextInput
                placeholder= {placeholder}
                secureTextEntry = {secureTextEntry}
                onChangeText = {(val) => setValue(val)}
                value = {value}
                
                multiline = {multiline}
                onFocus ={() => setisFoucs(true)}
                style ={[isFoucs? {borderColor: COLORS.primary,borderWidth: 2}:{borderColor: COLORS.darkgray} ,{...FONTS.body3,backgroundColor: COLORS.white, borderRadius: SIZES.base,paddingLeft: SIZES.padding+25, paddingVertical: SIZES.padding2, borderWidth: 1.2},style]}
            />
            <Text style ={{color: COLORS.gray, marginLeft:SIZES.padding,}}>{hint}</Text>
        </View>
  )
}


const styles = StyleSheet.create({})
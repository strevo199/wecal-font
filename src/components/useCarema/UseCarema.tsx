import { StyleSheet, TouchableOpacity, Text, View, Image, } from 'react-native'
import React, { FC, useEffect, useRef } from 'react'
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { cancel, reset } from '../../constants/icons';


export const UseCarema:FC <{route: any, navigation: any}>= ({route, navigation}) => {

    const {title, content} = route.params || {};



  return (
    <View style ={{backgroundColor: COLORS.black, flex:1}}>
      <View style ={{marginVertical: SIZES.largeTitle, alignItems: 'center'}}>
        <Text style ={{...FONTS.h4, color: COLORS.white}}>{title}</Text>
        <Text style ={{...FONTS.body5, color: COLORS.white}}>{content}</Text>
      </View>
      <View style ={{flex:1, backgroundColor: COLORS.gray, marginHorizontal:SIZES.padding}}>
        
      
      </View>
      <View style ={{ height: 200,alignItems:'center',marginHorizontal: SIZES.padding*3 , justifyContent: 'space-between', flexDirection: 'row'}}>
        <TouchableOpacity
            onPress={ () => navigation.navigate("Verification")}
            style ={{backgroundColor: COLORS.white, width: 30, height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 25 }}
        >
            <Image
                source={cancel}
                style ={{
                    width: 25,
                    height: 25,
                }}
            />
        </TouchableOpacity>
        <TouchableOpacity
            style ={{backgroundColor: COLORS.white, width: 30, height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 25 }}
        >
           <View style ={{height: 75, width: 75, borderRadius: 40, borderStyle:'dashed', borderWidth:1, backgroundColor: COLORS.white}}></View>
        </TouchableOpacity>
        <TouchableOpacity
            style ={{backgroundColor: COLORS.white, width: 30, height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 25 }}
        >
            <Image
                source={reset}
                style ={{
                    width: 25,
                    height: 25,
                }}
            />
        </TouchableOpacity>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({})
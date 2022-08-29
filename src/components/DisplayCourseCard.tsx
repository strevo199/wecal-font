import React, { ReactNode } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated";
import { COLORS, SIZES, FONTS } from "../constants"


interface courseItem {
    name: ReactNode;
    _id: any; 
    grade: string;
    id: number,
    title: string,
    code: string,
    seamester: string
  }
  
export const DisplayCourseCard = ({item,index}:{item:courseItem, index:number},navigation: any) => {


  
    

    return ( 
      <Animated.View entering={FadeIn.delay(500 + index *50)}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Courseview',{item})}
          style ={{shadowColor: COLORS.gray,flexDirection: 'row',borderRadius: SIZES.base, justifyContent:'space-between', marginTop: SIZES.padding, backgroundColor: COLORS.lightBlue, padding: SIZES.padding}}>
          <View >
            <Text style ={{color: COLORS.primary,...FONTS.h3}}>{item.code}</Text>
          </View>
          <View style ={{flex: 1, marginHorizontal: SIZES.padding}}>
            <Text style ={{color: COLORS.darkgray,...FONTS.h4, textTransform: 'capitalize'}}>{item.name}</Text>
          </View>
          <View >
            <Text style ={{color: COLORS.darkPrimary,...FONTS.h3}}>{item.grade}</Text>
          </View>
        </TouchableOpacity> 
      </Animated.View>
    )
  }
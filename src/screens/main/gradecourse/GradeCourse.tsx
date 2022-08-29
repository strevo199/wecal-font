import { FlatList, ScrollView, TouchableOpacity, StatusBar, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { FC, Fragment, ReactNode, useContext, useEffect, useState } from 'react'
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import { ActionButton, SearchInputField } from '../../../components';
import { httpService } from '../../../services/http.service';
import { ParagraphText } from '../../../components/ParaText';
import { useIsFocused } from '@react-navigation/native';
import { DisplayCourseCard } from '../../../components/DisplayCourseCard';
import { UserContext } from '../../../services/context';
import Animated, { FadeIn } from 'react-native-reanimated';
// react-native-reanimated": "2.2.4",


export const GradeCourse:FC <{toggleSearch:any,navigation: any, route: any}>= ({toggleSearch,navigation, route}) => {
  const {ListByGrade,filtercourses} = useContext(UserContext)
    const [isLoading, setisLoading] = useState(false)
    const {grade} = route.params;
    
    useEffect( () => {
      ListByGrade(grade);
      
    }, [])
    
  


  const renderCourseList = () => {
    return (
      <View style ={{marginHorizontal: SIZES.padding, flex:1}}>
        <FlatList
          data={filtercourses}
          keyExtractor = {item => `item-${item._id}`}
          renderItem = {(item) =>DisplayCourseCard(item,navigation)} 
        />
        <View style ={{position: 'absolute', bottom: "5%",right:"2%", shadowColor:COLORS.black, shadowOffset: {width:2, height: 2},shadowOpacity:0.4, shadowRadius: 5}}>
              <ActionButton title={'Add'} handleAction={() => navigation.navigate("AddGrade")} style= {{width: SIZES.width/4, alignSelf: 'flex-end', marginTop: SIZES.largeTitle, backgroundColor: COLORS.primary,padding: SIZES.padding2,borderTopLeftRadius:SIZES.padding2, borderBottomLeftRadius: SIZES.padding2}}/>
        </View>

      </View>
    )
  } 
  
  return (
    <Animated.View  style ={{flex: 1}} entering={FadeIn.duration(500)}>
      <StatusBar barStyle={'light-content'} />
      {
         !isLoading ?
        <View style ={{flex: 1}}>
          {toggleSearch &&
          <View  style ={{marginHorizontal: SIZES.padding, marginTop:SIZES.padding, }}>
              <SearchInputField multiline={false} placeholder={'Enter course code'} style={{borderWidth: 0.6}} setValue={setsearchCodeValue} hint={undefined} secureTextEntry={false} value={searchCodeValue}/>
          </View>
          }
          {!filtercourses.length ? 
          <View >
            <ParagraphText message={`No ${grade} Grades Added yet`} style={{backgroundColor: COLORS.creditBgCOlor,paddingVertical: SIZES.base, marginHorizontal: SIZES.padding}}/>
          </View>:
          renderCourseList()}
        </View>:
        <View>
           <ActivityIndicator size={'large'} color = {COLORS.primary}/>
          
        </View>

      }
    </Animated.View>
  )
}


const styles = StyleSheet.create({})
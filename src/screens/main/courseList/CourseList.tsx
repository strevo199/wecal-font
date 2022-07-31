import { FlatList, ScrollView, TouchableOpacity, StatusBar, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { FC, Fragment, ReactNode, useContext, useEffect, useState } from 'react'
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import { ActionButton, SearchInputField } from '../../../components';
import { httpService } from '../../../services/http.service';
import { ParagraphText } from '../../../components/ParaText';
import { DisplayCourseCard } from '../../../components/DisplayCourseCard';
import { UserContext } from '../../../services/context';



export const CourseList:FC <{toggleSearch:any,navigation: any}>= ({toggleSearch,navigation}) => {
    const [searchCodeValue, setsearchCodeValue] = useState('');
    const {LoadCourses, courses} = useContext(UserContext)
    const [isLoading, setisLoading] = useState(false)
 
    useEffect( () => {
      LoadCourses()      
    }, [])
    
  


  const renderCourseList = () => {
    return (
      <View style ={{marginHorizontal: SIZES.padding, flex:1}}>
        <FlatList
          data={courses}
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
    <Fragment>
      <StatusBar barStyle={'light-content'} />
      {
         !isLoading ?
        <View style ={{flex: 1}}>
          {toggleSearch &&
          <View  style ={{marginHorizontal: SIZES.padding, marginTop:SIZES.padding, }}>
              <SearchInputField multiline={false} placeholder={'Enter course code'} style={{borderWidth: 0.6}} setValue={setsearchCodeValue} hint={undefined} secureTextEntry={false} value={searchCodeValue}/>
          </View>
          }
          {!courses.length ? 
          <View >
            <ParagraphText message={'No Grades Added yet'} style={{backgroundColor: COLORS.creditBgCOlor,paddingVertical: SIZES.base, marginHorizontal: SIZES.padding}}/>
            <ActionButton title={'Add'} handleAction={() => navigation.navigate("AddGrade")} style= {{width: SIZES.width/4, alignSelf: 'flex-end', marginTop: SIZES.largeTitle, backgroundColor: COLORS.primary,padding: SIZES.padding2,borderTopLeftRadius:SIZES.padding2, borderBottomLeftRadius: SIZES.padding2}}/>
          </View>:
          renderCourseList()}
        </View>:
        <View>
           <ActivityIndicator size={'large'} color = {COLORS.primary}/>
          
        </View>

      }
    </Fragment>
  )
}


const styles = StyleSheet.create({})
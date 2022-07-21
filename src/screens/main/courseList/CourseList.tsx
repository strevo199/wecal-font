import { FlatList, ScrollView, TouchableOpacity, StatusBar, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { FC, Fragment, ReactNode, useEffect, useState } from 'react'
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import { ActionButton, SearchInputField } from '../../../components';
import { httpService } from '../../../services/http.service';
import { ParagraphText } from '../../../components/ParaText';
import { useIsFocused } from '@react-navigation/native';


interface courseItem {
  name: ReactNode;
  _id: any;
  grade: string;
  id: number,
  title: string,
  code: string,
  seamester: string
}


export const CourseList:FC <{toggleSearch:any,navigation: any}>= ({toggleSearch,navigation}) => {
    const [searchCodeValue, setsearchCodeValue] = useState('');
    const [courses, setcourses] = useState([]);
    const [isLoading, setisLoading] = useState(false)
    const isFocused = useIsFocused();
 
    const getCourses =async () => {
      try {
        setisLoading(true)      
        const path = 'course'
    const res = await httpService.get(path);
    if (res.data.success) {
        setisLoading(false)      
        setcourses(res.data.data);
        
    }
    } catch (error) {
        setisLoading(false); 
        console.log(error);
        
    }
    }

    useEffect( () => {
     getCourses()
    }, [isFocused])
    
  
  const displayCourseCard = ({item}:{item:courseItem}) => {
    return ( 
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
    )
  }

  const renderCourseList = () => {
    return (
      <View style ={{marginHorizontal: SIZES.padding, flex:1}}>
        <FlatList
          data={courses}
          keyExtractor = {item => `item-${item._id}`}
          renderItem = {displayCourseCard} 
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
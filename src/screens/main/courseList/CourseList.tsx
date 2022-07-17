import { FlatList, ScrollView, TouchableOpacity, StatusBar, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { FC, Fragment, useEffect, useState } from 'react'
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import { SearchInputField } from '../../../components';
import { httpService } from '../../../services/http.service';

interface courseItem {
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

    const getCourses =async () => {
      try {
        setisLoading(true)      
        const path = 'course'
    const res = await httpService.get(path);
    if (res.data.success) {
        setisLoading(false)      
        setcourses(res.data.data);
        console.log(courses);
        
    }
    } catch (error) {
        setisLoading(false); 
        console.log(error);
        
    }
    }

    useEffect( () => {
     getCourses()
    }, [])
    
  
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
      <View style ={{marginHorizontal: SIZES.padding}}>
        <FlatList
          data={courses}
          keyExtractor = {(item) => `item-${item._id}`}
          renderItem = {displayCourseCard} 
        />
      </View>
    )
  }
  return (
    <Fragment>
      <StatusBar barStyle={'light-content'} />
      <View style ={{flex: 1}}>
        {toggleSearch &&
        <View  style ={{marginHorizontal: SIZES.padding, marginTop:SIZES.padding}}>
            <SearchInputField multiline={false} placeholder={'Enter course code'} style={{borderWidth: 0.6}} setValue={setsearchCodeValue} hint={undefined} secureTextEntry={false} value={searchCodeValue}/>
        </View>
        }
        {isLoading? 
          <ActivityIndicator size={'large'} color = {COLORS.primary}/>:
         renderCourseList()}
      </View>
    </Fragment>
  )
}


const styles = StyleSheet.create({})
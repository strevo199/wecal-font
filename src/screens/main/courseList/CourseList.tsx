import { FlatList, ScrollView, TouchableOpacity, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { FC, Fragment, useEffect, useState } from 'react'
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import { SearchInputField } from '../../../components';
import { courseListdata } from '../../../constants/data';

interface courseItem {
  grade: string;
  id: number,
  title: string,
  code: string,
  seamester: string
}


export const CourseList:FC <{toggleSearch:any,navigation: any}>= ({toggleSearch,navigation}) => {
    const [searchCodeValue, setsearchCodeValue] = useState('');
    const [data, setdata] = useState(courseListdata);
    

  
  const displayCourseCard = ({item}:{item:courseItem}) => {
    return ( 
      <TouchableOpacity 
        onPress={() => navigation.navigate('Courseview',{item})}
        style ={{shadowColor: COLORS.gray,flexDirection: 'row',borderRadius: SIZES.base, justifyContent:'space-between', marginTop: SIZES.padding, backgroundColor: COLORS.lightBlue, padding: SIZES.padding}}>
        <View >
          <Text style ={{color: COLORS.primary,...FONTS.h3}}>{item.code}</Text>
        </View>
        <View style ={{flex: 1, marginHorizontal: SIZES.padding}}>
          <Text style ={{color: COLORS.darkgray,...FONTS.h4, textTransform: 'capitalize'}}>{item.title}</Text>
        </View>
        <View >
          <Text style ={{color: COLORS.gray,...FONTS.h4}}>{item.grade}</Text>
        </View>
      </TouchableOpacity> 
    )
  }

  const renderCourseList = () => {
    return (
      <View style ={{marginHorizontal: SIZES.padding}}>
        <FlatList
          data={data}
          keyExtractor = {(item) => `item-${item.id}`}
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
        {renderCourseList()}
      </View>
    </Fragment>
  )
}


const styles = StyleSheet.create({})
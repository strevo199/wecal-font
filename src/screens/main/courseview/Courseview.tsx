import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React,{FC, Fragment, useEffect, useState} from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { FONTS, SIZES } from '../../../constants'
import { COLORS } from '../../../constants/theme';


interface CourseviewProps {
    route:any, 
    navigation: StackNavigationProp<any>
    
  }

  interface CourseDetail {
    code: string,
    title: string,
    grade: string,
    seamester: string,
    unit: number,
    grade_point: number,
    course_grade_point: number
}

export const Courseview:FC <CourseviewProps> = ({route,navigation}) => {
    const [courseDetail, setCourseDetail] = useState({} as CourseDetail)
    const item = route.params || {};

    useEffect(() => {
      setCourseDetail(item.item)
        
    }, [])


    const renderCourseDetail = () => {
        return (
            <>
            <View style ={{borderWidth:0.7, padding: SIZES.padding, borderColor: COLORS.ligthGray, borderRadius: SIZES.padding ,marginHorizontal: SIZES.padding, marginVertical: SIZES.padding2, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
            <View>
                <Text style ={{...FONTS.h3, color: COLORS.darkPrimary}}>Code: <Text style ={{...FONTS.h3, letterSpacing: 0.9}}>{courseDetail.code}</Text></Text>
                <Text style ={{...FONTS.h3, color: COLORS.darkPrimary}}>Title: <Text style ={{...FONTS.h3}}>{courseDetail.title}</Text></Text>
                <Text style ={{...FONTS.h3, color: COLORS.darkPrimary}}>Date added: <Text style ={{...FONTS.h3}}>11-07-2014</Text></Text>
                <Text style ={{...FONTS.h3, color: COLORS.darkPrimary}}>Date updated: <Text style ={{...FONTS.h3}}>17-04-2015</Text></Text>
            </View>
            <View style ={{backgroundColor: COLORS.ligthGray, height:SIZES.largeTitle, width: SIZES.largeTitle, justifyContent: 'center', alignItems: 'center', borderRadius: SIZES.base }}>
                <Text style ={{...FONTS.largeTitle, color:COLORS.primary}}>{courseDetail.grade}</Text>
            </View>
        </View>
        <View style ={{borderWidth:0.7, padding: SIZES.padding, borderColor: COLORS.ligthGray, borderRadius: SIZES.padding ,marginHorizontal: SIZES.padding, marginVertical: SIZES.padding2, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
            <View>
                <Text style ={{...FONTS.h3, color: COLORS.darkPrimary}}>units: <Text style ={{...FONTS.h3, letterSpacing: 0.9}}>{courseDetail.unit} </Text></Text>
                <Text style ={{...FONTS.h3, color: COLORS.darkPrimary}}>seamester: <Text style ={{...FONTS.h3}}>{courseDetail.seamester}</Text></Text>
            </View>
            
        </View>
        <View style ={{borderWidth:0.7, padding: SIZES.padding, borderColor: COLORS.ligthGray, borderRadius: SIZES.padding ,marginHorizontal: SIZES.padding, marginVertical: SIZES.padding2, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
            <View>
                <Text style ={{...FONTS.h3, color: COLORS.darkPrimary}}>Your Grade point: <Text style ={{...FONTS.h3, letterSpacing: 0.9}}>{courseDetail.grade_point} </Text></Text>
                <Text style ={{...FONTS.h3, color: COLORS.darkPrimary}}>Course Grade point: <Text style ={{...FONTS.h3, letterSpacing: 0.9}}>{courseDetail.course_grade_point} </Text></Text>
            </View>
        </View></>
        )
    }
    const renderCourseAction = () => {
        return (
            <View>
                 
            </View>
        )
    }
  return (
    <Fragment>
        <StatusBar barStyle={'light-content'} />
        <View style ={{
            flex: 1
        }}>
        {renderCourseDetail()}
        {renderCourseAction()}
        </View>
    </Fragment>
  )
}


const styles = StyleSheet.create({})
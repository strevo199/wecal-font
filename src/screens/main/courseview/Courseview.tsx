import { ActivityIndicator, StatusBar, StyleSheet, Text, View } from 'react-native'
import React,{FC, Fragment, useEffect, useState} from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { FONTS, SIZES } from '../../../constants'
import { COLORS } from '../../../constants/theme';
import { httpService } from '../../../services/http.service';
import moment from 'moment';


interface CourseviewProps {
    route:any, 
    navigation: StackNavigationProp<any>
    
  }

  interface CourseDetail {
    code: string,
    name: string,
    grade: string,
    semester: string,
    created_at: string,
    updated_at: string,
    unit: string,
    quality_point: number,
    course_grade_point: number
}

export const Courseview:FC <CourseviewProps> = ({route,navigation}) => {
    const [courseDetail, setCourseDetail] = useState({} as CourseDetail)
    const [isLoading, setisLoading] = useState(false)
    const {item} = route.params || {};

    const getCourse =async () => {
        try {
            setisLoading(true)      
          const path = `course/${item._id}`
          
      const res = await httpService.get(path);
      if (res.data.success) {
          setisLoading(false)      
          setCourseDetail(res.data.data);
          console.log(res.data.data);
          
      }
      } catch (error) {
          setisLoading(false); 
          console.log(error);
          
      }
      }
  
      useEffect( () => {
       getCourse()
      }, [])


    const renderCourseDetail = () => {
        return (
            <>
            <View style ={{borderWidth:0.7, padding: SIZES.padding, borderColor: COLORS.ligthGray, borderRadius: SIZES.padding ,marginHorizontal: SIZES.padding, marginVertical: SIZES.padding2, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
            <View>
                <Text style ={{...FONTS.h2, color: COLORS.darkPrimary}}>Code: <Text style ={{...FONTS.h3, letterSpacing: 0.9}}>{courseDetail.code}</Text></Text>
                <Text style ={{...FONTS.h2, color: COLORS.darkPrimary}}>Title: <Text style ={{...FONTS.h3}}>{courseDetail.name}</Text></Text>
                <Text style ={{...FONTS.h2, color: COLORS.darkPrimary}}>Date added: <Text style ={{...FONTS.h3}}>{moment(courseDetail?.created_at).format("MMM-Do-YYYY")}</Text></Text>
                <Text style ={{...FONTS.h2, color: COLORS.darkPrimary}}>Date updated: <Text style ={{...FONTS.h3}}>{moment(courseDetail?.updated_at).format("MMM-Do-YYYY")}</Text></Text>
            </View>
            <View style ={{backgroundColor: COLORS.ligthGray, height:SIZES.largeTitle, width: SIZES.largeTitle, justifyContent: 'center', alignItems: 'center', borderRadius: SIZES.base }}>
                <Text style ={{...FONTS.largeTitle, color:COLORS.primary}}>{courseDetail.grade}</Text>
            </View>
        </View>
        <View style ={{borderWidth:0.7, padding: SIZES.padding, borderColor: COLORS.ligthGray, borderRadius: SIZES.padding ,marginHorizontal: SIZES.padding, marginVertical: SIZES.padding2, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
            <View>
                <Text style ={{...FONTS.h2, color: COLORS.darkPrimary}}>Units: <Text style ={{...FONTS.h3, letterSpacing: 0.9}}>{courseDetail.unit} </Text></Text>
                <Text style ={{...FONTS.h2, color: COLORS.darkPrimary}}>Semester: <Text style ={{...FONTS.h3}}>{courseDetail.semester} </Text></Text>
            </View>
            
        </View>
        <View style ={{borderWidth:0.7, padding: SIZES.padding, borderColor: COLORS.ligthGray, borderRadius: SIZES.padding ,marginHorizontal: SIZES.padding, marginVertical: SIZES.padding2, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
            <View>
                <Text style ={{...FONTS.h2, color: COLORS.darkPrimary}}>Quality Point: <Text style ={{...FONTS.h3, letterSpacing: 0.9}}>{courseDetail.quality_point} </Text></Text>
                {/* <Text style ={{...FONTS.h3, color: COLORS.darkPrimary}}>Course Grade point: <Text style ={{...FONTS.h3, letterSpacing: 0.9}}>{courseDetail.course_grade_point} </Text></Text> */}
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
        {
            isLoading ?
            <ActivityIndicator size={'large'} color = {COLORS.primary}/>:
            <View style ={{
                flex: 1
            }}>
            {renderCourseDetail()}
            {renderCourseAction()}
            </View>
        }
    </Fragment>
  )
}


const styles = StyleSheet.create({})
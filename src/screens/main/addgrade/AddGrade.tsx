import { ActivityIndicator, Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { FC, Fragment, useState } from 'react';
import { Dropdown } from '../../../components/DropSelect';
import { gradeLabel, seamesterLabel } from '../../../constants/data';
import { FONTS, SIZES } from '../../../constants';
import { TextInputField } from '../../../components/TextInputField';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { send } from '../../../constants/icons';
import { COLORS } from '../../../constants/theme';
import { ActionButton } from '../../../components';


export const AddGrade:FC <{navigation:any}>= ({navigation}) => {
  const [grade, setgrade] = useState('')
  const [seamester, setSeamester] = useState('')
  const [courseCode, setcourseCode] = useState('')
  const [courseTitle, setcourseTitle] = useState('')
  const [isLoading, setisLoading] = useState(false)

  const handleSendGrade =() => {
        setisLoading(true); 
      // if (grade && seamester && courseCode) {
        const  body:{grade: string,seamester: string,courseTitle: string,courseCode: string} ={
            grade,courseCode,courseTitle, seamester
         }
        //  setTimeout(() => {
        //   setisLoading(false);
          navigation.navigate('CourseList',{body})
        //  }, 3000);
      // }
      // else{
      //   setTimeout(() => {
      //     setisLoading(false);
      //    }, 1000);
      // }
  }
  
  
  return (
    <Fragment>
      <StatusBar barStyle={'light-content'} />
      <View style = {{marginHorizontal:SIZES.padding,marginTop: SIZES.padding2}}>
        <TextInputField multiline={false} placeholder={'Enter course code. e.g CHM302'} style={{borderWidth:0.6}} setValue={setcourseCode} hint={'Enter Course Code'} secureTextEntry={false} value={courseCode}/>
      </View>
      <View style = {{marginHorizontal:SIZES.padding,marginTop: SIZES.padding2}}>
        <TextInputField multiline={false} placeholder={'Enter course title. e.g Quantum Machincs'} style={{borderWidth:0.6}} setValue={setcourseTitle} hint={'Enter Course Title:'} secureTextEntry={false} value={courseTitle}/>
      </View>
      <View style = {{marginHorizontal:SIZES.padding,marginTop: SIZES.padding2}}>
        <Dropdown placeholderLabel={'select your Grade'} itemList={gradeLabel} getValue={setgrade} hint={'select your Grade e.g B'}/>
      </View>
      <View style = {{marginHorizontal:SIZES.padding,marginTop: SIZES.padding2}}>
        <Dropdown placeholderLabel={'select seamester'} itemList={seamesterLabel} getValue={setSeamester} hint={'select course seamester '}/>
      </View>
      <View style ={{marginHorizontal: SIZES.padding, marginTop: SIZES.padding, alignItems: 'flex-end'}}>
          {
            isLoading ?
            <View style ={{flexDirection: 'row',borderRadius: SIZES.padding, backgroundColor: COLORS.lightBlue, padding: SIZES.padding}}>
              <ActivityIndicator color= {COLORS.primary} />
              <Text style ={{...FONTS.h4, color: COLORS.darkPrimary, marginLeft: SIZES.padding}}>Loading...</Text>
            </View>
            : 
            <ActionButton title={'Send'} handleAction={handleSendGrade} style={{backgroundColor: COLORS.primary, width: SIZES.width/3}}/>
            
          } 
      </View>
    </Fragment>
  )
}


const styles = StyleSheet.create({}) 
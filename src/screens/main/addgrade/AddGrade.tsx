import { ActivityIndicator, Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { FC, Fragment, useContext, useEffect, useState } from 'react';
import { Dropdown } from '../../../components/DropSelect';
import { gradeLabel, seamesterLabel } from '../../../constants/data';
import { FONTS, SIZES } from '../../../constants';
import { TextInputField } from '../../../components/TextInputField';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { send } from '../../../constants/icons';
import { COLORS } from '../../../constants/theme';
import { ActionButton } from '../../../components';
import { dataService } from '../../../services/data.service';
import { httpService } from '../../../services/http.service';
import Snackbar from 'react-native-snackbar';
import { UserContext } from '../../../services/context';


export const AddGrade:FC <{navigation:any}>= ({navigation}) => {
  const [grade, setgrade] = useState('')
  const [grades, setgrades] = useState([])
  const [seamester, setSeamester] = useState('')
  const [seamesters, setSeamesters] = useState([])
  const [courseCode, setcourseCode] = useState('')
  const [courseUnit, setcourseUnit] = useState('')
  const [courseTitle, setcourseTitle] = useState('')
  const {AddCourse} = useContext(UserContext)
  const [isLoading, setisLoading] = useState(false)

  const handleSendGrade =async () => {
        setisLoading(true); 
      if (grade && courseCode && courseUnit) {
        const  body:{grade: string, semester: string,name: string,code: string,unit: string, school: string, user: string} ={
            grade: grade,
            code: courseCode.toUpperCase(),
            name: courseTitle, 
            unit: courseUnit,
            semester: seamester,
            school: user.school._id,
            user: user._id
         }
         

         
        try {
          const path = 'course'
      const res = await httpService.post(path,body);
      if (res.data.success) {
          setisLoading(false)      
          
          AddCourse(res.data._doc)

          Snackbar.show({
              text: 'Added Successfully',
              duration: 3000,
              backgroundColor: COLORS.darkPrimary,
              textColor: COLORS.white
          })
          navigation.navigate("Home","CourseList")
      }
      } catch (error) {
          setisLoading(false);
          console.log(error);
          
      }
         
  }}
  
  const [user, setuser] = useState({})

  
  useEffect(() => {
    setuser(dataService.loggedInUser())
    
    
  }, [])


  useEffect(() => {
   if (user) {
    const items =  user.school?.grade_system.map((item: any) => {
      return (
        {
          label: `grade ${Object.keys(item)[0]}`,
          value: Object.keys(item)[0]
        }
      )
    })
    const itemssemater =  user.school?.semester.map((item: any) => {
      return (
        {
          label: `${item} semester`,
          value: item
        }
      )
    })
    setgrades(items)
    setSeamesters(itemssemater)
   }
  }, [user])
  

  
  
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
        <TextInputField multiline={false} placeholder={'Enter credit unit'} style={{borderWidth:0.6}} setValue={setcourseUnit} hint={'Enter credit unit'} secureTextEntry={false} value={courseUnit}/>
      </View>
      <View style = {{marginHorizontal:SIZES.padding,marginTop: SIZES.padding2}}>
        <Dropdown placeholderLabel={'select your Grade'} itemList={grades? grades : []} getValue={setgrade} hint={'select your Grade e.g B'}/>
      </View>
      <View style = {{marginHorizontal:SIZES.padding,marginTop: SIZES.padding2}}>
        <Dropdown placeholderLabel={'select seamester'} itemList={seamesters ? seamesters: []} getValue={setSeamester} hint={'select course seamester '}/>
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
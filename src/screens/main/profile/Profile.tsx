import { ImageBackground, Platform, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ActionButton } from '../../../components/ActionButton';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import { dataService } from '../../../services/data.service';
import { ParagraphText } from '../../../components';
import { circledUser } from '../../../constants/icons';
import { AuthContext } from '../../../services/context';

interface User {
  profile_url: string
}

export const Profile = () => {
  const {SignOut,user} = useContext(AuthContext)

  useEffect(() => {
    console.log(user);
    
  }, [])

  
  return (
    <>
      <StatusBar backgroundColor={COLORS.primary} barStyle={ Platform.OS == 'android'? 'light-content': 'dark-content'} />

    <ScrollView style ={{flex: 1}}>
      <View style ={{flex: 1}}>
        <ImageBackground
          source={user.profile_url? user.profile_url: circledUser}
          imageStyle ={{
            resizeMode:'cover'
          }}
          style = {{
            height: 200,
            width: 200,

          }}
        >

        </ImageBackground>
          
        <View style= {{padding: SIZES.padding}}>
            <View style ={{flexDirection: 'row', borderBottomWidth:2, borderBottomColor: COLORS.lightBlue, paddingVertical: SIZES.base}}>
              <ParagraphText message={'Full Name:'} style={{...FONTS.h3,color: COLORS.primary,marginRight: SIZES.padding}}/>
              <ParagraphText message={user?.full_name} style={{...FONTS.h3,marginRight: SIZES.padding}}/>
            </View>
            <View style ={{flexDirection: 'row', borderBottomWidth:2, borderBottomColor: COLORS.lightBlue, paddingVertical: SIZES.base}}>
              <ParagraphText message={'Email:'} style={{...FONTS.h3,color: COLORS.primary,marginRight: SIZES.padding}}/>
              <ParagraphText message={user?.email} style={{...FONTS.h3,marginRight: SIZES.padding, flexWrap: 'wrap'}}/>
            </View>
            <View style ={{flexDirection: 'row', borderBottomWidth:2, borderBottomColor: COLORS.lightBlue, paddingVertical: SIZES.base}}>
              <ParagraphText message={'Phone:'} style={{...FONTS.h3,color: COLORS.primary,marginRight: SIZES.padding}}/>
              <ParagraphText message={user?.phone} style={{...FONTS.h3,marginRight: SIZES.padding}}/>
            </View>
        </View> 
        <View style= {{padding: SIZES.padding}}>
            <View style ={{flexDirection: 'row', borderBottomWidth:2, borderBottomColor: COLORS.lightBlue, paddingVertical: SIZES.base}}>
              <ParagraphText message={'School Detail:'} style={{...FONTS.h3,color: COLORS.darkPrimary,marginRight: SIZES.padding}}/>
            </View>
            <View style ={{flexDirection: 'row', borderBottomWidth:2, borderBottomColor: COLORS.lightBlue, paddingVertical: SIZES.base}}>
              <ParagraphText message={'Name:'} style={{...FONTS.h3,color: COLORS.primary,marginRight: SIZES.padding}}/>
              <ParagraphText message={user?.school.name} style={{...FONTS.h3,color: COLORS.gray,marginRight: SIZES.padding}}/>
            </View>
            <View style ={{flexDirection: 'row', borderBottomWidth:2, borderBottomColor: COLORS.lightBlue, paddingVertical: SIZES.base}}>
              <ParagraphText message={'Course Of Study:'} style={{...FONTS.h3,color: COLORS.primary,marginRight: SIZES.padding}}/>
              <ParagraphText message={user?.user_school.course_of_study} style={{...FONTS.h3,color: COLORS.gray,marginRight: SIZES.padding}}/>
            </View>
            <View style ={{flexDirection: 'row', borderBottomWidth:2, borderBottomColor: COLORS.lightBlue, paddingVertical: SIZES.base}}>
              <ParagraphText message={'CGPA:'} style={{...FONTS.h3,color: COLORS.primary,marginRight: SIZES.padding}}/>
              <ParagraphText message={user?.user_school.cgpa} style={{...FONTS.h3,color: COLORS.gray,marginRight: SIZES.padding}}/>
            </View>
            <View style ={{flexDirection: 'row', borderBottomWidth:2, borderBottomColor: COLORS.lightBlue, marginTop:SIZES.padding2, paddingVertical: SIZES.base}}>
              <ParagraphText message={user?.user_school.grade_mark.class} style={{...FONTS.h3,color: COLORS.primary,marginRight: SIZES.padding}}/>
              <ParagraphText message={`${user?.user_school.grade_mark.upper} - ${user?.user_school.grade_mark.lower}`} style={{...FONTS.h3,color: COLORS.gray,marginRight: SIZES.padding}}/>
            </View>
        </View>
      </View>
      <View style ={{alignItems:'flex-end', marginVertical: SIZES.base, marginHorizontal:SIZES.padding}}>
        <ActionButton title={'Logout'} handleAction={SignOut} style={{backgroundColor: COLORS.primary, width: SIZES.width/4}}/>
      </View>
    </ScrollView>
    </>
  )
}


const styles = StyleSheet.create({})
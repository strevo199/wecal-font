import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ActionButton } from '../../../components/ActionButton';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import { dataService } from '../../../services/data.service';
import { ParagraphText } from '../../../components';

export const Profile = () => {
  const [user, setuser] = useState({})

  useEffect(() => {
    setuser(dataService.loggedInUser())
  }, [])

  console.log(user);
  
  return (
    <View style ={{flex: 1}}>
      <View style ={{flex: 1}}>
        <View style= {{padding: SIZES.padding}}>
            <View style ={{flexDirection: 'row', borderBottomWidth:2, borderBottomColor: COLORS.lightBlue, paddingVertical: SIZES.base}}>
              <ParagraphText message={'Full Name:'} style={{...FONTS.h3,color: COLORS.primary,marginRight: SIZES.padding}}/>
              <ParagraphText message={user.full_name} style={{...FONTS.h3,marginRight: SIZES.padding}}/>
            </View>
            <View style ={{flexDirection: 'row', borderBottomWidth:2, borderBottomColor: COLORS.lightBlue, paddingVertical: SIZES.base}}>
              <ParagraphText message={'Email:'} style={{...FONTS.h3,color: COLORS.primary,marginRight: SIZES.padding}}/>
              <ParagraphText message={user.email} style={{...FONTS.h3,marginRight: SIZES.padding}}/>
            </View>
            <View style ={{flexDirection: 'row', borderBottomWidth:2, borderBottomColor: COLORS.lightBlue, paddingVertical: SIZES.base}}>
              <ParagraphText message={'Phone:'} style={{...FONTS.h3,color: COLORS.primary,marginRight: SIZES.padding}}/>
              <ParagraphText message={user.phone} style={{...FONTS.h3,marginRight: SIZES.padding}}/>
            </View>
        </View>
        <View style= {{padding: SIZES.padding}}>
            <View style ={{flexDirection: 'row', borderBottomWidth:2, borderBottomColor: COLORS.lightBlue, paddingVertical: SIZES.base}}>
              <ParagraphText message={'School Detail:'} style={{...FONTS.h3,color: COLORS.darkPrimary,marginRight: SIZES.padding}}/>
            </View>
            <View style ={{flexDirection: 'row', borderBottomWidth:2, borderBottomColor: COLORS.lightBlue, paddingVertical: SIZES.base}}>
              <ParagraphText message={'Email:'} style={{...FONTS.h3,color: COLORS.primary,marginRight: SIZES.padding}}/>
              <ParagraphText message={user.school.name} style={{...FONTS.h3,marginRight: SIZES.padding}}/>
            </View>
            
        </View>
      </View>
      <View style ={{alignItems:'flex-end', marginVertical: SIZES.base, marginHorizontal:SIZES.padding}}>
        <ActionButton title={'Logout'} handleAction={dataService.logOutUser} style={{backgroundColor: COLORS.primary, width: SIZES.width/4}}/>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({})
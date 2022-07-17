import { StatusBar, StyleSheet, SafeAreaView, Text, View, Image, Platform, ImageBackground, FlatList, ScrollView, TouchableOpacity, ImageSourcePropType } from 'react-native'
import React, { FC, Fragment, useEffect, useState } from 'react'
import { dataService } from '../../../services'
import { FONTS, rec, rec1, rec2 } from '../../../constants'
import { COLORS, SIZES } from '../../../constants/theme';

export const Home:FC <{navigation:any}>= ({navigation}) => {

  interface User {
    first_name: string,
    profile_url: string,
    cgpa: string,
    standing: string,
    last_gpa:string
  }
  
  const [user, setuser] = useState({} as User)

  
  useEffect(() => {
    setuser(dataService.loggedInUser()) as unknown as User
    
  }, [])


  const renderAddGrade =() => { 
    return (
      <> 
        <View style = {{backgroundColor: COLORS.lightBlue,marginVertical: SIZES.padding2,padding: SIZES.padding }}>
          <Text style ={{...FONTS.h3, color: COLORS.gray}}>status: <Text  style ={{...FONTS.h3, paddingHorizontal: SIZES.base,textTransform: 'uppercase',color: COLORS.darkPrimary}}>{user.standing}</Text></Text>
        </View>
        <View style ={{alignItems: 'flex-end'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddGrade")}
          style ={{backgroundColor: COLORS.primary,padding: SIZES.padding2,borderTopLeftRadius:SIZES.padding2, borderBottomLeftRadius: SIZES.padding2}}> 
            <Text style ={{...FONTS.h3, color: COLORS.white, textTransform: 'uppercase' }}>add Grade</Text>
          </TouchableOpacity>

        </View>
      </>
    )
  }
  

  const quickActionCards  = (count: number, content: string, icon: ImageSourcePropType | undefined,color: string) => {
    return (
      <TouchableOpacity>
      <ImageBackground
        source={icon} 
        resizeMode ='cover'
        style ={{
          width: SIZES.width/2.5,
          height: SIZES.width/2.5,
          marginLeft: SIZES.padding,
          justifyContent: 'flex-end'
        }}
        imageStyle= {{
          borderRadius: SIZES.padding2,
        }} 
      >
          <View style ={{padding: SIZES.padding}}>
            <Text style= {{...FONTS.h3, color: color}}>{content}</Text>
            <Text style= {{...FONTS.h1, color: color}}>{count}</Text>
          </View>
      </ImageBackground> 
      </TouchableOpacity>
    ) 
  }   

  const renderSummary =() => { 
    return (
    <View>
      <View style ={{marginHorizontal: SIZES.padding,justifyContent:'space-between', flexDirection:'row',alignItems: 'center'}}>
        <Text style= {{...FONTS.h3, color: COLORS.primary}}>Summary</Text>
        <Text style= {{...FONTS.h1, color: COLORS.link}}>...</Text>
      </View> 
      <View>
        <ScrollView showsHorizontalScrollIndicator ={false} style ={{marginVertical: SIZES.padding2}} horizontal>
          {quickActionCards(count = 3.79, content = "Current GPA",  icon = rec, color= COLORS.white,)}
          {quickActionCards(count = 20, content = "Total number of A(s)", icon = rec1, color= COLORS.primary)}
          {quickActionCards(count = 13, content = "Total number of B(s)", icon = rec1, color= COLORS.primary)}
        </ScrollView>
        <ScrollView showsHorizontalScrollIndicator ={false} horizontal>
         {quickActionCards(count = 10, content = "Total number of C(s)", icon = rec2, color= COLORS.primary)}
          {quickActionCards(count = 2, content = "Total number of D(s)", icon = rec2, color= COLORS.primary)}
          {quickActionCards(count = 5, content = "Total number of E(s)", icon = rec2, color= COLORS.primary)}
          {quickActionCards(count = 0, content = "Total number of F(s)", icon = rec1, color= COLORS.primary)}

        </ScrollView>
      </View>
    </View>
    )
  }


  const renderShowCase =() => {
    return (
      
      <ImageBackground
        source={rec}
        resizeMode ='cover'
        style ={{marginHorizontal: SIZES.padding, flexDirection:'row', justifyContent: 'space-around',marginVertical: SIZES.h2, alignItems: 'center',padding: SIZES.h1}}
        imageStyle={{ borderRadius: SIZES.base,}}
       >
        <View style ={{height:65,width: 65, justifyContent:'center', alignItems:'center', backgroundColor: COLORS.white,borderRadius:35, borderWidth:3,borderColor: COLORS.primary}}>
          <Text style ={{...FONTS.h2,color: COLORS.darkPrimary}}>{user.cgpa}</Text>
        </View>  
        <View style ={{backgroundColor:COLORS.ligthGray, padding:5,borderRadius:10}}>
          <Text style ={{...FONTS.h3,color: COLORS.white}}>Your current CGPA</Text>
          <Text style ={{...FONTS.body4,color: COLORS.white}}>Last updated - sep.10.2021</Text>
        </View>  
      </ImageBackground>
    )
  }

  const renderhomeHeader =() => {
    return (
      <View style ={{marginHorizontal: SIZES.padding, alignItems: 'center', marginTop: Platform.OS =='android' ? SIZES.padding: '', flexDirection: 'row', justifyContent: 'space-between', }}>
        <View>
          <Text style ={{...FONTS.body3, color: COLORS.darkPrimary}}>Welcome, {user.first_name}</Text>
          <Text style ={{...FONTS.h2, color: COLORS.darkPrimary}}>Your statistic</Text>
        </View>
          <Image
            source={user.profile_url}
            resizeMode ='cover'
            style ={{
              width: 45,
              height: 45,
              borderRadius: SIZES.padding2 
            }}
          />
      </View>
    )
  }


  return (
    <Fragment>
      <StatusBar backgroundColor={COLORS.primary} barStyle={ Platform.OS === 'android'? 'light-content': 'dark-content'} />
      <SafeAreaView> 
        <ScrollView>
          {renderhomeHeader()}
          {renderShowCase()}
          {renderSummary()} 
          {renderAddGrade()}
        </ScrollView>
      </SafeAreaView> 
    </Fragment>
  )
}


const styles = StyleSheet.create({})
import { StatusBar, StyleSheet, SafeAreaView, Text, View, Image, Platform, ImageBackground, FlatList, ScrollView, TouchableOpacity, ImageSourcePropType, RefreshControl } from 'react-native'
import React, { FC, Fragment, useEffect, useState } from 'react'
import { dataService, httpService } from '../../../services'
import { FONTS, rec, rec1, rec2 } from '../../../constants'
import { COLORS, SIZES } from '../../../constants/theme';
import moment from 'moment';
import { Splash } from '../../auths';
import { useIsFocused } from '@react-navigation/native';

export const Home:FC <{navigation:any}>= ({navigation}) => {

  interface User {
    full_name: string,
    profile_url: string,
    cgpa: string,
    standing: string,
    last_gpa:string
  }
  
  const [user, setuser] = useState({} as User)
  const [userSchool, setuserSchool] = useState({} as User)
  const [isLoading, setisLoading] = useState(false)
  const isFocused = useIsFocused();

  const [refreshing, setRefreshing] = useState(false);
  
  useEffect(() => {
    setuser(dataService.loggedInUser()) as unknown as User
  }, [])
  const wait = (timeout: number | undefined) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getUserSchool()
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getUserSchool = async () => {
    try {
      setisLoading(true)      
      const path = 'userschool'
  const res = await httpService.get(path);
  if (res.data.success) {
      setisLoading(false)      
      setuserSchool(res.data.data);
      
  } 
  } catch (error) {
      setisLoading(false); 
      console.log(error);
      
  }
  }

  console.log('user-------------',user);
  useEffect(() => {
    
    getUserSchool();
  }, [isFocused])
  
  const handleGradeFilter =async (evn: string) => {
  //   try {
  //     setisLoading(true)      
  //     const path = `course/course/grades?grade=${evn}`
      
  // const res = await httpService.get(path);
  // if (res.data.success) {
  //     setisLoading(false)      
  //     navigation.navigate("CourseList",{courses:res.data.data})
      
  // } 
  // } catch (error) {
  //     setisLoading(false); 
  //     console.log(error);
      
  // }
  }

  const renderAddGrade =() => { 
    return (
      <> 
       { userSchool.totalunit > 10 && <View  style = {{backgroundColor: COLORS.lightBlue,marginVertical: SIZES.padding2,padding: SIZES.padding }}>
          <Text style ={{...FONTS.h2, color: COLORS.darkPrimary}}>Status: <Text  style ={{...FONTS.h3, paddingHorizontal: SIZES.base,textTransform: 'uppercase',color: COLORS.gray}}>{userSchool?.grade_mark?.class? userSchool?.grade_mark?.class: '***'}</Text></Text>
        </View>}
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
  

  const quickActionCards  = (count: number, content: string, icon: ImageSourcePropType | undefined,color: string, index: any) => {
    return (
      <TouchableOpacity
        onPress={() => handleGradeFilter(content)}
      key = {`item-${index}`}>
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
            <Text style= {{...FONTS.h3, color: color}}>Total number of {content}</Text>
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
          {quickActionCards(count = `${userSchool.totalpoint}`, content = "Total Quanlity Points",  icon = rec, color= COLORS.white,)}
          {quickActionCards(count = `${userSchool.totalunit}`, content = "Total Units", icon = rec1, color= COLORS.primary)}
        </ScrollView>
        <ScrollView showsHorizontalScrollIndicator ={false}  horizontal>
          { 
            userSchool.gradecounts && userSchool?.gradecounts.map((item: { markCount: any; mark: any; }, index: any) => {
              return quickActionCards(count = item.markCount, content = item.mark, icon = rec2, color= COLORS.primary, index = index)
            })
          }
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
          <Text style ={{...FONTS.h2,color: COLORS.darkPrimary}}>{userSchool?.cgpa < 1 ? "": userSchool?.cgpa}</Text>
        </View>  
        <View style ={{backgroundColor:COLORS.ligthGray, padding:5,borderRadius:10}}>
          <Text style ={{...FONTS.h3,color: COLORS.white}}>Your current CGPA</Text>
          <Text style ={{...FONTS.body4,color: COLORS.white}}>Last updated - {moment(userSchool?.updated_at).format("MMM Do YYYY")}</Text>
        </View>  
      </ImageBackground>
    )
  }

  const renderhomeHeader =() => {
    return (
      <View style ={{marginHorizontal: SIZES.padding, alignItems: 'center', marginTop: Platform.OS =='android' ? SIZES.padding: '', flexDirection: 'row', justifyContent: 'space-between', }}>
        <View>
          <Text style ={{...FONTS.body3, color: COLORS.darkPrimary}}>Welcome, {user.full_name}</Text>
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
              {renderhomeHeader()}
            <ScrollView
                refreshControl={
                  <RefreshControl
                      refreshing ={refreshing}
                      onRefresh ={onRefresh}
                  />
                }
            >
              {renderShowCase()}
              {renderAddGrade()}
              {renderSummary()} 
            </ScrollView>
          </SafeAreaView> 
    </Fragment>
  )
}


const styles = StyleSheet.create({})
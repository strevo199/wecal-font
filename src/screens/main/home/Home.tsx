import { StatusBar, StyleSheet, SafeAreaView, Text, View, Image, Platform, ImageBackground, FlatList, ScrollView, TouchableOpacity, ImageSourcePropType, RefreshControl, ActivityIndicator } from 'react-native'
import React, { FC, Fragment, useContext, useEffect, useState } from 'react'
import { dataService, httpService } from '../../../services'
import { circledUser, FONTS, rec, rec1, rec2 } from '../../../constants'
import { COLORS, SIZES } from '../../../constants/theme';
import moment, { MomentInput } from 'moment';
import { Splash } from '../../auths';
import { useIsFocused } from '@react-navigation/native';
import { UserContext } from '../../../services/context';
import Animated,{BounceIn, FadeIn} from 'react-native-reanimated';


export const Home:FC <{navigation:any}>= ({navigation}) => {
    
    interface User {
        updated_at: MomentInput;
        gradecounts: any;
        totalunit: any;
    totalpoint: any;
    full_name: string,
    profile_url: string,
    cgpa: string,
    standing: string,
    last_gpa:string
}

const [user, setuser] = useState({} as User)
const {LoadUserSchool,userSchool,LoadCourses} = useContext(UserContext)


useEffect(() => {
    setuser(dataService.loggedInUser()) as unknown as User
}, [])


useEffect(() => {
    LoadUserSchool();
    console.log('userSchool---------',userSchool);
    
    LoadCourses();
}, [])


const RenderHeaderComponent =() =>  (
        <View>
            {renderShowCase()}
            {renderAddGrade()}
        </View>
    )

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
         <View>
             <View style ={{marginHorizontal: SIZES.padding,justifyContent:'space-between', flexDirection:'row',alignItems: 'center'}}>
               <Text style= {{...FONTS.h3, color: COLORS.primary}}>Summary</Text>
               <Text style= {{...FONTS.h1, color: COLORS.link}}>...</Text>
             </View> 
             <View>
               <View style ={{marginVertical: SIZES.padding2, flexDirection: 'row', justifyContent: 'space-between'}} >
                 {quickSummaryCards(`${userSchool.totalpoint}`,"Total Quanlity Points",rec,COLORS.white,)}
                 {quickSummaryCards(`${userSchool.totalunit}`,"Total Units",rec1,COLORS.primary)}
               </View>
             </View>
           </View>
      </> 
    )
  }
  

  const quickSummaryCards  = (count: string, content: string, icon: ImageSourcePropType | undefined,color: string) => {
    return (
      <View
      >
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
      </View>
    ) 
  }   
  const quickActionCards  = (count: number, content: string, icon: ImageSourcePropType | undefined,color: string) => {
    return (
      <Animated.View entering={BounceIn.delay(500)}>
        <TouchableOpacity
          onPress={() =>       navigation.navigate("GradeCourse",{grade:content})
        }
        >
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
      </Animated.View>
    ) 
  }   

  const renderSummary =() => { 


    return (
      <>
        {
          userSchool?.gradecounts ?
           
            <FlatList
                ListHeaderComponent={RenderHeaderComponent}
                ListFooterComponent ={<View style ={{marginBottom: 130}}></View>}
                showsVerticalScrollIndicator ={false}
                data={userSchool.gradecounts && userSchool?.gradecounts}
                keyExtractor = {item => `item-${item.index}`}
                numColumns ={2}
                contentContainerStyle ={{
                    marginHorizontal: SIZES.padding
                }} 
                columnWrapperStyle={{
                    justifyContent: 'space-between', 
                    marginVertical: SIZES.padding
                }}
                renderItem ={({item}) => quickActionCards(item.markCount, item.mark,rec2,COLORS.primary)}
            />
          :
            <View>
              <ActivityIndicator size={'large'} color = {COLORS.primary}/>

            </View>
        }
      </>
    )
  }


  const renderShowCase =() => {
    return (
      <ImageBackground
        source={rec}
        resizeMode ='cover'
        style ={{ flexDirection:'row', justifyContent: 'space-around',marginVertical: SIZES.h2, alignItems: 'center',padding: SIZES.h1}}
        imageStyle={{ borderRadius: SIZES.base,}}
       >
        <View style ={{height:65,width: 65, justifyContent:'center', alignItems:'center', backgroundColor: COLORS.white,borderRadius:35, borderWidth:3,borderColor: COLORS.primary}}>
          <Text style ={{...FONTS.h2,color: COLORS.darkPrimary}}>{parseInt(userSchool?.cgpa) < 1 ? "": userSchool?.cgpa}</Text>
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
      <View style ={{marginHorizontal: SIZES.padding, alignItems: 'center', marginTop: Platform.OS =='android' ? SIZES.padding: 0, flexDirection: 'row', justifyContent: 'space-between', }}>
        <View>
          <Text style ={{...FONTS.body3, color: COLORS.darkPrimary}}>Welcome, {user.full_name}</Text>
          <Text style ={{...FONTS.h2, color: COLORS.darkPrimary}}>Your statistic</Text>
        </View>
          <Image
            source={user.profile_url? user.profile_url: circledUser}
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
    <Animated.View entering={FadeIn.duration(700)}>
          <StatusBar backgroundColor={COLORS.primary} barStyle={ Platform.OS === 'android'? 'light-content': 'dark-content'} />
          <SafeAreaView>
              {renderhomeHeader()}
              {renderSummary()} 
          </SafeAreaView> 
    </Animated.View>
  )
}


const styles = StyleSheet.create({})
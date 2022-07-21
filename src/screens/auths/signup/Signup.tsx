import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native'; 
import React, {FC, useEffect, useRef, useState} from 'react';

import LinearGradient from 'react-native-linear-gradient';
import { img7, profile4 } from '../../../constants/images';
import { ActionButton, ParagraphText, TextInputField } from '../../../components';
import { SIZES, COLORS, FONTS } from '../../../constants/theme';
import { handleSignup } from './Signup.logic';
import { rec1 } from '../../../constants/icons';
import PhoneInput from 'react-native-phone-number-input';
import { Dropdown } from '../../../components/DropSelect';
import { httpService } from '../../../services/http.service';
import { Item } from 'react-native-picker-select';
export const Signup:FC <{navigation: any}>= ({navigation}) => {

  const [firstName, setFirstName] = useState('')
  const [isLoading, setisLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [course_of_study, setcourseOfStudy] = useState('')
  const [school, setSchoolName] = useState('')
  const [schools, setSchoolNames] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const phoneInput = useRef<PhoneInput>(null)

   const getSchool = async () => {
        
    try {
        const path = 'school';
        const res = await httpService.get(path)
        if (res.data.success) {
           const items = res.data.data.map((item:any) => {
                return (
                   { label: item.name, 
                    value: item._id    
                }
                )
            })
            setSchoolNames(items)
        }
    } catch (error) {
        console.log(error);
        
    }
           
        
    }

    useEffect(() => {
        getSchool()
    }, [])
    
    

  return (
    <ScrollView style={{
      flex: 1,
    }}>
    <ImageBackground
      source={rec1}
      resizeMode="cover"
      imageStyle ={{
        opacity:1
      }}
      style={{
        flex: 1,
      }}>
        

      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <View 
          style={{
            marginLeft: SIZES.padding * 2,
          }}> 
          <ParagraphText
            message= {'Sign up'}
            style={{color: COLORS.darkPrimary, ...FONTS.largeTitle}}
          />
        </View> 
        <View
          style={{
            // backgroundColor: COLORS.transparentBlack,
            borderRadius: SIZES.radius,
            padding: SIZES.padding,
            paddingVertical: SIZES.h1,
            marginHorizontal: SIZES.padding,
            marginVertical: SIZES.padding * 2,
          }}>
          
          {/* emial */} 
          
          <View>
          <TextInputField multiline={false} 
                placeholder={'Steve Example'} style={{
                borderColor: COLORS.primary,
                borderWidth: 2,
                backgroundColor: COLORS.white,
              }} setValue={setFirstName}
              hint={'enter your fullname'} 
               secureTextEntry={false} value={firstName}/>
          </View>
          <View>
              <Dropdown itemList={schools} getValue= {setSchoolName} placeholderLabel= {'Select your school'} hint={''}/>
          </View>
          {/* emial */} 
          
          <View>
          <TextInputField multiline={false}  
                placeholder={'e.g example@gmail.com'} style={{
                borderColor: COLORS.primary,
                borderWidth: 2,
                backgroundColor: COLORS.white,
              }} setValue={setEmail} 
              hint={'enter your email'} 
               secureTextEntry={false} value={email}/>
          </View>
          <View>
          <TextInputField multiline={false} 
                placeholder={'e.g Physics'} style={{
                borderColor: COLORS.primary,
                borderWidth: 2,
                backgroundColor: COLORS.white,
              }} setValue={setcourseOfStudy} 
              hint={'enter course of study'} 
               secureTextEntry={false} value={course_of_study}/>
          </View>

          <View>
          <TextInputField multiline={false} 
            placeholder={'***********'} 
            style={{
              borderColor: COLORS.primary,
              borderWidth: 2,
              backgroundColor: COLORS.white,
            }}
            setValue={setPassword} 
            hint={'enter your password'} 
            secureTextEntry={true}
            
            value={password}/>
          </View>
          <View style ={{marginTop: SIZES.padding}}>
        <PhoneInput
            ref={phoneInput}
            defaultCode="NG"
            // defaultValue= {regData?.phone_number}
            onChangeCountry ={(e) => console.log(e)}
            layout = "first" 
            textInputStyle = {{color: COLORS.darkgray}}
            textContainerStyle ={{height:"100%"}}
            codeTextStyle ={{display:'none'}}
            onChangeFormattedText={(text) => {
              setPhoneNumber(text);
            }}
            containerStyle ={{width:'100%',borderColor:COLORS.gray, borderWidth:1, borderRadius:4, backgroundColor: COLORS.white, height: 55}}
            placeholder = {"Enter your phone number"}
          />
      </View>
          <View
            style={{
              marginTop: SIZES.base,
            }}>
              <ActionButton title={isLoading? <ActivityIndicator color={COLORS.white}/> :'Agree and continue'} handleAction={() =>handleSignup(firstName,email,password,setisLoading,navigation,school,course_of_study,phoneNumber)} style={{backgroundColor: COLORS.primary}}/>
          </View>
          

          {/*  */}
          <View style ={{marginVertical: SIZES.padding}}>
            <ParagraphText
              style={{color: COLORS.white}}
              message={"By selecting Agree and continue below,"}
            />
            <View style ={{flexDirection: 'row'}}>
              <ParagraphText
                style={{color: COLORS.white}}
                message={"i agree to "}
              />

              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <ParagraphText
                  style={{color: COLORS.lime,...FONTS.h3}}
                  message={'Terms and Privacy Policy'}
                />
              </TouchableOpacity>

            </View>
          </View>
          {/*  */}
          <View style = {{flexDirection: 'row', backgroundColor: COLORS.lightBlue}}>
                <ParagraphText
                  style={{color: COLORS.white}}
                  message={'Already have an account, '}
                />
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}>
              <ParagraphText
                style={{color: COLORS.lime,...FONTS.h3}}
                message={'Login '}
              />
            </TouchableOpacity> 
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
        </ScrollView>
  );
};

const styles = StyleSheet.create({});
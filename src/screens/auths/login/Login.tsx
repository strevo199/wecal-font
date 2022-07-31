import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableOpacity,
  View,
  StatusBar,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {FC, useState, useContext} from 'react';
import {
  COLORS,
  FONTS,
  rec1,
  SIZES,
} from '../../../constants';
import LinearGradient from 'react-native-linear-gradient';
import { ActionButton, ParagraphText, TextInputField } from '../../../components';
import { handleLogin } from './Login.logic';
import { httpService } from '../../../services';
import { AuthContext } from '../../../services/context';

export const Login:FC <{navigation: any}>= ({navigation}) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [userSchool, setuserSchool] = useState(false)
  const {SignIn} = useContext(AuthContext)

 



  return (
    <KeyboardAvoidingView
    style={{flex: 1}}
    behavior={Platform.OS === 'ios' ? 'padding' : null}
    >

    <StatusBar barStyle={Platform.OS !=='ios'?'light-content': 'dark-content'}/>
    <ImageBackground
      source={rec1}
      resizeMode="cover"
      imageStyle ={{
        opacity:0.8
      }}
      style={{
        flex: 1,
        
      }}>
      <SafeAreaView
        style={{
          flex: 1,
          // justifyContent: 'center',
        }}>
        <View
          style={{
            alignItems: 'center',
            marginBottom:SIZES.largeTitle*2
          }}>
          <ParagraphText
            message= {'Wecal'}
            style={{color: COLORS.lightBlue, ...FONTS.largeTitle}}
          />
        </View>
        <View
          style={{
            marginLeft: SIZES.padding * 2,
          }}>
          <ParagraphText
            message= {'Log in'}
            style={{color: COLORS.darkPrimary, ...FONTS.largeTitle}}
          />
        </View>
        <View
          style={{
            backgroundColor: COLORS.transparentBlack,
            borderRadius: SIZES.radius,
            padding: SIZES.padding,
            paddingVertical:SIZES.h1,
            marginHorizontal: SIZES.padding,
            marginVertical: SIZES.h1,
          }}>

          {/* emial */} 
          
          <View>
            <TextInputField multiline={false} 
                placeholder={'Enter Email'} style={{
                borderColor: COLORS.primary,
                borderWidth: 2,
                backgroundColor: COLORS.white,
              }} setValue={setEmail} hint={undefined}
               secureTextEntry={false} value={email}/>
          </View>
          {/* password */}

          <View>
            <TextInputField multiline={false} 
            placeholder={'enter your password'} 
            style={{
              borderColor: COLORS.primary,
              borderWidth: 2,
              backgroundColor: COLORS.white,
            }}
            setValue={setPassword} 
            hint={''}  
            secureTextEntry={true}
            
            value={password}/>
          </View>
          <View
            style={{
              marginTop: SIZES.base,  
              flexDirection: 'row',
              justifyContent: 'flex-end'
            }}>
              <ActionButton  title={isLoading? <ActivityIndicator color={COLORS.white}/> :'Login'}  handleAction={() =>handleLogin(email,password, setIsLoading,SignIn)} style={{backgroundColor: COLORS.primary, width: SIZES.width/4}}/>
          </View>

          <View style ={{flexDirection: 'row', marginVertical: SIZES.padding}}>
            <ParagraphText 
              style={{color: COLORS.white}}
              message={"Don't have an account? "}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <ParagraphText
                 style={{color: COLORS.lime,...FONTS.h3}}
                message={'Sign up'}
              />
            </TouchableOpacity>
          </View>
          {/*  */}
          <View>
            <TouchableOpacity
            style = {{flexDirection: 'row', backgroundColor: COLORS.lightBlue}}
              onPress={() => navigation.navigate('ResetPassword')}>
              <ParagraphText
                 style={{color: COLORS.lime,...FONTS.h3}}
                message={'Forgot your password?'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
    </KeyboardAvoidingView>

  );
};

const styles = StyleSheet.create({});

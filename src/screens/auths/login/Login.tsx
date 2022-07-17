import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import React, {FC, Fragment, useState} from 'react';
import {
  COLORS,
  FONTS,
  SIZES,
} from '../../../constants';
import LinearGradient from 'react-native-linear-gradient';
import { img7, profile4 } from '../../../constants/images';
import { ActionButton, ParagraphText, TextInputField } from '../../../components';
import { handleClearEmail, handleEmailExist, handleLogin } from './Login.logic';

export const Login:FC <{navigation: any}>= ({navigation}) => {

  const [emailExist, setemailExist] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

 

  return (
    <Fragment>

    <StatusBar barStyle={'light-content'}/>
    <ImageBackground
      source={profile4}
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
          justifyContent: 'center',
        }}>
        <View
          style={{
            marginLeft: SIZES.padding * 2,
          }}>
          <ParagraphText
            message= {emailExist ? 'Log in': 'Hi!'}
            style={{color: COLORS.white, ...FONTS.largeTitle}}
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
          {/*  */} 
          { emailExist && <View
            style={{
              flexDirection: 'row',
              marginVertical: SIZES.base,
            }}>
            <Image
              source={img7}
              resizeMode="contain"
              style={{
                width: 50,
                borderRadius: 25,
                height: 50,
                marginRight: 15,
              }}
            />
            <View>
              <ParagraphText
                message={'Stephen Isaac'}
                style={{color: COLORS.white, ...FONTS.body2}}
              />
              <ParagraphText
                style={{color: COLORS.white, ...FONTS.body3}}
                message={'stephenisaac@gmail.com'}
              />
            </View> 
          </View>}
          {/* emial */} 
          
          {!emailExist && <View>
            <TextInputField multiline={false} 
                placeholder={'Enter Email'} style={{
                borderColor: COLORS.primary,
                borderWidth: 2,
                backgroundColor: COLORS.white,
              }} setValue={setEmail} hint={undefined}
               secureTextEntry={false} value={email}/>
          </View>}
          {/* password */}

          {emailExist && <View>
            <TextInputField multiline={false} 
            placeholder={'enter your password'} 
            style={{
              borderColor: COLORS.primary,
              borderWidth: 2,
              backgroundColor: COLORS.white,
            }}
            setValue={setPassword} 
            hint={'enter your password'}  
            secureTextEntry={true}
            
            value={password}/>
          </View>}
          <View
            style={{
              marginTop: SIZES.base,  
              flexDirection: 'row',
              justifyContent: 'space-between' 
            }}>
              {
                emailExist ? 
                <ActionButton title={'back'} handleAction={() =>handleClearEmail(setEmail,setemailExist)} style={{backgroundColor: COLORS.darkPrimary,width: SIZES.width/4}}/>
                :
                <ActionButton title={''} handleAction={undefined} style={undefined}/>

              }
              <ActionButton title={'Continue'} handleAction={!emailExist ? () =>handleEmailExist(email,setemailExist) : () =>handleLogin(password)} style={{backgroundColor: COLORS.primary, width: SIZES.width/4}}/>
          </View>
 
          <View style={{alignItems: 'center', marginVertical: SIZES.base}}>
            <ParagraphText style={{color: COLORS.white}} message={'or'} />
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
    </Fragment>

  );
};

const styles = StyleSheet.create({});

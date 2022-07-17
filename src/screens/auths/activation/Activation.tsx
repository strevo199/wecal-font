import { ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { Fragment, FC, useState, useEffect } from 'react'
import { rec1 } from '../../../constants/icons'
import { ActionButton, ParagraphText } from '../../../components'
import { FONTS, SIZES } from '../../../constants'
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field'
import { StackNavigationProp } from '@react-navigation/stack'
import { Route } from '@react-navigation/native'
import { styles } from './Activation.styles'
import { COLORS } from '../../../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import { httpService } from '../../../services/http.service'
import { dataService } from '../../../services'
import Snackbar from 'react-native-snackbar'

interface ActivationProps {
  route: Route<any>,
  navigation: StackNavigationProp<any>
}

const CELL_COUNT = 6;

export const Activation:FC <ActivationProps>= ({route,navigation}) => {

  const [value, setValue] = useState('')
  const [isLoading, setisLoading] = useState(false)

  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const {token,user} = route.params
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
});

  const handleActivaion = async () => {
    setisLoading(true)
    
    const body = {
      token,
      user
    }
    console.log('----------wwww-',body);

    try {
      const path = 'activation'
  const res = await httpService.post(path,body);
  if (res.data.success) {
      setisLoading(false)
      console.log('-----------t------',res.data);
      
      // await AsyncStorage.multiSet([
      //   ['logintoken','alalalala'],
      //   ['user', JSON.stringify(user)]
      // ])
      // RNRestart.Restart()
      Snackbar.show({
          text: res.data.message,
          duration: 3000,
          backgroundColor: COLORS.darkPrimary,
          textColor: COLORS.white
      })
  }
  } catch (error) {
      setisLoading(false);
      console.log(error);
      
  }
     
  }

  

  return (
    <Fragment>
      <StatusBar barStyle={'light-content'} />
      <ImageBackground 
        source={rec1}
        resizeMode ='cover' 
        imageStyle ={{opacity:0.7}}
      style ={{flex: 1}}>   
        <View style ={{marginHorizontal: SIZES.padding, marginTop: SIZES.h4}}>
          <ParagraphText message={'Enter the 6-digit code sent to you at example@domain.com'} style={{...FONTS.h2}}/>
        </View>
        <View style ={{marginHorizontal: SIZES.padding, flex: 1, justifyContent:'center'}}>
        <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}> 
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
        </View>
            <View style ={{marginHorizontal: SIZES.h2,flex:1}}>
              <ActionButton title={'Activate'} handleAction={handleActivaion} style={{backgroundColor: COLORS.primary}}/>
            </View>
      </ImageBackground> 
    </Fragment>
  ) 
}
 


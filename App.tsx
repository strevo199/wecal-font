import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useMemo, useReducer, useState } from 'react';
import 'react-native-gesture-handler';
import { dataService } from './src/services/data.service';
import { RegNavScreen, MainNavScreen } from './src/navigation/NavScreen';
import SplashScreen from 'react-native-splash-screen';
import { AuthContext } from './src/services/context';
import { Splash } from './src/screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';



const App = () => {

  const initialLoginState = {
    isLoading: true,
    user: dataService.loggedInUser(),
    userToken: dataService.authToken,
  }

  const loginReducer = (prevState: any, action: any) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false
        };
      case 'LOGIN':
        return {
          ...prevState,
          user:action.user,
          userToken: action.token,
          isLoading: false
        };
      case 'LOGOUT':
        
        return {
          ...prevState,
          // user: null,
          // userToken: null,
          isLoading: false
        };
      case 'REGISTER':
        return {
          ...prevState,
          userToken: action.token,
          user:action.user,
          isLoading: false
        };
        
    }
  }

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState)


  const authContent = useMemo(() => ({
    SignIn: async (token: any,user: any) => {    
       
      await AsyncStorage.multiSet([
      ['token', token],
      ['user', JSON.stringify(user)]

      ])      
      dispatch({type: 'LOGIN', user: user, token: token})
    },

    SignOut: async () => {
      try {
        await AsyncStorage.clear(c => {
          if (c == null) {
             dispatch({type: 'LOGOUT'})    
             RNRestart.Restart()
                  
          }
          
        }); 
    } catch (error) {
        console.log(error);
        
    }
    },user: loginState.user,

    Activate: (token: any,user: any) => {
      dispatch({type: 'REGISTER', token: token,user: user})
    }
  }), []) 



  useEffect(() => {

    setTimeout(() => {
      SplashScreen.hide();
      dispatch({type: 'RETRIEVE_TOKEN', token: dataService.authToken()})
           }, 1000);
    
  }, [loginState.isLoading])  

  
    if (loginState.isLoading) {
       return <Splash/>
    }
    return (
    <AuthContext.Provider value = {authContent}>
        {loginState.userToken !== null ?  <MainNavScreen/>:
         <RegNavScreen/>}
    </AuthContext.Provider>)
}

export default App

const styles = StyleSheet.create({})
import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { dataService } from './src/services/data.service';
import { RegNavScreen, MainNavScreen } from './src/navigation/NavScreen';
import SplashScreen from 'react-native-splash-screen';



const App = () => {
  const [token, setToken] = useState('')
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    SplashScreen.hide();
  }, [])
  

  useEffect(() => {
    const t: string =  dataService.authToken();
      
    setToken(t) 
    setTimeout(() => {
      SplashScreen.hide();
      setisLoading(false)
    }, 2000);
    
  }, [isLoading,token]) 
  
  
  if (token === '') {
   return <RegNavScreen/> 
  } 
  else{ 
  return ( 
    <MainNavScreen/>
  )}
}

export default App

const styles = StyleSheet.create({})
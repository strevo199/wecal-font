import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { dataService } from './src/services/data.service';
import { RegNavScreen, MainNavScreen } from './src/navigation/NavScreen';
import { Splash } from './src/screens/auths';



const App = () => {
  const [token, setToken] = useState('')
  const [isLoading, setisLoading] = useState(true)

  useEffect(() => {
    const t: string =  dataService.authToken();
      
    setToken(t) 
    setTimeout(() => {
      setisLoading(false)
    }, 2000);
    
  }, [isLoading])

  if (isLoading) {
    return ( 
      <Splash/>
    )
  } 

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
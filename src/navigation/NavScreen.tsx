import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AddGrade, Courseview, Home } from '../screens';
import { HomeTab } from './Tab';
import { COLORS } from '../constants/theme';
import { Activation, Login, Signup } from '../screens/auths';

const Stack = createStackNavigator();

export const RegNavScreen = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator> 
             {/* <Stack.Screen
            
            name = "Login" 
            options={{headerShown: false}}
            component={Login} /> */}
            <Stack.Screen 
            name = "Signup" 
            options={{headerShown: false}}
            component={Signup} />
            <Stack.Screen 
            name = "Activation" 
            options={{
              headerTitleStyle: {
                color: COLORS.white
              },
              headerStyle: {
                backgroundColor: COLORS.primary
              },
              headerTintColor:COLORS.white
            }}
            component={Activation} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}


export const MainNavScreen = () => { 
  return (
    <NavigationContainer>
        <Stack.Navigator>
           <Stack.Screen 
               options={{headerShown: false}}
            name = "Home" component={HomeTab} />
            <Stack.Screen 
               options={{
                  headerStyle: {
                    backgroundColor: COLORS.primary,
                  },
                  headerBackTitle: ' ',
                  headerTintColor: COLORS.white, 
                  headerTitle: 'Add Grade',
                  headerTitleStyle: {
                    color: COLORS.white
                  }
               }}
            name = "AddGrade" component={AddGrade}/>
            <Stack.Screen  
               options={{
                  headerStyle: {
                    backgroundColor: COLORS.primary,
                  },
                  headerBackTitle: ' ',
                  headerTintColor: COLORS.white,
                  headerTitle: 'Course view ',
                  headerTitleStyle: {
                    color: COLORS.white
                  }
               }}
            name = "Courseview" component={Courseview}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}




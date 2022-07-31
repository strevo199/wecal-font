import React, { useEffect, useMemo, useReducer, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AddGrade, Courseview, GradeCourse, Home } from '../screens';
import { HomeTab } from './Tab';
import { COLORS } from '../constants/theme';
import { Activation, Login, Signup, Splash } from '../screens/auths';
import { UserContext } from '../services/context';
import { httpService } from '../services/http.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dataService } from '../services/data.service';
import { eventService } from '../services/event.services';

const Stack = createStackNavigator();

export const RegNavScreen = () => {


  

  return (
    <NavigationContainer>
        <Stack.Navigator> 
             <Stack.Screen
            
            name = "Login" 
            options={{headerShown: false}}
            component={Login} />
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

    const initialUserState = {
        courses: dataService.courses(),
        userSchool: dataService.userSchool(),
        isLoading: true,
        refresh: false
    }

    const userReducer = (prevState: any, action: any) => {
        switch (action.type) {
            case 'GETUSERSCHOOL':
                return { 
                    ...prevState,
                    userSchool: action.userSchool,
                    isLoading:  false 
                };
            case 'GETCOURSES':
                return {
                    ...prevState,
                    courses: action.courses,
                    isLoading:  false 
                };
            case 'ADDCOURSE':
                return {
                    ...prevState,
                    isLoading:  false,
                    courses: [...prevState.courses,action.course]
                };
            case 'DELETEONECOURSE':
                
                return {
                    ...prevState,          
                    isLoading: false,
                    courses: action.courses
                }
        }
    }
    const [userState, dispatch] = useReducer(userReducer, initialUserState)
 
  const userContext = useMemo(() => ({
      LoadUserSchool: async () => {
          
        if (userState.userSchool !== null) {          
          dispatch({type:'GETUSERSCHOOL', userSchool: userState.userSchool});                        
        } else {
          try {
              userState.isLoading;
              const path = 'userschool'
          const res = await httpService.get(path);
          if (res.data.success) {
              
              await AsyncStorage.setItem("userschool",JSON.stringify(res.data.data));
              dispatch({type:'GETUSERSCHOOL', userSchool: res.data.data});                        
          }  
          } catch (error) {   
          }
          
        }

        

        
      },
      AddCourse: (course: any) => {        
        dispatch({type: 'ADDCOURSE', course});
        // eventService.reloadUserSchool();
        eventService.reloadCourses();
      },
      DeleteCourse: (id: string) => {    
        dispatch({type: 'DELETEONECOURSE', courses:userState.courses.filter((item:any) => (item._id !== id))})
        eventService.reloadCourses();
      }
      ,
      LoadCourses: async () => {
             
        if (userState.courses.length) {
          dispatch({type: 'GETCOURSES', courses: userState.courses})
        } else {
          try {
              userState.isLoading; 
              const path = 'course'
          const res = await httpService.get(path);
          if (res.data.success) {
              dispatch({type: 'GETCOURSES', courses: res.data.data})
              await AsyncStorage.setItem("courses",JSON.stringify(res.data.data));
          }
          } catch (error) {
          }
        }
      },
      userSchool: userState.userSchool,
      courses: userState.courses,
      
  }), [userState])


  return (
    <UserContext.Provider value={userContext}>
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
              <Stack.Screen  
                options={{
                  headerStyle: {
                    backgroundColor: COLORS.primary,
                  },
                  headerBackTitle: ' ',
                  headerTintColor: COLORS.white,
                  headerTitle: 'Course List ',
                  headerTitleStyle: {
                    color: COLORS.white
                  }
              }}
              name = "GradeCourse" component={GradeCourse}/>
          </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  )

}




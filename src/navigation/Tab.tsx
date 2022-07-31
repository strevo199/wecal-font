import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS, SIZES } from '../constants/theme';
import { cube, home, list, search, setting } from '../constants';
import { CourseList, Home, Profile } from '../screens';
import { ActionIcon } from '../components/ActionIcon';
import { handleSearchAction } from './Tab.logic';

const Tab = createBottomTabNavigator();

export const HomeTab = () => {


  const [toggleSearch, settoggleSearch] = useState(false);

  
  return (
    <Tab.Navigator
        initialRouteName="MainHome"
      
      screenOptions = {
        ({route}) => ({
        tabBarIcon: ({focused}) => {
          const tintColor = focused ? COLORS.primary : COLORS.secondary;

          switch (route.name) {
            case 'MainHome':
              return (
                <Image
                  source={home}
                  resizeMode = {'contain'}
                  style ={{
                    tintColor: tintColor,
                    width: 25,
                    height: 25
                  }}

                /> 
              )
            case 'CourseList':
              return (
                <Image
                  source={list}
                  resizeMode = {'contain'}
                  style ={{
                    tintColor: tintColor,
                    width: 25,
                    height: 25
                  }}

                />
              )
            case 'Profile':
              return (
                <Image
                  source={setting}
                  resizeMode = {'contain'}
                  style ={{
                    tintColor: tintColor,
                    width: 25,
                    height: 25
                  }}

                />
              )
          }
        }
      })}
    >
        <Tab.Screen
            options={{ 
              headerShown: false,
              title: 'Home',
              unmountOnBlur: true
           }}
          component={Home} name='MainHome' />
        <Tab.Screen 
            options={{ 
                  title: 'Course List',
                  headerTitleStyle: {
                      color:COLORS.white},
                  headerStyle: {
                      backgroundColor: COLORS.primary, 
                  },
                headerRight: () => {
                  return (
                    <View style ={{marginRight: SIZES.padding}}>
                      <ActionIcon color={COLORS.white} handleAction={() =>handleSearchAction(settoggleSearch,toggleSearch)}  icon={search}/>
                    </View>
                  )
                }
            }}
        name='CourseList'>{(props) => <CourseList {...props} toggleSearch ={toggleSearch}/>}</Tab.Screen>
        <Tab.Screen options={{
          headerTitleStyle: {
            color: COLORS.white
          },
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
        }} component={Profile} name='Profile' />
    </Tab.Navigator>
  )
}


const styles = StyleSheet.create({})
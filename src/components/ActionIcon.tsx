import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { menuVertical } from '../constants/icons';



export const ActionIcon:React.FC <{color:any; handleAction: any;icon:any}>= ({color,handleAction,icon}) => {
  
  return (
    <TouchableOpacity
        onPress={handleAction}
    >
      <Image
        source={icon}
        style={{
          width: 23,
          height: 23,
          tintColor: color
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

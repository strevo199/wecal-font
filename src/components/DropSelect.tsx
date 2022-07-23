import RNPickerSelect from 'react-native-picker-select';
import React, { FC } from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants/theme';

export const Dropdown:FC <{itemList: any, getValue: (a:string) => void, placeholderLabel: string,hint: string}>= ({itemList, getValue, placeholderLabel, hint}) => {   

    return ( 
        <>
        <View
            style ={styles.pickerSelectStyles}
        >

            <RNPickerSelect
                onValueChange={(value) => getValue(value)}
                items={itemList}
                placeholder={{
                    label: placeholderLabel,
                    color:COLORS.primary
                }}
                
            /> 
        </View>
            <Text style ={{...FONTS.body5, color: COLORS.gray}}>{hint}</Text>
        </>
    );
};


const styles = StyleSheet.create({
    pickerSelectStyles: {
        borderWidth: 1.5,
        borderColor: COLORS.darkPrimary,
        paddingLeft:SIZES.padding,
        borderRadius: SIZES.padding,
        backgroundColor:COLORS.white,
        height: 50,
        justifyContent: 'center'
    }
})
import { Dispatch, FC, SetStateAction } from "react";
import { Alert } from "react-native";
import axios from "axios";
import { baseUrl, httpService } from "../../../services/http.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../../../constants/theme";
import Snackbar from "react-native-snackbar";

  

  
  export const handleSignup= async (lastName: string,firstName: string,isLoading: boolean,email: string,password: string,setisLoading: Dispatch<SetStateAction<boolean>>,navigation:any,school_country: string,school_name: string,course_of_study: string, phoneNumber: string) => {
    setisLoading(true)
    if (password && lastName && firstName && email && school_country && school_name && course_of_study && phoneNumber) {
        const signupData = {
            password: password,
            last_name: lastName,
            first_name: firstName,
            email,
            phone:phoneNumber,
            school_country,
            school_name,
            course_of_study,
        }


            try {
                const path = 'account/signup'
            const res = await httpService.post(path,signupData);
            if (res.data.success) {
                setisLoading(false)
                await AsyncStorage.setItem('token',res.data.token)
                Snackbar.show({
                    text: res.data.message,
                    duration: 3000,
                    backgroundColor: COLORS.darkPrimary,
                    textColor: COLORS.white
                })
                navigation.navigate('Activation', {token:res.data.token,user:res.data.user._id})
            }
            } catch (error) {
                setisLoading(false);
                console.log(error);
                
            }
    }else {
        setisLoading(false)

    }
  }
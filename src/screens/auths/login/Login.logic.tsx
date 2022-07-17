import AsyncStorage from "@react-native-async-storage/async-storage";
import { SetStateAction } from "react";
import { user } from "../../../constants";
import { dataService } from '../../../services/data.service';
import RNRestart from 'react-native-restart';


export const handleEmailExist = (email: string,setemailExist: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; }) => {
     console.log("handleEmailExist---------",email);
    if (email) {
      setemailExist(true); 
    }  
  }
  
  export const handleLogin = async (password: string) => {
    console.log('dataService.authToken()--------',dataService.authToken());
    await AsyncStorage.multiSet([
      ['token','alalalala'],
      ['user', JSON.stringify(user)]
    ])
    RNRestart.Restart()
  }
  export const handleClearEmail = (setEmail: { (value: SetStateAction<string>): void; (arg0: string): void; },setemailExist: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; }) => {
    setEmail('')
    setemailExist(false);

  }


//   const handleLogin = async () => {
//     setLoading(true);
//     try {
//       const path = 'auth/login';
//       const res = await httpService.post(path, loginData);
//       const cb = () => {
//         console.log('data stored');
//       };
//       if (res) {
//         setLoading(false);

//         navigation.navigate('Dashboard');
//         // await AsyncStorage.setItem('user', JSON.stringify(res.data.user));
//         await AsyncStorage.multiSet([
//           ['token', res.data.accesstoken],
//           ['user', JSON.stringify(res.data.user)],
//           cb,
//         ]);
//         ToastAndroid.show('Welcome', ToastAndroid.LONG);
//       } else {
//         setLoading(false);
//       }
//     } catch (error) {
//       setLoading(false);
//     }
//   };
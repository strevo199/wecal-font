import AsyncStorage from "@react-native-async-storage/async-storage";
import { SetStateAction } from "react";
import { user } from "../../../constants";
import { dataService } from '../../../services/data.service';
import RNRestart from 'react-native-restart';
import { httpService } from '../../../services/http.service';


  export const handleLogin = async (email: string ,password: string, setIsLoading: any) => {

    if (email && password) {
      const body = {
        email: email,
        password: password
      }
      const path = 'account/login'
      try {
        setIsLoading(true)
      const res = await  httpService.post(path, body)
        if (res.data.success) {
          setIsLoading(false)
      await AsyncStorage.multiSet([
      ['token', res.data.token],
      ['user', JSON.stringify(res.data.user)]
      ])
      RNRestart.Restart()
        }
      } catch (error) {
        setIsLoading(false)
        console.log(error);
      }


    } else {
      setIsLoading(false)
    }


  }

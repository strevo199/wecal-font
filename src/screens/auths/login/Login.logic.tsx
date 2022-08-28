import Snackbar from "react-native-snackbar";
import { COLORS, user } from "../../../constants";

import { httpService } from '../../../services/http.service';


export const handleLogin = async (email: string ,password: string, setIsLoading: any,SignIn: any) => {


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
          SignIn(res.data.token,res.data.user)

      // await AsyncStorage.multiSet([
      // ['token', res.data.token],
      // ['user', JSON.stringify(res.data.user)]

      // ])
        }
      } catch (error) {
        setIsLoading(false)
        console.log(error);
      }


    } else {
      setIsLoading(false)
      Snackbar.show({
        text: "Fill All Fields",
        duration: 6000,
        backgroundColor: 'red',
        textColor: COLORS.white
    })
    }


  }

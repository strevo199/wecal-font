import axios from "axios";
import Snackbar from "react-native-snackbar";
import { dataService } from "./data.service";
import { COLORS } from '../constants/theme';
import AsyncStorage from "@react-native-async-storage/async-storage";
// const rootUrl = 'http://localhost:5000/';
import RNRestart from 'react-native-restart';
const rootUrl = 'https://we-cal-be.herokuapp.com/';
const api = 'api/v1';

export const baseUrl = rootUrl+api;

const token = dataService.authToken();

export const isLoading:boolean = false ; 
export const httpService = axios.create({
    baseURL:baseUrl, 
    timeout: 10000, 
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

httpService.interceptors.response.use(
    response => response,
    error => {
        const err = error.response;
        if (err) {
            console.log('----------r',err.data);
            Snackbar.show({
                text: err.data.message,
                duration: 6000,
                backgroundColor: 'red',
                textColor: COLORS.white
            })
            if (
                err.status === 401 && 
                err.data.message === "Incorrect Email or Password"
            ) {
                Snackbar.show({
                    text: err.data.message,
                    duration: 6000,
                    backgroundColor: 'red',
                    textColor: COLORS.white
                })
            } 
            // if (err.data.message == "unable to verify token") {
            //     AsyncStorage.clear();
            //     RNRestart.Restart()

            // } 
        }
    }
)


// httpService.get() {
    // const endpoint = this.baseUrl + url;
    // this.http
    //   .get<ResponseObject>(endpoint)
    //   .pipe(
    //     //  retry(3), // retry a failed request up to 3 times
    //     catchError(this.handleError) // then handle the error
    //   )
    //   .subscribe((data) => {
    //     if (!data.success) {
    //       this.showErrorMessage(data);
    //     } else {
    //       cb(data);
    //     }
    //   });
//   }


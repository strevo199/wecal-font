import AsyncStorage from "@react-native-async-storage/async-storage";
import { isLoading } from './http.service';

class DataService {
    loggedInData = {};
    storedToken = ''; 
    loginToken = ''; 

    isLoading = false;
 
    constructor() {
        const getLoggedInUser = async () => {
            try {
                const user = await AsyncStorage.getItem('user')
                if (user) {
                    this.loggedInData = JSON.parse(user)
                }
            } catch (error) {} 
        };

        const getToken =async () => {
            try { 
                const token = await AsyncStorage.getItem('token')
                if (token) {
                    this.storedToken = token;
                }
            } catch (error) {}
        }

        const getloginToken =async () => {
            try { 
                const token = await AsyncStorage.getItem('logintoken')
                if (token) {
                    this.loginToken = token;
                }
            } catch (error) {}
        }
        
        getloginToken()
        getToken();
        getLoggedInUser(); 
    } 

    loggedInUser() {
        
        return this.loggedInData;
    }
    userloginToken() {
        
        return this.loginToken; 
    }
    authToken() {
        
        return this.storedToken;
    }
    
}

export const dataService = new DataService(); 
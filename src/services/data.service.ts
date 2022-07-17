import AsyncStorage from "@react-native-async-storage/async-storage";
import { isLoading } from './http.service';

class DataService {
    loggedInData = {};
    storedToken = ''; 

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

        
        getToken();
        getLoggedInUser(); 
    } 

    loggedInUser() {
        
        return this.loggedInData;
    }

    authToken() {
        
        return this.storedToken;
    }
    
}

export const dataService = new DataService(); 
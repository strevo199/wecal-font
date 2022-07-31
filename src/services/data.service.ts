import AsyncStorage from "@react-native-async-storage/async-storage";
import RNRestart from 'react-native-restart';

class DataService {
    loggedInData = {};
    storedToken = null; 
    userSchoolData = null;
    coursesData = [];
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

        const getUserSchool = async () => {
            try {
                const userSch = await AsyncStorage.getItem('userschool');
                if (userSch) {                    
                    this.userSchoolData = JSON.parse(userSch);
                }
            } catch (error) {
                
            }
        }

        const getCourseSchool =async () => {
            try {
                const courses = await AsyncStorage.getItem('courses');
                if (courses) {
                    this.coursesData = JSON.parse(courses);
                }
            } catch (error) {
                
            }
        }

        const getToken =async () => {
            try { 
                const token = await AsyncStorage.getItem('token')
                if (token) {
                    this.storedToken = token;
                }
            } catch (error) {}
        }
      
        getUserSchool();
        getToken(); 
        getCourseSchool();
        getLoggedInUser(); 
    } 

    loggedInUser() {
        
        return this.loggedInData; 
    }
    courses() {
        return this.coursesData;
    }

    userSchool() {
        return this.userSchoolData;
    }

    async logOutUser() {
        try {
            // await AsyncStorage.clear() ;
            await AsyncStorage.multiRemove(["courses", "userschool", "user"])
            // RNRestart.Restart()
        } catch (error) {
            
        }
    } 

    authToken() {
        
        return this.storedToken;
    }
    
}

export const dataService = new DataService(); 
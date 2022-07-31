import AsyncStorage from "@react-native-async-storage/async-storage";
import { httpService } from "./http.service";
import RNRestart from 'react-native-restart';
import { dataService } from './data.service';

class EventService {
    constructor() {
        
    }
    reloadUserSchool = async () => {        
        try {
            const path = 'userschool'
            const res = await httpService.get(path);
            if (res.data.success) {            
                await AsyncStorage.setItem("userschool",JSON.stringify(res.data.data));
                RNRestart.Restart()

        }  
        } catch (error) {   
        }
    }

    reloadCourses = async () => {
        try {
            const path = 'course'
        const res = await httpService.get(path);
        if (res.data.success) {            
            await AsyncStorage.setItem("courses",JSON.stringify(res.data.data));
            this.reloadUserSchool()
        }  
        } catch (error) {   
        }
    }
}

export const eventService = new EventService();
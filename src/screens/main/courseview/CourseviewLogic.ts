import { SetStateAction } from "react";
import { Alert } from "react-native";
import Snackbar from "react-native-snackbar";
import { COLORS } from "../../../constants/theme";
import { httpService } from "../../../services/http.service";


   export const getCourse =async (setisLoading: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; },item: { _id: any; },setCourseDetail: any) => {
        try {
            setisLoading(true)      
          const path = `course/${item._id}`
          
      const res = await httpService.get(path);
      if (res.data.success) {
          setisLoading(false)      
          setCourseDetail(res.data.data);
          
      }
      } catch (error) {
          setisLoading(false); 
          console.log(error);
          
      }
      }
  

export const ConfrimDelete =async (setModalVisible: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; },navigation: { navigate: (arg0: string, arg1: string) => void; },evn: any, setisLoading: (arg0: boolean) => void) => {
    try {
        setisLoading(true)
        const path = `course/${evn._id}`
        const res = await httpService.delete(path);
        if (res.data.success) {
            setisLoading(false)
            
            Snackbar.show({
                text: 'Successfully Deleted',
                duration: 3000,
                backgroundColor: COLORS.darkPrimary,
                textColor: COLORS.white
            })
                setModalVisible(false);
                navigation.navigate("Home","Course List")
        }
    } catch (error) {
        setisLoading(false)

    }
    setModalVisible(false)
}

// export const handleEditCourse = async  (setModalVisible: { (value: SetStateAction<boolean>): void; (value: SetStateAction<boolean>): void; (arg0: boolean): void; } ,setEditModalVisible: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; },navigation: { navigate: (arg0: string, arg1: string) => void; },evn: any, setisLoading: (arg0: boolean) => void) => {
//     setEditModalVisible(true);
//     setModalVisible(false)
    
// }
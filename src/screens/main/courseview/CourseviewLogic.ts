import { SetStateAction, useContext } from "react";
import { Alert } from "react-native";
import Snackbar from "react-native-snackbar";
import { COLORS } from "../../../constants/theme";
import { httpService } from "../../../services/http.service";


export const ConfrimDelete =async (setModalVisible: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; },navigation: { navigate: (arg0: string, arg1: string) => void; },evn: any, setisLoading: (arg0: boolean) => void, DeleteCourse: any) => {
    try {
        setisLoading(true)
        const path = `course/${evn._id}`
        const res = await httpService.delete(path);
        if (res.data.success) {
            setisLoading(false)
            DeleteCourse(evn._id)
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
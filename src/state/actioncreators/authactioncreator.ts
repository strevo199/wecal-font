import axios from "axios";
import { Dispatch } from "redux"
import { AuthAction } from "../action/authaction"
import { AuthActonType } from "../actiontype/authactiontype"
const rootUrl = 'https://we-cal-be.herokuapp.com/';
const api = 'api/v1';
const baseurl = rootUrl+api

export const signup = (body: any) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        dispatch({
            type: AuthActonType.AUTHLOADING
        });
        
        try {
            const path = `${baseurl}/account/signup`
            const {data} = await axios.post(path,body)
            
            if (data.success) {
                dispatch({
                    type: AuthActonType.SIGNUP,
                    payload: {token: data.token, user: data.user}
                })
            }
        } catch (err: any) {
            dispatch({
                type: AuthActonType.AUTHERROR,
                payload: err.message
            })
        }
    }
}


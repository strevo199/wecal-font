import { dataService } from "../../services";
import { AuthAction } from "../action/authaction";
import { AuthActonType } from "../actiontype/authactiontype";

const initialState = {
    loginUser: dataService.loggedInUser(),
    token: dataService.authToken(),
    isLoading: true,
    error: null
}

interface AuthState {
    loginUser: {} | null,
    token: string | null,
    isLoading: boolean,
    error: string | null
}


export const authReducer = (state: AuthState = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActonType.AUTHLOADING:
            return {
                ...state,
                isLoading: true
            }
        case AuthActonType.SIGNUP:
            return {
                loginUser: action.payload.user,
                token: action.payload.token,
                isLoading: false,
                error: null
            };
        case AuthActonType.SIGNING:
            return {
                loginUser: action.payload.user,
                token: action.payload.token,
                isLoading: false,
                error: null
            };
        case AuthActonType.LOGOUT:
            return {
                loginUser: null,
                token: null,
                isLoading: false,
                error: null
            };
        case AuthActonType.AUTHERROR:
            return {
                ...state,
                error: action.payload
            }
                
        default:
            return state;
    }
}
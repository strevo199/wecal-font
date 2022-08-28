import { AuthActonType } from "../actiontype/authactiontype"

interface RetriveTokenAction {
    type: AuthActonType.RETRIEVETOKEN;
    payload: string
}

interface SigninAction {
    type: AuthActonType.SIGNING;
    payload: {token: string, user: {}}
}

interface SignupAction {
    type: AuthActonType.SIGNUP;
    payload: {token: string, user: {}}
}

interface AuthLogoutAction {
    type: AuthActonType.LOGOUT;
}

interface AuthErrorAction {
    type: AuthActonType.AUTHERROR;
    payload: string
}

interface AuthLoadingAction {
    type: AuthActonType.AUTHLOADING
}


export type AuthAction = 
RetriveTokenAction | 
SigninAction |
SignupAction |
AuthLogoutAction |
AuthErrorAction |
AuthLoadingAction
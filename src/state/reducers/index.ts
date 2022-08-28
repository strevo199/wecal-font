import { combineReducers } from "redux";
import { authReducer } from "./authreducer";


const reducers = combineReducers({
    auth: authReducer
})


export default reducers
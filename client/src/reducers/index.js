import { combineReducers } from 'redux';
import userReducer from "./user";
import loginReducer from './login';
import fileReducer from './file';

const rootReducer = combineReducers({
    login: loginReducer,
    user: userReducer,
    file: fileReducer
});

export default rootReducer;
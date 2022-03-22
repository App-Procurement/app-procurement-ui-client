import { combineReducers } from 'redux';
import { authConstants } from "../_constants";
import { procurement } from './procurement.reducer';
import {account} from "./account.reducer";

const appReducers = combineReducers({
    procurement, account
});

const rootReducer = (state, action) => {
    // if (action.type === authConstants.LOGOUT) {
    //     state = undefined;
    // }
    return appReducers(state, action);
}

export default rootReducer;
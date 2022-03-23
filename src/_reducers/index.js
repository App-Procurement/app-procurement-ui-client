import { combineReducers } from 'redux';
import { authConstants } from "../_constants";
import { procurement } from './procurement.reducer';


const appReducers = combineReducers({
    procurement
});

const rootReducer = (state, action) => {
    // if (action.type === authConstants.LOGOUT) {
    //     state = undefined;
    // }
    return appReducers(state, action);
}

export default rootReducer;
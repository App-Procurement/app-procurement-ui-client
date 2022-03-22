import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';

const loogerMiddleware = createLogger();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const Data={
    items:[
        {
            fname: "",
          lname: "",
          email: "",
          phoneNumber: "",
          address:""
        }
    ]
}

export const store = createStore(
    rootReducer, Data,
    composeEnhancer(applyMiddleware(
        thunkMiddleware,
        loogerMiddleware
    ))
);
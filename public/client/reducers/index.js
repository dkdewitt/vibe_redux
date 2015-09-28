import {combineReducers} from 'redux';
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router';
import { groups } from './groups';


const rootReducer = combineReducers({
    router: routerStateReducer,
   groups,
   
});

export default rootReducer;


import {combineReducers} from 'redux';

import userinfo from './userinfo.js';
import store from './store';

const rootReducer=combineReducers({
    userinfo,
    store
});

export default rootReducer;
import {createStore} from 'redux';
import rootReducer from '../reducer';

export default function configureStore(state){
    const store=createStore(rootReducer,state,
    window.devToolsExtension?window.devToolsExtension():undefined
    );
    return store;
}
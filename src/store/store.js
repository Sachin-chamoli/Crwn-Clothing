import { compose, createStore, applyMiddleware} from 'redux';
import { persistStore , persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

import logger from 'redux-logger';
// import thunk from "redux-thunk";
import createSagaMiddleware from '@redux-saga/core';

import { rootSaga } from './root-saga';

import { rootReducer } from './root-reducer';


const persistConfig = {
    key: 'root',          //we start from root level, we want to persist whole thing
    storage,               //by default it will store in localstorage
    blacklist : ['user'],     //we don't want to persist user
    // whitelist : ['cart']
}

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [ 
    process.env.NODE_ENV !== 'production' 
    && logger, 
    // thunk 
    sagaMiddleware
].filter(Boolean);
//now our middleware will only apply when we are on development mode

const composeEnhancer = (
    process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares))

export const store = createStore(persistedReducer, undefined , composedEnhancers)

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
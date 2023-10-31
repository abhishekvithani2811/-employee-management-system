import { legacy_createStore as createStore } from "redux";
import storage from 'redux-persist/lib/storage';
import indexReducer from "./redux/reducer/indexReducer";


import {
    persistReducer
} from 'redux-persist';

const persistConfig = {
    key: 'counter',
    storage,
};
const persistedReducer = persistReducer(persistConfig, indexReducer);
const store = createStore(persistedReducer, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store   

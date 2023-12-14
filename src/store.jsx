
import menuReducer from "./Reducers/menuReducer"; // Importuj swój reduktor
import { combineReducers } from 'redux';
import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./Reducers/authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  menu: menuReducer
});


// Utwórz sklep Redux
const store = configureStore({reducer: rootReducer});

export default store;
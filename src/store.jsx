
import menuReducer from "./Reducers/menuReducer"; // Importuj swój reduktor
import { createStore, combineReducers } from 'redux';
import authReducer from "./Reducers/authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  menu: menuReducer
});


// Utwórz sklep Redux
const store = createStore(rootReducer);

export default store;
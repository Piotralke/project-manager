import { createStore } from 'redux'
import menuReducer from "./Reducers/menuReducer"; // Importuj swój reduktor

// Utwórz sklep Redux
const store = createStore(menuReducer);

export default store;
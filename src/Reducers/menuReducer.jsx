const TOGGLE_MENU = "TOGGLE_MENU";
const SET_STATE = "SET_STATE";

// Akcje kreatorów
export const toggleMenu = () => ({
  type: TOGGLE_MENU,
});

export const setMenuState = (menuCollapsed) => ({
  type: SET_STATE,
  state: menuCollapsed,
});

// Początkowy stan
const initialState = {
  menuCollapsed: false,
};

// Reduktor
const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return {
        ...state,
        menuCollapsed: !state.menuCollapsed,
      };
    case SET_STATE:
      console.log("CIPKA")
      return {
        ...state,
        menuCollapsed: action.state,
      };
    default:
      return state;
  }
};

export default menuReducer;

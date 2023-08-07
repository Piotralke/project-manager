const TOGGLE_MENU = "TOGGLE_MENU";

// Akcje kreatorów
export const toggleMenu = () => ({
  type: TOGGLE_MENU,
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
    default:
      return state;
  }
};

export default menuReducer;
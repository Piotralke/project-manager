// authReducer.js
const initialState = {
    token: null,
    user: null,
  };
  // authActions.js
export const setToken = (token) => ({
    type: 'SET_TOKEN',
    payload: token,
  });
  
  export const setUser = (user) => ({
    type: 'SET_USER',
    payload: user,
  });
  
  export const removeToken = () => ({
    type: 'REMOVE_TOKEN',
  });
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_TOKEN':
        return {
          ...state,
          token: action.payload,
        };
      case 'SET_USER':
        return {
          ...state,
          user: action.payload,
        };
      case 'REMOVE_TOKEN':
        return {
          ...state,
          token: null,
          user: null,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  
import * as actionsTypes from '../actions/actionsTypes';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  success: false,
  fullName: null,
  email: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.AUTH_START:
      return { ...state, error: null, loading: true };
    case actionsTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false,
        success: true,
        email: action.email,
      };
    case actionsTypes.AUTH_FAIL:
      return { ...state, error: action.error, loading: false };
    case actionsTypes.SIGNUP_SUCCESS:
      return { ...state, fullName: action.fullName };
    case actionsTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
        error: null,
        loading: false,
        success: false,
        fullName: null,
        email: null,
      };
    default:
      return state;
  }
};

export default reducer;

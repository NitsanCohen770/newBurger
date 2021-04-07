import * as actionTypes from '../actions/actionsTypes';

const initialState = {
  orders: [],
  loading: false,
  purchasing: false,
  userName: '',
  userStreet: '',
  userFloor: '',
  userPhone: '',
  userCity: '',
  userMail: '',
  typeOfDelivery: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchasing: false,
      };
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
      };
      return {
        ...state,
        loading: false,
        purchasing: true,
        orders: state.orders.concat(newOrder),
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.USER_DATA_RECIEVED:
      let userData = action.userData;
      userData = userData[action.folderKey];
      return {
        ...state,
        userName: userData.fullName,
        userStreet: userData.street,
        userPhone: userData.phone,
        userFloor: userData.floor,
        userCity: userData.city,
        userMail: userData.email,
        typeOfDelivery: null,
        loading: false,
      };
    case actionTypes.USER_LOGOUT:
      return {
        ...state,
        userName: '',
        userStreet: '',
        userPhone: '',
        userFloor: '',
        userCity: '',
        userMail: '',
        typeOfDelivery: null,
        loading: false,
      };
    case actionTypes.FETCH_ORDER_INIT:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_ORDER_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false,
      };
    case actionTypes.FETCH_ORDER_FAIL:
      return {
        ...state,

        loading: false,
      };

    case actionTypes.CHANGE_USER_INPUT:
      const { textInput, inputType } = action.payload;
      return {
        ...state,
        [inputType]: textInput,
      };

    default:
      return state;
  }
};

export default reducer;

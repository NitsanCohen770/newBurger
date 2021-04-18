import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';
import realAxios from 'axios';

export const purchaseBurgerSuccess = (orderData, id) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = orderData => {
  return dispatch => {
    console.log(orderData);
    const idToken = localStorage.getItem('token');
    const userEmail = localStorage
      .getItem('userEmail')
      .split('@')
      .join('')
      .split('.')
      .join('');

    purchaseBurgerStart();

    axios
      .post(`/orders/${userEmail}.json?auth=${idToken}`, orderData)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })

      .catch(error => {
        dispatch(purchaseBurgerFail(error));
      })
      .then(resonde => {
        realAxios
          .post(`http://localhost:5000/send`, { orderData })
          .then(res => {
            console.log(res);
            console.log(res.data);
          });
      });
    // .then(res => {
    //   return fetch(':5000/send', {
    //     method: 'post',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       orderData,
    //     }),
    //   })
    //     .then(res => res.json())
    //     .catch(err => console.log(err));
    // });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const userDataRecieved = (userData, folderKey) => {
  return {
    type: actionTypes.USER_DATA_RECIEVED,
    userData: userData,
    folderKey: folderKey,
  };
};

export const recievedData = () => {
  return (dispatch, getState) => {
    let userEmail = getState().auth.email;
    const userToken = getState().auth.token;
    userEmail = userEmail.split('@').join('').split('.').join('');

    axios
      .get(`/userData/${userEmail}.json?auth=${userToken}`)
      .then(response => {
        const folderKey = Object.keys(response.data);

        dispatch(userDataRecieved(response.data, folderKey));
      })

      .catch(error => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    orders: orders,
  };
};
export const fetchOrdersFailed = error => {
  return {
    type: actionTypes.FETCH_ORDER_FAIL,
    error,
  };
};

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDER_INIT,
  };
};

export const fetchOrders = () => {
  return dispatch => {
    const idToken = localStorage.getItem('token');
    const userEmail = localStorage
      .getItem('userEmail')
      .split('@')
      .join('')
      .split('.')
      .join('');

    axios
      .get(`/orders/${userEmail}.json?auth=${idToken}`)
      .then(response => {
        const fetchOrders = [];
        for (let key in response.data) {
          fetchOrders.push({ ...response.data[key], id: key });
        }
        dispatch(fetchOrdersSuccess(fetchOrders));
      })
      .catch(err => {
        dispatch(fetchOrdersFailed(err));
      });
  };
};

export const changeUserInput = (textInput, inputType) => {
  return {
    type: actionTypes.CHANGE_USER_INPUT,
    payload: { textInput, inputType },
  };
};

export const userLogout = () => {
  return {
    type: actionTypes.USER_LOGOUT,
  };
};

import * as actionTypes from './actionsTypes';

import axios from 'axios';
import axiosData from '../../axios-orders';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};
export const signUpSuccess = userName => {
  return { type: actionTypes.SIGNUP_SUCCESS, fullName: userName };
};
export const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: authData.idToken,
    userId: authData.localId,
    email: authData.email,
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    erorr: error,
  };
};

export const auth = passwordAndEmail => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: passwordAndEmail.email,
      password: passwordAndEmail.password,
      returnSecureToken: true,
    };

    axios
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBOx2gchldYYTxBKTfzvmP21ZKGyShDsVU',
        authData
      )
      .then(res => {
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', res.data.localId);
        localStorage.setItem('userEmail', res.data.email);
        dispatch(authSuccess(res.data));
        dispatch(checkAuthTimout(res.data.expiresIn));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err));
      });
  };
};
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return dispatch => {
    dispatch({
      type: actionTypes.AUTH_LOGOUT,
    });
    dispatch({
      type: actionTypes.USER_LOGOUT,
    });
  };
};
export const checkAuthTimout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, +expirationTime * 1000);
  };
};

export const signUp = userData => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: userData.email,
      password: userData.password,
      returnSecureToken: true,
    };

    const userDatabase = {
      fullName: userData.fullName,
      email: userData.email,
      phone: userData.phone,
      street: userData.street,
      floor: userData.apartment,
      city: userData.city,
      sendMails: userData.checkbox,
    };
    axios
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBOx2gchldYYTxBKTfzvmP21ZKGyShDsVU',
        authData
      )
      .then(res => {
        console.log(res);
        dispatch(signUpSuccess(userData.fullName));
      })
      .then(res => {
        axiosData.post(
          `/userData/${userData.email
            .split('@')
            .join('')
            .split('.')
            .join('')}.json`,
          userDatabase
        );
      })

      .catch(err => {
        console.log(err);
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const userData = {
      idToken: localStorage.getItem('token'),
      localId: localStorage.getItem('userId'),
      email: localStorage.getItem('userEmail'),
    };
    if (!userData.idToken) {
      dispatch(logout());
    } else {
      const expirationTime = new Date(localStorage.getItem('expirationDate'));
      if (expirationTime < new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(userData));
        dispatch(
          checkAuthTimout(
            (expirationTime.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

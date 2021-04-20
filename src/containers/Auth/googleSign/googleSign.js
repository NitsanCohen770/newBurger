import React from 'react';
import { useDispatch } from 'react-redux';
import firebase from 'firebase';
import GoogleButton from 'react-google-button';
import firebaseConfig from './firebaseConfig';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../store/actions';
firebase.initializeApp(firebaseConfig);
const GoogleSign = () => {
  const dispatch = useDispatch();
  const login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(res => {
        if (res.user) {
          const userData = {
            idToken: res.user.refreshToken,
            email: res.user.email,
          };
          localStorage.setItem('token', res.user.refreshToken);
          localStorage.setItem('userEmail', res.user.email);
          dispatch(actions.authSuccess(userData));
          dispatch(actions.signUpSuccess(res.user.displayName));
        }
      })
      .catch(e => {
        console.log(e);
      });
  };
  return (
    <GoogleButton label="התחבר עם חשבון גוגל" onClick={login}></GoogleButton>
  );
};

export default GoogleSign;

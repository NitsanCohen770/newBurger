import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import GoogleSign from './googleSign/googleSign';
import { useForm } from 'react-hook-form';
import classes from './Auth.module.css';
import rtlClasses from '../../assets/css/rtl.css';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions/index';

function Auth(props) {
  const loading = useSelector(state => state.auth.loading);
  const success = useSelector(state => state.auth.success);
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => {
    dispatch(actions.auth(data));
  };
  const [redirect, setRedirect] = useState(false);

  if (success) {
    setTimeout(() => {
      return setRedirect(true);
    }, 3000);
  }

  return (
    <div className={classes.container}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>כתובת המייל</Form.Label>
          <Form.Control
            className={classes.email}
            name="email"
            type="email"
            placeholder="המייל שלך"
            ref={register({
              pattern: /^([a-zA-Z0-9]+(?:[.-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:[.-]?[a-zA-Z0-9]+)*\.[a-zA-Z]{2,7})$/,
            })}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>סיסמא</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="סיסמא"
            required
            ref={register({ required: true, maxLength: 20 })}
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox"> </Form.Group>
        <Button
          onClick={onSubmit}
          variant={success ? 'success' : 'primary'}
          type="submit"
        >
          {success ? 'התחברת בהצלחה!' : 'התחבר'}
        </Button>
        {loading && <Spinner />}
        <LinkContainer to="/signUp">
          <Button className={classes.Button} variant="warning" type="button">
            אינך רשום? לחץ כאן להרשם
          </Button>
        </LinkContainer>
      </Form>
      <GoogleSign text={'התחבר עם חשבון גוגל'} />
      {redirect && <Redirect to="/" />}
    </div>
  );
}

export default Auth;

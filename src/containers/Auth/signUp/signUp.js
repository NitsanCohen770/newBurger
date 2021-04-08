import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useForm } from 'react-hook-form';
import classes from '../Auth.module.css';
import * as actions from '../../../store/actions/index';

const SignUp = () => {
  const fullName = useSelector(state => state.auth.fullName);
  const [redirect, setRedirect] = useState(false);

  if (fullName) {
    setTimeout(() => {
      return setRedirect(true);
    }, 2000);
  }

  const dispatch = useDispatch();
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => {
    dispatch(actions.signUp(data));
  };
  return (
    <div className={classes.container}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>מייל</Form.Label>

            <Form.Control
              className={classes.email}
              type="email"
              placeholder="הכנס כתובת מייל"
              name="email"
              ref={register({
                pattern: /^([a-zA-Z0-9]+(?:[.-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:[.-]?[a-zA-Z0-9]+)*\.[a-zA-Z]{2,7})$/,
              })}
            />
            <Form.Text className="text-muted">
              אנו לעולם לא נשתף את המייל שלך עם גורם שלישי
            </Form.Text>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>סיסמא</Form.Label>
            <Form.Control
              type="password"
              placeholder="סיסמא"
              name="password"
              ref={register({ required: true })}
            />
          </Form.Group>
        </Form.Row>
        <Form.Group controlId="formGridName">
          <Form.Label>שם מלא</Form.Label>
          <Form.Control
            name="fullName"
            ref={register({ required: true })}
            placeholder="לדוג' יוסי לוי"
          />
        </Form.Group>
        <Form.Group controlId="formGridNumber">
          <Form.Label>מספר טלפון</Form.Label>
          <Form.Control
            name="phone"
            type="number"
            ref={register({ required: true })}
            placeholder=""
          />
        </Form.Group>
        <Form.Group controlId="formGridAddress2">
          <Form.Label>כתובת</Form.Label>
          <Form.Control
            name="street"
            ref={register({ required: true })}
            placeholder="לדוג' רחוב טופז 21"
          />
        </Form.Group>

        <Form.Group controlId="formGridAddress2">
          <Form.Label>כתובת המשך</Form.Label>
          <Form.Control
            name="apartment"
            ref={register({ required: true })}
            placeholder="מספר דירה, קומה וכו'"
          />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>עיר</Form.Label>
            <Form.Control name="city" ref={register({ required: true })} />
          </Form.Group>
        </Form.Row>

        <Form.Group id="formGridCheckbox">
          <Form.Check
            name="checkbox"
            ref={register}
            type="checkbox"
            label="עדכן אותי לגבי מבצעים"
          />
        </Form.Group>

        <Button onClick={onSubmit} variant="success" type="submit">
          {fullName
            ? `${fullName}, נרשמת בהצלחה! הנך מועבר לדף ההתחברות`
            : 'הרשם'}
        </Button>
      </Form>
      {redirect && <Redirect to="/auth" />}
    </div>
  );
};
export default SignUp;

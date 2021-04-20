import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';
import GoogleSign from '../googleSign/googleSign';
import { useForm } from 'react-hook-form';
import classes from '../Auth.module.css';
import * as actions from '../../../store/actions/index';

const SignUp = () => {
  const fullName = useSelector(state => state.auth.fullName);
  const [redirect, setRedirect] = useState(false);
  const [validated, setValidated] = useState(false);

  if (fullName) {
    setTimeout(() => {
      return setRedirect(true);
    }, 1500);
  }

  const dispatch = useDispatch();
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => {
    setValidated(true);
    dispatch(actions.signUp(data));
  };

  return (
    <div className={classes.container}>
      <Form noValidate validated={validated} onSubmit={handleSubmit(onSubmit)}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>מייל</Form.Label>

            <Form.Control
              required
              className={classes.email}
              type="email"
              placeholder="הכנס כתובת מייל"
              name="email"
              onChange
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
              required
              type="password"
              placeholder="סיסמא"
              name="password"
              isInvalid="true"
              isValid="true"
              ref={register({ required: true })}
            />
          </Form.Group>
        </Form.Row>
        <Form.Group controlId="formGridName">
          <Form.Label>שם מלא</Form.Label>
          <Form.Control
            required
            name="fullName"
            ref={register({ required: true })}
            placeholder="לדוג' יוסי לוי"
          />
        </Form.Group>
        <Form.Group controlId="formGridNumber">
          <Form.Label>מספר טלפון</Form.Label>
          <Form.Control
            required
            name="phone"
            type="number"
            ref={register({ required: true })}
            placeholder=""
          />
        </Form.Group>
        <Form.Group controlId="formGridAddress2">
          <Form.Label>כתובת</Form.Label>
          <Form.Control
            required
            name="street"
            ref={register({ required: true })}
            placeholder="לדוג' רחוב טופז 21"
          />
        </Form.Group>

        <Form.Group controlId="formGridAddress2">
          <Form.Label>כתובת המשך</Form.Label>
          <Form.Control
            required
            name="apartment"
            ref={register({ required: true })}
            placeholder="מספר דירה, קומה וכו. באם הנך גר בבית פרטי רשום: פרטי"
          />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>עיר</Form.Label>
            <Form.Control
              required
              name="city"
              ref={register({ required: true })}
            />
          </Form.Group>
        </Form.Row>

        <Form.Group id="formGridCheckbox">
          <Form.Check
            name="checkbox"
            ref={register}
            inline="true"
            type="checkbox"
            label="עדכן אותי לגבי מבצעים"
          />
        </Form.Group>
        <div className={classes.buttons_container}>
          <Button onClick={onSubmit} variant="success" type="submit">
            {fullName
              ? `${fullName}, נרשמת בהצלחה! הנך מועבר לדף ההתחברות`
              : 'הרשם'}
          </Button>
          <hr></hr>
          <GoogleSign className={classes.google}></GoogleSign>
        </div>
      </Form>

      {redirect && <Redirect to="/auth" />}
    </div>
  );
};
export default SignUp;

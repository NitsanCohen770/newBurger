import React, { useEffect, useState } from 'react';
import Auth from '../../Auth/Auth';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Button, Col } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import * as actions from '../../../store/actions/index';
import classes from './ContactData.module.css';

const ContactData = () => {
  const ings = useSelector(state => state.burgerBuilder.ingredients);
  const price = useSelector(state => state.burgerBuilder.totalPrice);
  const loading = useSelector(state => state.order.loading);
  const loggedIn = useSelector(state => state.auth.success);
  const userPhone = useSelector(state => state.order.userPhone);
  const userStreet = useSelector(state => state.order.userStreet);
  const userCity = useSelector(state => state.order.userCity);
  const userFloor = useSelector(state => state.order.userFloor);
  const userMail = useSelector(state => state.order.userMail);
  const userName = useSelector(state => state.order.userName);
  const orderSummary = { ings, price };
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedIn) {
      dispatch(actions.purchaseBurgerStart());
    }
    return;
  }, [dispatch, loggedIn]);
  useEffect(() => {
    if (loggedIn) {
      dispatch(actions.recievedData());
    }
    return;
  }, [dispatch, loggedIn]);

  let logIn = (
    <p>
      <b>או התחבר למשתמש שלך:</b>
      <Auth></Auth>
    </p>
  );
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => {
    orderSummary.data = data;
    dispatch(actions.purchaseBurger(orderSummary));
  };
  let form = (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>מייל</Form.Label>

          <Form.Control
            value={userMail}
            type="email"
            placeholder="הכנס כתובת מייל"
            name="email"
            onChange={event =>
              dispatch(actions.changeUserInput(event.target.value, 'userMail'))
            }
            ref={register({
              pattern: /^([a-zA-Z0-9]+(?:[.-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:[.-]?[a-zA-Z0-9]+)*\.[a-zA-Z]{2,7})$/,
            })}
          />
          <Form.Text className="text-muted">
            אנו לעולם לא נשתף את המייל שלך עם גורם שלישי
          </Form.Text>
        </Form.Group>
      </Form.Row>
      <Form.Group controlId="formGridAddress1">
        <Form.Label>שם מלא</Form.Label>
        <Form.Control
          value={userName}
          onChange={event =>
            dispatch(actions.changeUserInput(event.target.value, 'userName'))
          }
          name="fullName"
          ref={register}
          placeholder="לדוג' יוסי לוי"
        />
      </Form.Group>
      <Form.Group controlId="formGridAddress1">
        <Form.Label>כתובת</Form.Label>
        <Form.Control
          value={userStreet}
          onChange={event =>
            dispatch(actions.changeUserInput(event.target.value, 'userStreet'))
          }
          name="street"
          ref={register}
          placeholder="לדוג' רחוב טופז 21"
        />
      </Form.Group>
      <Form.Group controlId="formGridNumber">
        <Form.Label>מספר טלפון</Form.Label>
        <Form.Control
          value={userPhone}
          name="phone"
          type="number"
          ref={register({ required: true })}
          placeholder=""
        />
      </Form.Group>
      <Form.Group controlId="formGridAddress2">
        <Form.Label>כתובת המשך</Form.Label>
        <Form.Control
          value={userFloor}
          onChange={event =>
            dispatch(actions.changeUserInput(event.target.value, 'userFloor'))
          }
          name="apartment"
          ref={register}
          placeholder="מספר דירה, קומה וכו'"
        />
      </Form.Group>

      <Form.Row>
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>עיר</Form.Label>
          <Form.Control
            value={userCity}
            onChange={event =>
              dispatch(actions.changeUserInput(event.target.value, 'userCity'))
            }
            name="city"
            ref={register}
          />
        </Form.Group>
      </Form.Row>

      <Form.Group id="formGridCheckbox">
        <Form.Check
          name="checkbox"
          ref={register}
          inline="true"
          type="checkbox"
          label="תשלום במזומן"
        />
      </Form.Group>

      <Button variant="success" type="submit">
        שלם
      </Button>
    </Form>
  );
  if (loading) {
    form = <Spinner />;
  }
  return (
    <div className={classes.ContactData}>
      <h4>נא רשום את פרטי ההתקשרות שלך</h4>
      {form}
      {!loggedIn && logIn}
    </div>
  );
};

export default ContactData;

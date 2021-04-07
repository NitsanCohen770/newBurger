import React, { Fragment } from 'react';
import Button from '../../../UI/Button/Button';
import { Link } from 'react-router-dom';
let array = [];
const orderSummary = props => {
  if (!props.ingredients) {
    return null;
  }
  const orderIngrediens = Object.keys(props.ingredients).map(igKey => {
    let hebIngredient = null;
    switch (igKey) {
      case 'meat':
        hebIngredient = 'בשר';
        break;
      case 'salad':
        hebIngredient = 'סלט';
        break;
      case 'pastrama':
        hebIngredient = 'פסטרמה';
        break;
    }

    return (
      <li key={igKey}>
        {hebIngredient}:{props.ingredients[igKey]}
      </li>
    );
  });

  return (
    <Fragment>
      <h3> ההזמנה שלך:</h3>
      <p>המבורגר מפנק עם התוספות הבאות: </p>
      <ul>{orderIngrediens}</ul>
      <p>סה"כ לתשלום:{props.total} ש"ח</p>
      <p>המשך לתשלום?</p>

      <Link
        to={{
          pathname: '/checkout',
          meat: props.ingredients.meat,
          pastrama: props.ingredients.pastrama,
          salad: props.ingredients.salad,
          price: props.total,
        }}
      >
        <Button clicked={props.confirm} btnType="Success">
          אישור
        </Button>
      </Link>
      <Link to="/">
        <Button clicked={props.backdrop} btnType="Danger">
          ביטול
        </Button>
      </Link>
    </Fragment>
  );
};

export default orderSummary;

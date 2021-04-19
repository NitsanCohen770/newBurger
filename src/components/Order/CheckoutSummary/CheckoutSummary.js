import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>מקווים שתהנו מההמבורגר!</h1>
      <strong>
        <hr></hr>
      </strong>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
        <p>לחץ המשך להשלמת ההזמנה</p>
        <hr></hr>
      </div>
      <Button btnType="Success" clicked={props.checkoutContinued}>
        המשך
      </Button>
      <Button btnType="Danger" clicked={props.checkoutCancelled}>
        ביטול
      </Button>
    </div>
  );
};

export default checkoutSummary;

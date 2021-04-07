import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'סלט', type: 'salad' },
  { label: 'פסטרמה', type: 'pastrama' },
  { label: 'בשר', type: 'meat' },
];

const buildControls = props => (
  <div className={classes.BuildControls}>
    <p>
      מחיר הבורגר:<strong>{props.price}</strong>
    </p>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        dedacted={() => props.ingredientDedacted(ctrl.type)}
        disabled={props.buttonDisabled[ctrl.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={props.orderButton}
      onClick={props.backdrop}
    >
      הזמן עכשיו!
    </button>
  </div>
);

export default buildControls;

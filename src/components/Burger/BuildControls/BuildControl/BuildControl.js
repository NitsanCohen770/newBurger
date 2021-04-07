import React from 'react';
import classes from './BuildControl.module.css';
const buildControl = props => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button className={classes.More} onClick={props.added}>
      הוסף כמות
    </button>
    <button
      disabled={props.disabled}
      className={classes.Less}
      onClick={props.dedacted}
    >
      החסר כמות
    </button>
  </div>
);

export default buildControl;

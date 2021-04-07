import React from 'react';
import classes from './NavigationItem.module.css';
import { Link } from 'react-router-dom';

const navigationItem = props => (
  <li onClick={props.showSideDrawer} className={classes.NavigationItem}>
    <Link to={props.link} onClick={props.clicked}>
      {props.children}
    </Link>
  </li>
);

export default navigationItem;

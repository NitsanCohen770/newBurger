import React, { Fragment } from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
const sideDrawer = props => {
  let attClasses = [classes.SideDrawer, classes.Close];
  if (props.show) {
    attClasses[1] = classes.Open;
  }
  return (
    <Fragment>
      <Backdrop show={props.show} disable={props.closed} />
      <div className={attClasses.join(' ')} onClick={props.closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav style={{ color: 'red' }}>
          <NavigationItems />
        </nav>
      </div>
    </Fragment>
  );
};

export default sideDrawer;

import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
const mobileNavItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem showSideDrawer={props.showSideDrawer}>תפריט</NavigationItem>
  </ul>
);
export default mobileNavItems;

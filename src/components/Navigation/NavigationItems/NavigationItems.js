import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import * as actions from '../../../store/actions/index';

const NavigationItems = () => {
  const loggedIn = useSelector(state => state.auth.success);
  const dispatch = useDispatch();
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">בונה ההמבורגרים</NavigationItem>
      {loggedIn && <NavigationItem link="/orders">ההזמנות שלי</NavigationItem>}
      {loggedIn ? (
        <NavigationItem link="/" clicked={() => dispatch(actions.logout())}>
          התנתק
        </NavigationItem>
      ) : (
        <NavigationItem link="/auth">התחבר</NavigationItem>
      )}
    </ul>
  );
};
export default NavigationItems;

import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import { Link } from 'react-router-dom';
import NavigationItems from '../NavigationItems/NavigationItems';
import MobileNavItems from '../NavigationItems/MobileNavItems';

const toolbar = props => (
  <header className={classes.Toolbar}>
    <div className={classes.Logo}>
      <Link to="/">
        <Logo />
      </Link>
    </div>

    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
    <nav className={classes.MobileOnly}>
      <MobileNavItems showSideDrawer={props.clicked}></MobileNavItems>
    </nav>
  </header>
);

export default toolbar;

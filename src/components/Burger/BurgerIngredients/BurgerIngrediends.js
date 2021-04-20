import React, { Fragment } from 'react';
import classes from './BurgerIngredient.module.css';
import PropTypes from 'prop-types';

const BurgerIngredients = ({ handleDrag, handleDrop, type, id }) => {
  let ingredient = null;

  switch (type) {
    case 'bread-bottom':
      ingredient = <div className={classes.BreadBottom}></div>;
      break;
    case 'bread-top':
      ingredient = (
        <Fragment>
          <div className={classes.BreadTop}></div>
          {/* <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div> */}
        </Fragment>
      );
      break;
    case 'meat':
      ingredient = (
        <div
          draggable={true}
          onDragOver={ev => ev.preventDefault()}
          onDragStart={handleDrag}
          onDrop={handleDrop}
          id={id}
          className={classes.Meat}
        >
          {' '}
        </div>
      );
      break;
    case 'salad':
      ingredient = (
        <div
          draggable={true}
          onDragOver={ev => ev.preventDefault()}
          onDragStart={handleDrag}
          onDrop={handleDrop}
          id={id}
          className={classes.Salad}
        >
          {' '}
        </div>
      );
      break;
    case 'pastrama':
      ingredient = (
        <div
          draggable={true}
          onDragOver={ev => ev.preventDefault()}
          onDragStart={handleDrag}
          onDrop={handleDrop}
          id={id}
          className={classes.Pastrama}
        >
          {' '}
        </div>
      );
      break;
  }
  return ingredient;
  BurgerIngredients.PropTypes = {
    type: PropTypes.string.isRequired,
  };
};

export default BurgerIngredients;

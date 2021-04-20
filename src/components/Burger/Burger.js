import React, { useState } from 'react';
import classes from './Burger.module.css';
import { nanoid } from 'nanoid';
import BurgerIngredient from './BurgerIngredients/BurgerIngrediends';
const Burger = props => {
  const [ingredients, setIngredients] = useState();
  const handleDrop = ev => {
    const dragIngredient = ingredients.find(
      ingredient => ingredient.id === dragId
    );
    const dropIngredient = ingredients.find(
      ingredient => ingredient.id === ev.currentTarget.id
    );

    const dragIngredientOrder = dragIngredient;
    const dropIngredientOrder = dropIngredient;

    const newIngredientState = ingredients.map(ingredient => {
      if (ingredient.id === dragId) {
        ingredient = dropIngredientOrder;
      }
      if (ingredient.id === ev.currentTarget.id) {
        ingredient = dragIngredientOrder;
      }
      return ingredient;
    });

    setIngredients(newIngredientState);
  };
  const [dragId, setDragId] = useState();
  const handleDrag = ev => {
    setDragId(ev.currentTarget.id);
  };

  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])]
        .sort((a, b) => a - b)
        .map((_, i) => {
          return (
            <BurgerIngredient
              key={igKey + i}
              type={igKey}
              handleDrag={handleDrag}
              handleDrop={handleDrop}
              id={nanoid()}
            />
          );
        });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>ההמבורגר ריק! נא להוסיף רכיבים</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;

import * as actionTypes from './actionsTypes';

export const addIngredient = name => {
  return {
    type: actionTypes.ADD_INGREDIENTS,
    ingredientName: name,
  };
};
export const removeIngredient = name => {
  return {
    type: actionTypes.REMOVE_INGREDIENTS,
    ingredientName: name,
  };
};

export const setIngredients = () => {
  if (!localStorage.getItem('ingredients')) {
    return {
      type: actionTypes.SET_INGREDIENTS,
      ingredients: { salad: 0, meat: 0, pastrama: 0 },
    };
  }
  console.log(localStorage.getItem('ingredients'));
  return {
    type: actionTypes.SET_INGREDIENTS,
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const resetIngredients = () => {
  return {
    type: actionTypes.RESET_INGREDIENTS,
  };
};

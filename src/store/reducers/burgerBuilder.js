import * as actionTypes from '../actions/actionsTypes';

const INGREDIENT_PRICES = {
  salad: 5,
  pastrama: 15,
  meat: 20,
};

const initialState = {
  ingredients: null,
  totalPrice: 30,
  orderButton: true,
  error: false,
  meatCount: 0,
  pastramaCount: 0,
  saladCount: 0,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESET_INGREDIENTS:
      return {
        ...state,
        ingredients: initialState.ingredients,
        totalPrice: initialState.totalPrice,
        orderButton: initialState.orderButton,
        error: initialState.error,
      };
    case actionTypes.ADD_INGREDIENTS:
      if (state.ingredients[action.ingredientName] === 2) {
        return {
          ...state,
        };
      }
      if (action.ingredientName === 'meat') {
        return {
          ...state,
          ingredients: {
            ...state.ingredients,
            [action.ingredientName]:
              state.ingredients[action.ingredientName] + 1,
          },
          totalPrice:
            state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
          orderButton: false,
        };
      }

      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      };

    case actionTypes.REMOVE_INGREDIENTS:
      if (action.ingredientName === 'meat' && state.ingredients.meat === 1) {
        return {
          ...state,
          ingredients: {
            ...state.ingredients,
            [action.ingredientName]:
              state.ingredients[action.ingredientName] - 1,
          },
          totalPrice:
            state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
          orderButton: true,
        };
      }
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      };
    case actionTypes.SET_INGREDIENTS:
      if (localStorage.getItem('persist:root')) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        ingredients: {
          salad: 0,
          pastrama: 0,
          meat: 0,
        },
        totalPrice: 30,
        error: false,
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;

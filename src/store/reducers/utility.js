const updatedIngredientsHelper = ({
  ingredientName,
  previousIngredients,
  counter,
  previousPrice,
  prices,
}) => {
  return {
    ...previousIngredients,
    [ingredientName]: previousIngredients[ingredientName] + counter,
    totalPrice: previousPrice + counter * prices[ingredientName],
  };
};

export default updatedIngredientsHelper;

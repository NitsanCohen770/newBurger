import React from 'react';
import classse from './Order.module.css';

const order = props => {
  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    ingredients.push({
      amount: props.ingredients[ingredientName],
      name: ingredientName,
    });
  }

  const ingredientsOutput = ingredients.map(ig => {
    let hebName = null;
    if (ig.name === 'meat') {
      hebName = 'בשר';
    } else if (ig.name === 'pastrama') {
      hebName = 'פסטרמה';
    } else if (ig.name === 'salad') {
      hebName = 'סלט';
    }
    return (
      <span
        key={ig.name}
        style={{
          padding: '5px',
          display: 'inline-block',
          border: '1px solid #ccc',
        }}
      >
        {hebName} ({ig.amount})
      </span>
    );
  });
  return (
    <div className={classse.Order}>
      <p>פרטי הזמנה: {ingredientsOutput}</p>
      <p>
        מחיר: <strong> {props.price}</strong>
      </p>
    </div>
  );
};

export default order;

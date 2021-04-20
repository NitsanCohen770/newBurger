import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/BurgerIngredients/OrderSummry/OrderSummry';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import withErrorHandler from '../../withErrorHandler/withErrorHandler';

import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
  state = {
    backdrop: false,
    loading: false,
  };

  componentDidMount() {
    this.props.setIngredients();
  }

  confirmPurchaseHandler() {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  }

  cancelPurchaseHandler() {
    if (this.state.backdrop === false) {
      this.setState({ backdrop: true });
    } else {
      this.setState({ backdrop: false });
    }
  }

  render() {
    const disbaledInfo = {
      ...this.props.ingredients,
    };
    for (let key in disbaledInfo) {
      disbaledInfo[key] = disbaledInfo[key] <= 0;
    }
    let orderSummary = (
      <OrderSummary
        ingredients={this.props.ingredients}
        confirm={this.confirmPurchaseHandler.bind(this)}
        backdrop={this.cancelPurchaseHandler.bind(this)}
        total={this.props.totalPrice}
      />
    );

    let burger = this.props.error ? (
      <p>כנראה שיש תקלה בשרת! עמכם הסליחה</p>
    ) : (
      <Spinner />
    );

    if (this.props.ingredients) {
      burger = (
        <Fragment>
          {' '}
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={this.props.onIngredientsAdded}
            ingredientDedacted={this.props.onIngredientsRemoved}
            buttonDisabled={disbaledInfo}
            price={this.props.totalPrice}
            orderButton={this.props.orderButton}
            backdrop={this.cancelPurchaseHandler.bind(this)}
          />
        </Fragment>
      );
    }
    return (
      <Fragment>
        <Backdrop
          show={this.state.backdrop}
          disable={this.cancelPurchaseHandler.bind(this)}
        />
        <Modal show={this.state.backdrop}>{orderSummary}</Modal>
        {burger}
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    orderButton: state.burgerBuilder.orderButton,
    error: state.burgerBuilder.error,
    loggedIn: state.auth.success,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onIngredientsAdded: ingredientName =>
      dispatch(actions.addIngredient(ingredientName)),
    onIngredientsRemoved: ingredientName =>
      dispatch(actions.removeIngredient(ingredientName)),
    setIngredients: () => dispatch(actions.setIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onResetPurchase: () => dispatch(actions.resetIngredients()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder));

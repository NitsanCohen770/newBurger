import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Layout from './components/Layout/Layout';
import Auth from './containers/Auth/Auth';
import signUp from './containers/Auth/signUp/signUp';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

import * as actions from './store/actions/index';

import Orders from './containers/Checkout/Orders/Orders';

const App = () => {
  const success = useSelector(state => state.auth.success);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.authCheckState());
  }, [dispatch]);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div>
        <Layout>
          <Switch>
            <Route path="/signUp" component={signUp} />
            <Route path="/Auth" component={Auth} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={success && Orders} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    </BrowserRouter>
  );
};

export default App;

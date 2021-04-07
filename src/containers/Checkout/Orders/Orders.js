import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Order from './Order';
import * as actions from '../../../store/actions/index';

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchOrders());
  }, []);

  const orders = useSelector(state => state.order.orders);
  return (
    <div>
      {orders.map(order => {
        return (
          <Order price={order.price} key={order.id} ingredients={order.ings} />
        );
      })}
    </div>
  );
};

export default Orders;

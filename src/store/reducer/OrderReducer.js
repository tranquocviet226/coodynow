import {ADD_ORDER, FETCH_ORDER} from '../action/OrderAction';
import Order from '../model/OrderModel';

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDER:
      return {
        orders: action.orders,
      };
    case ADD_ORDER:
      return {
        orders: action.orders,
      };
    default:
      return state;
  }
};

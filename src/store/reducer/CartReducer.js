import {ADD_TO_CART, REMOVE_CART, FETCH_CART} from '../action/CartAction';
import Cart from '../model/CartModel';
import { ADD_ORDER } from '../action/OrderAction';

const initialState = {
  items: {},
  total: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CART:
      return {
        ...state,
        total: action.total,
        items: action.items
      }
    case ADD_TO_CART:
      const price = action.items.price;
      const title = action.items.title;
      const image = action.items.image;
      const date = new Date();
      let NewCart;

      if (state.items[action.items.id]) {
        NewCart = new Cart(
          price,
          title,
          state.items[action.items.id].quantity + 1,
          state.items[action.items.id].sum + price,
          date,
          image,
        );
      } else {
        NewCart = new Cart(price, title, 1, price, date, image);
      }
      return {
        ...state,
        items: {...state.items, [action.items.id]: NewCart},
        total: state.total + price,
      };
    case REMOVE_CART:
      const selectItem = state.items[action.id];
      const currentQuantity = selectItem.quantity;
      let CartItem;
      if(currentQuantity > 1){
        NewItem = new Cart(
          selectItem.price,
          selectItem.title,
          currentQuantity - 1,
          selectItem.sum - selectItem.price,
          selectItem.date,
          selectItem.image
        )
        CartItem = {...state.items, [action.id]: NewItem}
      } else {
        CartItem = {...state.items};
        delete CartItem[action.id];
      }
      return {
        ...state,
        items: CartItem,
        total: state.total - selectItem.price
      }
    case ADD_ORDER:
      return initialState;
    default:
      return state;
  }
};

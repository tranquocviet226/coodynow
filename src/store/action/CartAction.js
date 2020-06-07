const URL = 'http://172.16.39.236:3000';

export const FETCH_CART = 'FETCH_CART';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_CART = 'REMOVE_CART';

export const fetchCart = id => {
  return async dispatch => {
    const response = await fetch(`${URL}/fetchCart`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: id}),
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error('Lỗi');
    }

    dispatch({
      type: FETCH_CART,
      total: json.total,
      items: json.items,
    });
  };
};

export const addToCart = items => {
  return {type: ADD_TO_CART, items: items};
};

export const removeCart = id => {
  return {type: REMOVE_CART, id: id};
};

export const cartToServer = (id, cart) => {
  return async dispatch => {
    const response = await fetch(`${URL}/addToCart`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: id, cart: cart}),
    });

    if (!response.ok) {
      throw new Error('Lỗi');
    }
  };
};

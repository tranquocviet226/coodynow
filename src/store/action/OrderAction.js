const URL = 'http://172.16.39.236:3000';

export const FETCH_ORDER = 'FETCH_ORDER';
export const ADD_ORDER = 'ADD_ORDER';

export const fetchOrder = userId => {
  return async dispatch => {
    const response = await fetch(`${URL}/fetchOrder`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({userId: userId}),
    });

    let json = await response.json();

    dispatch({
      type: FETCH_ORDER,
      orders: json,
    });
  };
};

export const addOrder = (userId, total, items) => {
  return async dispatch => {
    const date = new Date();
    const response = await fetch(`${URL}/addOrder`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        userId: userId,
        total: total,
        items: items,
        date: date,
      }),
    });

    if (!response.ok) {
      throw new Error('Lỗi');
    }

    const json = await response.json();

    dispatch({
      type: ADD_ORDER,
      orders: json
    });
  };
};

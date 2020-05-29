export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_CART = "REMOVE_CART"

export const addToCart = items => {
    return {
        type: ADD_TO_CART,
        items: items
    }
}

export const removeCart = id => {
    return {
        type: REMOVE_CART,
        id: id
    }
}
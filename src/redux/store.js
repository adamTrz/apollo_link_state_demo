/* @flow */
import { combineReducers } from 'redux';
import type { CartAction, Cart } from '../types';

const cart = (state: Cart = [], action: CartAction) => {
  switch (action.type) {
    case 'ADD_ITEM_TO_CART':
      return [...state, { id: action.payload.id, value: action.payload.value }];
    case 'REMOVE_ITEM_FROM_CART':
      const foundIndex = state.findIndex(i => i.id === action.payload.id);
      return [...state.slice(0, foundIndex), ...state.slice(foundIndex + 1)];
    case 'UPDATE_CART_ITEM':
      const index = state.findIndex(i => i.id === action.payload.id);
      return [
        ...state.slice(0, index),
        { id: action.payload.id, value: action.payload.value },
        ...state.slice(index + 1),
      ];
    default:
      return state;
  }
};

export default combineReducers({
  cart,
});

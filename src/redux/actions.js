/* @flow */
import type { CartAction } from '../types';

export const addItemToCart = (id: string, value: number): CartAction => ({
  type: 'ADD_ITEM_TO_CART',
  payload: { id, value },
});

export const removeItemFromCart = (id: string): CartAction => ({
  type: 'REMOVE_ITEM_FROM_CART',
  payload: { id },
});

export const updateCartItem = (id: string, value: number): CartAction => ({
  type: 'UPDATE_CART_ITEM',
  payload: { id, value },
});

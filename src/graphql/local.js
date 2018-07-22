/* @flow */
import { CART_QUERY } from './queries';
import type { CartItem } from '../types';

const clientState = {
  defaults: {
    cart: [],
  },
  resolvers: {
    Mutation: {
      addItemToCart: (_: *, { id, value }: CartItem, { cache }: *) => {
        const previous = cache.readQuery({ query: CART_QUERY });
        const data = {
          cart: [
            ...previous.cart,
            {
              id,
              value,
              __typename: 'CartItem',
            },
          ],
        };
        cache.writeData({ data });
        return null;
      },
      removeItemFromCart: (_: *, { id, value }: CartItem, { cache }: *) => {
        const previous = cache.readQuery({ query: CART_QUERY });
        const foundIndex = previous.cart.findIndex(i => i.id === id);
        const data = {
          cart: [
            ...previous.cart.slice(0, foundIndex),
            ...previous.cart.slice(foundIndex + 1),
          ],
        };
        cache.writeData({ data });
        return null;
      },
      updateCartItem: (_: *, { id, value }: CartItem, { cache }: *) => {
        const previous = cache.readQuery({ query: CART_QUERY });
        const foundIndex = previous.cart.findIndex(i => i.id === id);
        const data = {
          cart: [
            ...previous.cart.slice(0, foundIndex),
            {
              id,
              value,
              __typename: 'CartItem',
            },
            ...previous.cart.slice(foundIndex + 1),
          ],
        };
        cache.writeData({ data });
        return null;
      },
    },
  },
};

export default clientState;

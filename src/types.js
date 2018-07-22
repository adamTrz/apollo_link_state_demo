export type CartItem = { id: string, value?: number };

export type Cart = Array<CartItem>;

export type CartAction = {
  type: 'ADD_ITEM_TO_CART' | 'REMOVE_ITEM_FROM_CART' | 'UPDATE_CART_ITEM',
  payload: CartItem,
};

export type Beer = {
  name: string,
  description: string,
  id: string,
  tagline: string,
  image_url: string,
};

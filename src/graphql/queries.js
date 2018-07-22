import { gql } from 'apollo-boost';

export const BEERS_QUERY = gql`
  query Beers {
    beers {
      name
      id
      description
      tagline
      image_url
    }
  }
`;

export const CART_QUERY = gql`
  query GetCart {
    cart @client {
      id
      value
    }
  }
`;

export const ADD_ITEM_TO_CART = gql`
  mutation addItemToCart($id: ID!, $value: number!) {
    addItemToCart(id: $id, value: $value) @client
  }
`;
export const REMOVE_ITEM_FROM_CART = gql`
  mutation removeItemFromCart($id: ID!) {
    removeItemFromCart(id: $id) @client
  }
`;
export const UPDATE_CART_ITEM = gql`
  mutation updateCartItem($id: ID!, $value: number!) {
    updateCartItem(id: $id, value: $value) @client
  }
`;

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

export const ADD_BEER_MUTATION = gql`
  mutation createBeer($data: BeerCreateInput!) {
    createBeer(data: $data) {
      name
      id
      description
      tagline
      image_url
    }
  }
`;

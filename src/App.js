/* @flow */
import * as React from 'react';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { graphql, compose } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';

import AppBar from './AppBar';
import ListItem from './ListItem';
import {
  BEERS_QUERY,
  CART_QUERY,
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  UPDATE_CART_ITEM,
} from './graphql/queries';

import type { Cart, Beer } from './types';

type State = {
  expanded: ?string | boolean,
};

type Props = {
  classes: *,
  cart: Cart,
  beers: Array<Beer>,
  loading: boolean,
  addItemToCart: (id: string, value: number) => Promise<*>,
  updateCartItem: (id: string, value: number) => Promise<*>,
  removeItemFromCart: (id: string) => Promise<*>,
};

class App extends React.Component<Props, State> {
  state = {
    expanded: null,
  };

  handlePanelChange = (panel: string) => (event, expanded: boolean) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  handleAdd = (id: string, value: number) => {
    this.props.addItemToCart(id, value);
  };

  handleUpdate = (id: string, value: number) => {
    this.props.updateCartItem(id, value);
  };

  handleRemove = (id: string) => {
    this.props.removeItemFromCart(id);
  };

  render() {
    const { classes, beers = [], loading, cart } = this.props;
    const { expanded } = this.state;
    return (
      <React.Fragment>
        <AppBar />
        <div className={classes.root}>
          <Grid item>
            <div className={classes.demo}>
              {loading ? (
                <CircularProgress className={classes.progress} size={50} />
              ) : (
                <List>
                  {beers.map(item => {
                    const cartItem = cart.find(i => i.id === item.id);
                    const value = cartItem ? cartItem.value : '';
                    return (
                      <ListItem
                        key={item.id}
                        expanded={expanded}
                        item={item}
                        handlePanelChange={this.handlePanelChange}
                        handleAdd={this.handleAdd}
                        handleRemove={this.handleRemove}
                        handleUpdate={this.handleUpdate}
                        value={value}
                      />
                    );
                  })}
                </List>
              )}
            </div>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

const styles = theme => ({
  root: {
    margin: `10px auto 0`,
    width: '100%',
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    justifyContent: 'center',
  },
  progress: {
    marginTop: 30,
  },
  textField: {
    marginTop: 0,
  },
  avatar: {
    width: 60,
    height: 120,
    objectFit: 'contain',
  },
});

export default compose(
  withStyles(styles),
  graphql(CART_QUERY, {
    props: ({ data, loading }) => ({
      cart: data.cart,
    }),
  }),
  graphql(BEERS_QUERY, {
    props: ({ data, loading }) => ({
      beers: data.beers,
      loading,
    }),
  }),
  graphql(UPDATE_CART_ITEM, {
    props: ({ ownProps, mutate }) => ({
      updateCartItem: (id, value) =>
        mutate({
          variables: { id, value },
        }),
    }),
  }),
  graphql(ADD_ITEM_TO_CART, {
    props: ({ ownProps, mutate }) => ({
      addItemToCart: (id, value) =>
        mutate({
          variables: { id, value },
        }),
    }),
  }),
  graphql(REMOVE_ITEM_FROM_CART, {
    props: ({ ownProps, mutate }) => ({
      removeItemFromCart: id =>
        mutate({
          variables: { id },
        }),
    }),
  }),
)(App);

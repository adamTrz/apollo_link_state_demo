/* @flow */
import * as React from 'react';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Query, Mutation } from 'react-apollo';
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

import type { Cart } from './types';

type State = {
  expanded: ?string | boolean,
};

type Props = {
  classes: *,
  cart: Cart,
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

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;
    return (
      <Mutation mutation={UPDATE_CART_ITEM}>
        {updateCartItem => (
          <Mutation mutation={REMOVE_ITEM_FROM_CART}>
            {removeItemFromCart => (
              <Mutation mutation={ADD_ITEM_TO_CART}>
                {addItemToCart => (
                  <Query query={CART_QUERY}>
                    {({ data: { cart } }) => (
                      <Query query={BEERS_QUERY}>
                        {({ data, loading }) => (
                          <React.Fragment>
                            <AppBar />
                            <div className={classes.root}>
                              <Grid item>
                                <div className={classes.demo}>
                                  {loading ? (
                                    <CircularProgress
                                      className={classes.progress}
                                      size={50}
                                    />
                                  ) : (
                                    <List>
                                      {data.beers.map(item => {
                                        const cartItem = cart.find(
                                          i => i.id === item.id,
                                        );
                                        const value = cartItem
                                          ? cartItem.value
                                          : '';
                                        return (
                                          <ListItem
                                            key={item.id}
                                            expanded={expanded}
                                            item={item}
                                            handlePanelChange={
                                              this.handlePanelChange
                                            }
                                            handleAdd={(id, value) =>
                                              addItemToCart({
                                                variables: { id, value },
                                              })
                                            }
                                            handleRemove={id =>
                                              removeItemFromCart({
                                                variables: { id },
                                              })
                                            }
                                            handleUpdate={(id, value) => {
                                              updateCartItem({
                                                variables: { id, value },
                                              });
                                            }}
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
                        )}
                      </Query>
                    )}
                  </Query>
                )}
              </Mutation>
            )}
          </Mutation>
        )}
      </Mutation>
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

export default withStyles(styles)(App);

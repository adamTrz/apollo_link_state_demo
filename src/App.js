/* @flow */
import * as React from 'react';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Query, compose } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';

import AppBar from './AppBar';
import ListItem from './ListItem';
import { BEERS_QUERY } from './graphql/queries';
import * as Actions from './redux/actions';

import type { Cart, CartAction } from './types';

type State = {
  expanded: ?string | boolean,
};

type Props = {
  classes: *,
  cart: Cart,
  dispatch: (action: CartAction) => void,
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
    this.props.dispatch(Actions.addItemToCart(id, value));
  };

  handleUpdate = (id: string, value: number) => {
    this.props.dispatch(Actions.updateCartItem(id, value));
  };

  handleRemove = (id: string) => {
    this.props.dispatch(Actions.removeItemFromCart(id));
  };

  render() {
    const { classes, cart } = this.props;
    const { expanded } = this.state;
    return (
      <Query query={BEERS_QUERY}>
        {({ data, loading }) => (
          <React.Fragment>
            <AppBar />
            <div className={classes.root}>
              <Grid item>
                <div className={classes.demo}>
                  {loading ? (
                    <CircularProgress className={classes.progress} size={50} />
                  ) : (
                    <List>
                      {data.beers.map(item => {
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
        )}
      </Query>
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

const mapStateToProps = state => ({
  cart: state.cart,
});

export default compose(
  connect(
    mapStateToProps,
    null,
  ),
  withStyles(styles),
)(App);

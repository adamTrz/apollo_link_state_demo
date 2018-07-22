/* @flow */
import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';

import type { Cart } from './types';

type Props = {
  cart: Cart,
  classes: *,
};

const Bar = ({ cart, classes }: Props) => {
  const cartCount = cart.length;
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="title" color="inherit" className={classes.flex}>
          Beers
        </Typography>
        <Badge
          className={classes.margin}
          badgeContent={cartCount}
          color="secondary"
        >
          <IconButton color="inherit" className={classes.menuButton}>
            <ShoppingCart />
          </IconButton>
        </Badge>
      </Toolbar>
    </AppBar>
  );
};

const styles = theme => ({
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: -12,
  },
  margin: {
    margin: theme.spacing.unit * 2,
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
)(Bar);

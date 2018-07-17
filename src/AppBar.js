/* @flow */
import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

type Props = {
  cart: { [key: string]: string },
  classes: *,
};

const Bar = ({ cart, classes }: Props) => {
  const cartCount = Object.keys(cart).length;
  console.log('cart', cart);
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="title" color="inherit" className={classes.flex}>
          Photos
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

export default withStyles(styles)(Bar);

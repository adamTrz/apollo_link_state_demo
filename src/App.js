/* @flow */
import * as React from 'react';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import AppBar from './AppBar';
import ListItem from './ListItem';

export type Beer = {
  name: string,
  description: string,
  id: string,
  tagline: string,
  image_url: string,
};

type State = {
  cart: { [key: string]: string },
  beers: Array<Beer>,
  expanded: ?string | boolean,
};
type Props = {
  classes: *,
};

class App extends React.Component<Props, State> {
  state = {
    cart: {},
    beers: [],
    expanded: null,
  };

  componentDidMount() {
    this.fetchBeers();
  }

  fetchBeers = async () => {
    const resp = await fetch('https://api.punkapi.com/v2/beers');
    const beers = await resp.json();
    this.setState({ beers });
  };

  handleInputChange = (value: string, id: string) => {
    this.setState(state => ({
      cart: { ...state.cart, [id]: value },
    }));
  };

  handlePanelChange = (panel: string) => (event, expanded: boolean) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded, cart, beers } = this.state;

    return (
      <React.Fragment>
        <AppBar cart={cart} />
        <div className={classes.root}>
          <Grid item>
            <div className={classes.demo}>
              <List>
                {beers.map(item => (
                  <ListItem
                    key={item.id}
                    expanded={expanded}
                    cart={cart}
                    item={item}
                    handlePanelChange={this.handlePanelChange}
                    handleInputChange={this.handleInputChange}
                  />
                ))}
              </List>
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

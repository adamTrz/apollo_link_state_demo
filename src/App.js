/* @flow */
import * as React from 'react';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';

import AppBar from './AppBar';
import ListItem from './ListItem';
import { BEERS_QUERY } from './graphqj';

export type Beer = {
  name: string,
  description: string,
  id: string,
  tagline: string,
  image_url: string,
};

type State = {
  cart: { [key: string]: string },
  expanded: ?string | boolean,
};

type Props = {
  classes: *,
};

class App extends React.Component<Props, State> {
  state = {
    cart: {},
    expanded: null,
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
    const { expanded, cart } = this.state;

    return (
      <Query query={BEERS_QUERY}>
        {({ data, loading }) => {
          return (
            <React.Fragment>
              <AppBar cart={cart} />
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
                        {data.beers.map(item => (
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
                    )}
                  </div>
                </Grid>
              </div>
            </React.Fragment>
          );
        }}
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

export default withStyles(styles)(App);

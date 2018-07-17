/* @flow */
import * as React from 'react';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';

import type { Beer } from './App';

type Props = {
  classes: *,
  item: Beer,
  handlePanelChange: (panel: string) => (event: *, expanded: boolean) => void,
  handleInputChange: (value: string, id: string) => void,
  expanded: ?string | ?boolean,
  cart: { [key: string]: string },
};

const ListItem = ({
  classes,
  item,
  handlePanelChange,
  handleInputChange,
  expanded,
  cart,
}: Props) => (
  <React.Fragment>
    <ExpansionPanel
      expanded={expanded === item.id}
      onChange={handlePanelChange(item.id)}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <img alt={item.name} src={item.image_url} className={classes.avatar} />
        <ListItemText primary={item.name} secondary={item.tagline} />
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid>
          <Typography variant="caption" gutterBottom>
            {item.description}
          </Typography>
          <TextField
            id="order"
            label="Your Order"
            className={classes.textField}
            value={cart[item.id]}
            onChange={event => handleInputChange(event.target.value, item.id)}
            margin="normal"
          />
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
    <Divider />
  </React.Fragment>
);

const styles = theme => ({
  textField: {
    marginTop: 0,
  },
  avatar: {
    width: 60,
    height: 120,
    objectFit: 'contain',
  },
});

export default withStyles(styles)(ListItem);

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
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import Update from '@material-ui/icons/Update';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

import type { Beer } from './types';

type Props = {
  classes: *,
  item: Beer,
  handlePanelChange: (panel: string) => (event: *, expanded: boolean) => void,
  handleAdd: (id: string, value: number) => void,
  handleRemove: (id: string) => void,
  handleUpdate: (id: string, value: number) => void,
  expanded: ?string | ?boolean,
  value: number,
};

type State = {
  value: string,
};
class ListItem extends React.Component<Props, State> {
  state = {
    value: this.props.value.toString() || '',
  };

  componentWillReceiveProps(nextProps: Props) {
    this.setState({ value: nextProps.value.toString() });
  }

  handleChange = event => {
    const str = event.target.value;
    const value = str.replace(/\D/g, '');
    this.setState({ value });
  };

  addOrUpdateItem = () => {
    if (!this.state.value) return;
    const value = parseInt(this.state.value, 10);
    if (this.props.value) {
      this.props.handleUpdate(this.props.item.id, value);
    } else {
      this.props.handleAdd(this.props.item.id, value);
    }
  };

  removeItem = () => {
    this.props.handleRemove(this.props.item.id);
  };

  render() {
    const {
      classes,
      item: { id, name, description, image_url, tagline },
      handlePanelChange,
      expanded,
    } = this.props;
    return (
      <React.Fragment>
        <ExpansionPanel
          expanded={expanded === id}
          onChange={handlePanelChange(id)}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <img alt={name} src={image_url} className={classes.avatar} />
            <ListItemText primary={name} secondary={tagline} />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid>
              <Typography variant="caption" gutterBottom>
                {description}
              </Typography>
              <div className={classes.row}>
                <TextField
                  id="order"
                  label="Your Order"
                  className={classes.textField}
                  value={this.state.value}
                  onChange={this.handleChange}
                  margin="normal"
                />
                <IconButton
                  className={classes.buttonAdd}
                  onClick={this.addOrUpdateItem}
                >
                  {this.props.value ? <Update /> : <Add />}
                </IconButton>
                {this.props.value && (
                  <IconButton
                    className={classes.buttonRemove}
                    onClick={this.removeItem}
                  >
                    <Remove />
                  </IconButton>
                )}
              </div>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <Divider />
      </React.Fragment>
    );
  }
}

const styles = theme => ({
  textField: {
    marginTop: 0,
  },
  avatar: {
    width: 60,
    height: 120,
    objectFit: 'contain',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  buttonAdd: {
    marginTop: 5,
    '&:hover': {
      color: green[800],
    },
  },
  buttonRemove: {
    marginTop: 5,
    '&:hover': {
      color: red[800],
    },
  },
});

export default withStyles(styles)(ListItem);

import React, { useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import {
  Switch,
  Container,
  FormControlLabel,
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Stepper,
  Step,
  StepLabel,
  Button,
  Paper,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/styles';
import { withFirebase } from '../components/FirebaseContext';
import { selectHazardAssessment } from '../state/app';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
  },
  stepperButtons: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const HazardAssessmentForm = props => {
  const { firebase, selectAHazardAssessment } = props;
  const { selectedHA } = props.state;
  const theme = useTheme();
  const classes = useStyles(theme);
  const [selectedHADetails, updateSelectedHADetails] = useState({});
  console.log(selectedHADetails);

  useEffect(() => {
    if (selectedHA !== undefined) {
      const hazardAssessmentRef = firebase.database().ref(`JHA/${selectedHA}`);
      hazardAssessmentRef.on('value', snapshot => {
        const hazardAssessmentsObj = snapshot.val();
        updateSelectedHADetails(hazardAssessmentsObj);
      });
    }
  }, [selectedHA]);

  return (
    <Container maxWidth="md" className={classes.root}>
      <Paper className={classes.paper} square>
        <Grid container spacing={2} justify="space-between">
          <Grid item>
            <TextField
              label="Project"
              variant="outlined"
              disabled
              value={selectedHADetails.project}
            />
          </Grid>
          <Grid item>
            <TextField
              id="datetime-local"
              label="Time In"
              type="datetime-local"
              value={selectedHADetails.timeIn}
              disabled
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={<Switch color="primary" />}
              label="Client/Owner on Site"
            />
          </Grid>
        </Grid>
        <Divider variant="middle" className={classes.divider} />
        <Grid container spacing={2}>
          <Grid item>
            <Button variant="outlined" color="primary">
              Get Location
            </Button>
          </Grid>
          <Grid item>
            <TextField disabled label="Longitude" variant="outlined" />
          </Grid>
          <Grid item>
            <TextField disabled label="Latitude" variant="outlined" />
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.paper} square>
        <Grid container spacing={2}></Grid>
        <Divider className={classes.divider} />
        <Grid container spacing={2} justify="space-between"></Grid>

        <TextField
          label="Mitigation Steps"
          fullWidth
          helperText="How will you mitigate the risks above"
          variant="outlined"
          multiline
          rows={5}
        />
      </Paper>
      <Paper className={classes.paper} square>
        <Grid container spacing={2} justify="space-between"></Grid>
        <FormControlLabel
          control={<Switch color="primary" />}
          label="Is Specialized PPE Required?"
        />
        <Divider className={classes.divider} />
        <>
          <Grid container spacing={2} justify="space-between"></Grid>
          <Divider className={classes.divider} />
        </>
        <FormControlLabel
          control={<Switch color="primary" />}
          label="Is It Safe To Proceed?"
        />
        <TextField
          label="Explanation"
          fullWidth
          helperText="Explain why it is not safe to proceed"
          variant="outlined"
          multiline
          rows={5}
        />
      </Paper>
    </Container>
  );
};

const mapStateToProps = (_state, ownProps) => ({
  ...ownProps,
  state: _state.app,
});

const mapDispatchToProps = dispatch => ({
  selectAHazardAssessment: hazardAssessment =>
    dispatch(selectHazardAssessment(hazardAssessment)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFirebase
)(HazardAssessmentForm);

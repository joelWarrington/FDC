import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import {
  Switch,
  Container,
  FormControlLabel,
  TextField,
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
} from '@material-ui/core';
import PropTypes from 'prop-types';
import moment from 'moment';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles, useTheme } from '@material-ui/styles';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import OrangeRadio from '../../atoms/OrangeRadioButton';
import { withFirebase } from '../../containers/FirebaseContext';
import { updateCurrentHazardAssessment } from '../../../state/app';

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
  const theme = useTheme();
  const classes = useStyles(theme);
  const {
    firebase,
    id,
    stepped,
    disabled,
    updateHazardAssessment,
    state,
  } = props;

  const { currentHazardAssessment } = state;

  const [activeStep, updateActiveStep] = useState(0);
  const [steps, updateSteps] = useState([
    'Project Details',
    'Ressourcing Information',
    'Site Questions',
    'Site Issues',
    'Images',
    'Comments',
  ]);
  const [projects, updateProjects] = useState(['Project 1', 'Project 2']);

  useEffect(() => {
    updateHazardAssessment({
      project: '',
      timeIn: moment().format('YYYY-MM-DD[T]HH:mm'),
      location: {
        latitude: '',
        longitude: '',
      },
    });
    if (id !== null) {
      firebase
        .database()
        .ref(`/JHA/${id}`)
        .once('value', snapshot => {
          updateHazardAssessment(snapshot.val());
        });
    }
  }, [id]);

  const submitForm = () => {
    const currentUserID = firebase.auth().currentUser.uid;
    let submissionID = uuidv4();
    if (id) {
      submissionID = id;
    }
    firebase
      .database()
      .ref(`/JHA/${submissionID}`)
      .set({
        user: currentUserID,
        ...currentHazardAssessment,
      })
      .then(() => {
        navigate('/forms/ha');
      });
  };

  const PPESection = () => <></>;

  return (
    <div className={classes.root}>
      {stepped ? (
        <>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map(step => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Paper className={classes.paper} square>
            {
              // insert steps here
              // Contractor
              //
            }
          </Paper>
          <Grid
            className={classes.stepperButtons}
            container
            justify="flex-end"
            spacing={1}
          >
            {activeStep > 0 && (
              <Grid item>
                <Button
                  onClick={() => {
                    if (activeStep > 0) {
                      updateActiveStep(activeStep - 1);
                    }
                  }}
                >
                  Back
                </Button>
              </Grid>
            )}
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  if (activeStep !== steps.length - 1) {
                    updateActiveStep(activeStep + 1);
                  } else {
                    submitForm();
                  }
                }}
              >
                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Paper className={classes.paper} square>
            {projectSection()}
            {hazardIdentificationSection()}
            {PPESection()}
          </Paper>
          <Grid
            className={classes.stepperButtons}
            container
            justify="flex-end"
            spacing={1}
          >
            <Grid item>
              <Button
                disabled={!disabled}
                variant="contained"
                color="primary"
                onClick={() => {
                  submitForm();
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};

HazardAssessmentForm.defaultProps = {
  id: null,
  stepped: false,
  disabled: false,
};

HazardAssessmentForm.propTypes = {
  id: PropTypes.string,
  stepped: PropTypes.bool,
  disabled: PropTypes.bool,
};

const mapStateToProps = (_state, ownProps) => ({
  ...ownProps,
  state: _state.app,
});

const mapDispatchToProps = dispatch => ({
  updateHazardAssessment: payload =>
    dispatch(updateCurrentHazardAssessment(payload)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFirebase
)(HazardAssessmentForm);

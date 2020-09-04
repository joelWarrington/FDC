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
import { withFirebase } from '../../containers/FirebaseContext';

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

const RequestForInformationForm = props => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { firebase, id, stepped, editable } = props;

  const [activeStep, updateActiveStep] = useState(0);
  const [steps, updateSteps] = useState([]);

  useEffect(() => {
    if (id !== null) {
      const requestForInformationRef = firebase.database().ref(`/RFI/${id}`);
      requestForInformationRef.once('value', snapshot => {
        const requestForInformationSnapshot = snapshot.val();
        if (requestForInformationSnapshot !== null) {
          //
        }
      });
    }
  }, [id]);

  const formSubmission = () => {
    const currentUserID = firebase.auth().currentUser.uid;
    let submissionID = uuidv4();
    if (id) {
      submissionID = id;
    }
    firebase
      .database()
      .ref(`/RFI/${submissionID}`)
      .set({
        user: currentUserID,
      })
      .then(() => {
        navigate('/forms/rfi');
      });
  };

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
            {steps[activeStep] === 'Project Details' && projectSection()}
            {steps[activeStep] === 'Hazard Identification' &&
              hazardIdentificationSection()}
            {steps[activeStep] === 'PPE' && PPESection()}
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
                    formSubmission();
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
          <Paper className={classes.paper} square></Paper>
          <Grid
            className={classes.stepperButtons}
            container
            justify="flex-end"
            spacing={1}
          >
            <Grid item>
              <Button
                disabled={!editable}
                variant="contained"
                color="primary"
                onClick={() => {
                  formSubmission();
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

RequestForInformationForm.defaultProps = {
  id: null,
  stepped: false,
  editable: false,
};

RequestForInformationForm.propTypes = {
  id: PropTypes.string,
  stepped: PropTypes.bool,
  editable: PropTypes.bool,
};

const mapStateToProps = (_state, ownProps) => ({ ...ownProps });

export default compose(
  connect(mapStateToProps),
  withFirebase
)(RequestForInformationForm);

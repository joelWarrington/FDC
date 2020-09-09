import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import {
  Switch,
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
  Checkbox,
  Typography,
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Card,
  CardContent,
  CardActions,
  useMediaQuery,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles, useTheme } from '@material-ui/styles';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { DateTimePicker } from '@material-ui/pickers';
import {
  LocationOn as LocationOnIcon,
  LocationOff as LocationOffIcon,
} from '@material-ui/icons';
import OrangeRadio from '../atoms/OrangeRadioButton';
import { withFirebase } from './FirebaseContext';
import { updateCurrentDailyReport } from '../../state/app';
import { dailyReportDefaultValues } from '../../formDefaults';
import DefaultFormFieldSection from './DefaultFormFieldSection';

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
  card_item: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  card_content: {
    flexGrow: 1,
  },
}));

const DailyReportForm = props => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const { firebase, id, stepped, disabled, updateDailyReport, state } = props;

  const { currentDailyReport } = state;

  const [activeStep, updateActiveStep] = useState(0);
  const [steps, updateSteps] = useState(['Project Details']);

  const isMobile = useMediaQuery('(max-width: 600px)');

  useEffect(() => {
    // Update the default form values if an id prop is supplied
    if (id !== null) {
      firebase
        .database()
        .ref(`/JHA/${id}`)
        .once('value', snapshot => {
          updateDailyReport(snapshot.val());
        });
    } else {
      updateDailyReport(dailyReportDefaultValues);
    }
  }, [id]);

  const handleFormInputChange = (key, value) => {
    updateDailyReport({
      ...currentDailyReport,
      [key]: value,
    });
  };

  const handleFormSubmission = () => {
    const currentUserID = firebase.auth().currentUser.uid;
    let submissionID = uuidv4();
    if (id) {
      submissionID = id;
    }
    firebase
      .database()
      .ref(`/DR/${submissionID}`)
      .set({
        user: currentUserID,
        ...currentDailyReport,
      })
      .then(() => {
        navigate('/forms/dr');
      });
  };

  const projectSection = () => {
    const { submissionDate, project, station, location } = currentDailyReport;
    return (
      <DefaultFormFieldSection
        handleFormInputChange={handleFormInputChange}
        submissionDate={submissionDate}
        project={project}
        station={station}
        location={location}
        disabled={disabled}
      />
    );
  };

  const RessourcingSection = () => {
    // Prime Contractor
    // Contractors on Site
    // Subcontractor
    // head count
    // visitors
    // reason
    // Equipment
    // quantity
    // notes
    // Site Activities
    // Type
    //
  };

  const SiteQuestionsSection = () => {
    // Site weather
    // ["Rainy", "Cloudy", "Sunny", "Dusty", "Snow", "Fog"]
    // Site Activities
    // Type
    // Description
    // Was contractor delayed
    // Was a milestone affected
    // Were there any change orders active today?
    // Was any re-work required today?
    // Have the redlines been updated for the work today
    // Were the construction records updated for the work done today
    // were there any protestors
  };

  return (
    <div className={classes.root}>
      {stepped ? (
        <>
          <Stepper
            activeStep={activeStep}
            orientation={isMobile ? 'vertical' : 'horizontal'}
          >
            {steps.map(step => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Paper className={classes.paper} square>
            {steps[activeStep] === 'Project Details' && projectSection()}
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
                    handleFormSubmission();
                  }
                  window.scrollTo(0, 0);
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
            {
              // add sections here
            }
          </Paper>
          <Grid
            className={classes.stepperButtons}
            container
            justify="flex-end"
            spacing={1}
          >
            <Grid item>
              <Button
                disabled={disabled}
                variant="contained"
                color="primary"
                onClick={() => {
                  handleFormSubmission();
                  window.scrollTo(0, 0);
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

DailyReportForm.defaultProps = {
  id: null,
  stepped: false,
  disabled: false,
};

DailyReportForm.propTypes = {
  id: PropTypes.string,
  stepped: PropTypes.bool,
  disabled: PropTypes.bool,
};

const mapStateToProps = (_state, ownProps) => ({
  ...ownProps,
  state: _state.app,
});

const mapDispatchToProps = dispatch => ({
  updateDailyReport: payload => dispatch(updateCurrentDailyReport(payload)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFirebase
)(DailyReportForm);

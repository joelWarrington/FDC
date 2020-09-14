import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Paper,
  Grid,
  useMediaQuery,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { withFirebase } from '../../containers/FirebaseContext';
import { updateCurrentDailyReport } from '../../../state/app';
import { dailyReportDefaultValues } from '../../../formDefaults';

import ProjectDetailSection from '../common/ProjectDetailSection';
import RessourcingDetailsSection from './RessourcingDetailsSection';
import SiteQuestionsSection from './SiteQuestionsSection';

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

  const steps = ['Project Details', 'Ressourcing', 'Site Questions'];

  const [temperature, handleTemperatureChange] = useState();
  const [siteActivities, updateSiteActivities] = useState(['']);

  const {
    firebase,
    id,
    stepped,
    disabled,
    updateDailyReport,
    dailyReport,
  } = props;

  const {
    submissionDate,
    project,
    station,
    location,
    weather,
    contractors,
  } = dailyReport;

  const [activeStep, updateActiveStep] = useState(0);

  const isMobile = useMediaQuery('(max-width: 600px)');

  useEffect(() => {
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
      ...dailyReport,
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
        ...dailyReport,
      })
      .then(() => {
        navigate('/forms/dr');
      });
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
            {steps[activeStep] === 'Project Details' && (
              <ProjectDetailSection
                handleFormInputChange={handleFormInputChange}
                submissionDate={submissionDate}
                project={project}
                station={station}
                location={location}
                disabled={disabled}
              />
            )}
            {steps[activeStep] === 'Ressourcing' && (
              <RessourcingDetailsSection
                handleFormInputChange={handleFormInputChange}
                contractors={contractors}
                disabled={disabled}
              />
            )}
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
            <ProjectDetailSection
              handleFormInputChange={handleFormInputChange}
              submissionDate={submissionDate}
              project={project}
              station={station}
              location={location}
              disabled={disabled}
            />
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
  dailyReport: _state.app.currentDailyReport,
});

const mapDispatchToProps = dispatch => ({
  updateDailyReport: payload => dispatch(updateCurrentDailyReport(payload)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFirebase
)(DailyReportForm);

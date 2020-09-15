import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { withFirebase } from '../../containers/FirebaseContext';
import { updateCurrentHazardAssessment } from '../../../state/app';
import { hazardAssessmentDefaultValues } from '../../../formDefaults';

import ProjectDetails from '../common/ProjectDetailSection';
import HazardIdentificationDetails from './HazardIdentificationSection';
import PPEDetails from './PPESection';

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

const HazardAssessmentForm = props => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const {
    firebase,
    id,
    stepped,
    disabled,
    updateHazardAssessment,
    hazardAssessment,
  } = props;

  const {
    submissionDate,
    project,
    station,
    location,
    ownerOnSite,
    hazards,
    miscHazards,
    mitigationSteps,
    PPE,
    isItSafeToProceed,
    safeToProceedExplanation,
  } = hazardAssessment;

  const steps = ['Project Details', 'Hazard Identification', 'PPE'];
  const [activeStep, updateActiveStep] = useState(0);
  const isMobile = useMediaQuery('(max-width: 600px)');

  useEffect(() => {
    if (id !== null) {
      firebase
        .database()
        .ref(`/JHA/${id}`)
        .once('value', snapshot => {
          updateHazardAssessment(snapshot.val());
        });
    } else {
      updateHazardAssessment(hazardAssessmentDefaultValues);
    }
  }, [id]);

  const handleFormInputChange = (key, value) => {
    updateHazardAssessment({
      ...hazardAssessment,
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
      .ref(`/JHA/${submissionID}`)
      .set({
        user: currentUserID,
        ...hazardAssessment,
      })
      .then(() => {
        navigate('/forms/ha');
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
              <ProjectDetails
                handleFormInputChange={handleFormInputChange}
                submissionDate={submissionDate}
                project={project}
                station={station}
                location={location}
                disabled={disabled}
              />
            )}
            {steps[activeStep] === 'Hazard Identification' && (
              <HazardIdentificationDetails
                handleFormInputChange={handleFormInputChange}
                ownerOnSite={ownerOnSite}
                hazards={hazards}
                miscHazards={miscHazards}
                mitigationSteps={mitigationSteps}
                disabled={disabled}
              />
            )}
            {steps[activeStep] === 'PPE' && (
              <PPEDetails
                handleFormInputChange={handleFormInputChange}
                PPE={PPE}
                isItSafeToProceed={isItSafeToProceed}
                safeToProceedExplanation={safeToProceedExplanation}
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
            <ProjectDetails
              handleFormInputChange={handleFormInputChange}
              submissionDate={submissionDate}
              project={project}
              station={station}
              location={location}
              disabled={disabled}
            />
            <HazardIdentificationDetails
              handleFormInputChange={handleFormInputChange}
              ownerOnSite={ownerOnSite}
              hazards={hazards}
              miscHazards={miscHazards}
              mitigationSteps={mitigationSteps}
              disabled={disabled}
            />
            <PPEDetails
              handleFormInputChange={handleFormInputChange}
              PPE={PPE}
              isItSafeToProceed={isItSafeToProceed}
              safeToProceedExplanation={safeToProceedExplanation}
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
  hazardAssessment: _state.app.currentHazardAssessment,
});

const mapDispatchToProps = dispatch => ({
  updateHazardAssessment: payload =>
    dispatch(updateCurrentHazardAssessment(payload)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFirebase
)(HazardAssessmentForm);

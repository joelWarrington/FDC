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
    'Hazard Identification',
    'PPE',
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
      ownerOnSite: false,
      mitigationSteps: '',
      hazards: [
        { label: 'COVID-19', name: 'covid19', risk: 'N/A' },
        { label: 'Heights Over 3 Meters', name: 'heights', risk: 'N/A' },
        { label: 'Hot Materials', name: 'hot-materials', risk: 'N/A' },
        { label: 'Open Flame', name: 'open-flame', risk: 'N/A' },
        { label: 'Debris', name: 'debris', risk: 'N/A' },
        { label: 'Chemical Hazards', name: 'chemical', risk: 'N/A' },
        { label: 'Biological Hazards', name: 'biological', risk: 'N/A' },
        { label: 'Inadequate Lighting', name: 'lighting', risk: 'N/A' },
        { label: 'Confined Spaces', name: 'confined-spaces', risk: 'N/A' },
        {
          label: 'Weather Conditions',
          name: 'weather-conditions',
          risk: 'N/A',
        },
        { label: 'Moving Equipment', name: 'moving-equipment', risk: 'N/A' },
      ],
      miscHazards: [
        { label: 'Natural Gas is on', checked: true },
        { label: 'Propane is on', checked: true },
        { label: 'Water is on', checked: true },
        { label: 'Structure is intact', checked: true },
        { label: 'Site is secure', checked: true },
      ],
      PPE: [
        { label: 'Hard Hat', checked: false },
        { label: 'Steel Toe Boots', checked: false },
        { label: 'High Visibility Vest', checked: false },
        { label: 'Eye Protection', checked: false },
      ],
      specializedPPERequired: false,
      specializedPPE: [
        { label: 'Tool Lanyards', checked: false },
        { label: 'Hearing (Ear Plugs or Muffs)', checked: false },
        { label: 'Respiratory', checked: false },
        { label: 'Hand Protection', checked: false },
        { label: 'Gas Monitors', checked: false },
      ],
      isItSafeToProceed: false,
      safeToProceedExplanation: '',
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

  const formSubmission = () => {
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

  const projectSection = () => (
    <>
      <Grid container spacing={2} justify="space-between">
        <Grid item>
          <Autocomplete
            options={projects}
            value={currentHazardAssessment.project}
            onChange={evt => {
              updateHazardAssessment({
                ...currentHazardAssessment,
                projects: [evt.target.value],
              });
            }}
            disabled={disabled}
            renderInput={params => (
              <TextField {...params} label="Project" variant="outlined" />
            )}
          />
        </Grid>
        <Grid item>
          <TextField
            id="datetime-local"
            label="Time In"
            type="datetime-local"
            value={currentHazardAssessment.timeIn}
            onChange={evt => {
              updateHazardAssessment({
                ...currentHazardAssessment,
                timeIn: [evt.target.value],
              });
            }}
            disabled={disabled}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={<Switch color="primary" />}
            label="Client/Owner on Site"
            checked={currentHazardAssessment.ownerOnSite}
            disabled={disabled}
            onChange={() => {
              updateHazardAssessment({
                ...currentHazardAssessment,
                ownerOnSite: !currentHazardAssessment.ownerOnSite,
              });
            }}
          />
        </Grid>
      </Grid>
      <Divider variant="middle" className={classes.divider} />
      <Grid container spacing={2}>
        {!disabled && (
          <Grid item>
            <Button
              variant="outlined"
              color="primary"
              disabled={disabled}
              onClick={() => {
                navigator.geolocation.getCurrentPosition(position => {
                  const { latitude, longitude } = position.coords;
                  updateHazardAssessment({
                    ...currentHazardAssessment,
                    location: {
                      latitude,
                      longitude,
                    },
                  });
                });
              }}
            >
              Get Location
            </Button>
          </Grid>
        )}
        <Grid item>
          <TextField
            disabled
            label="Longitude"
            variant="outlined"
            value={currentHazardAssessment?.location?.longitude}
          />
        </Grid>
        <Grid item>
          <TextField
            disabled
            label="Latitude"
            variant="outlined"
            value={currentHazardAssessment?.location?.latitude}
          />
        </Grid>
      </Grid>
    </>
  );
  const hazardIdentificationSection = () => (
    <>
      <Grid container spacing={2}>
        {currentHazardAssessment.miscHazards?.map((miscHazard, index) => (
          <Grid item xs={6} sm={3} key={miscHazard.label}>
            <FormControlLabel
              control={<Switch color="primary" />}
              label={miscHazard.label}
              checked={miscHazard.checked}
              disabled={disabled}
              onChange={() => {
                updateHazardAssessment({
                  ...currentHazardAssessment,
                  miscHazards: currentHazardAssessment.miscHazards.map(
                    (hazard, hazardIndex) => {
                      if (index === hazardIndex) {
                        return { ...hazard, checked: !hazard.checked };
                      }
                      return hazard;
                    }
                  ),
                });
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Divider className={classes.divider} />
      <Grid container spacing={2} justify="space-between">
        {currentHazardAssessment.hazards?.map((hazard, index) => (
          <Grid item key={hazard.name}>
            <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">{hazard.label}</FormLabel>
              <RadioGroup
                row
                aria-label={hazard.name}
                name={hazard.name}
                value={hazard.risk}
                onChange={evt => {
                  updateHazardAssessment({
                    ...currentHazardAssessment,
                    hazards: currentHazardAssessment.hazards.map(
                      (currentHazard, currentHazardIndex) => {
                        if (index === currentHazardIndex) {
                          return {
                            ...currentHazard,
                            risk: evt.target.value,
                          };
                        }
                        return currentHazard;
                      }
                    ),
                  });
                }}
              >
                <FormControlLabel
                  disabled={disabled}
                  value="N/A"
                  control={<OrangeRadio />}
                  label="N/A"
                />
                <FormControlLabel
                  disabled={disabled}
                  value="Minor"
                  control={<OrangeRadio />}
                  label="Minor"
                />
                <FormControlLabel
                  disabled={disabled}
                  value="Moderate"
                  control={<OrangeRadio />}
                  label="Moderate"
                />
                <FormControlLabel
                  disabled={disabled}
                  value="Severe"
                  control={<OrangeRadio />}
                  label="Severe"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        ))}
      </Grid>
      <TextField
        label="Mitigation Steps"
        disabled={disabled}
        fullWidth
        helperText="How will you mitigate the risks above"
        variant="outlined"
        multiline
        rows={5}
        value={currentHazardAssessment.mitigationSteps}
        onChange={evt => {
          updateHazardAssessment({
            ...currentHazardAssessment,
            mitigationSteps: evt.target.value,
          });
        }}
      />
    </>
  );

  const PPESection = () => (
    <>
      <Grid container spacing={2} justify="space-between">
        {currentHazardAssessment.PPE?.map((currentPPE, index) => (
          <Grid item xs={6} sm={3} key={currentPPE.label}>
            <FormControlLabel
              control={<Switch color="primary" />}
              label={currentPPE.label}
              checked={currentPPE.checked}
              disabled={disabled}
              onChange={() => {
                updateHazardAssessment({
                  ...currentHazardAssessment,
                  PPE: currentHazardAssessment.PPE.map(
                    (currentPPEquipment, currentPPEIndex) => {
                      if (index === currentPPEIndex) {
                        return {
                          ...currentPPEquipment,
                          checked: !currentPPEquipment.checked,
                        };
                      }
                      return currentPPEquipment;
                    }
                  ),
                });
              }}
            />
          </Grid>
        ))}
      </Grid>
      <FormControlLabel
        control={<Switch color="primary" />}
        label="Is Specialized PPE Required?"
        checked={currentHazardAssessment.specializedPPERequired}
        disabled={disabled}
        onChange={() => {
          updateHazardAssessment({
            ...currentHazardAssessment,
            specializedPPERequired: !currentHazardAssessment.specializedPPERequired,
          });
        }}
      />
      <Divider className={classes.divider} />
      {currentHazardAssessment.specializedPPERequired && (
        <>
          <Grid container spacing={2} justify="space-between">
            {currentHazardAssessment.specializedPPE.map((currentPPE, index) => (
              <Grid item xs={6} sm={3} key={currentPPE.label}>
                <FormControlLabel
                  control={<Switch color="primary" disabled={disabled} />}
                  label={currentPPE.label}
                  checked={currentPPE.checked}
                  onChange={() => {
                    updateHazardAssessment({
                      ...currentHazardAssessment,
                      specializedPPE: currentHazardAssessment.specializedPPE.map(
                        (currentPPEquipment, currentPPEIndex) => {
                          if (index === currentPPEIndex) {
                            return {
                              ...currentPPEquipment,
                              checked: !currentPPEquipment.checked,
                            };
                          }
                          return currentPPEquipment;
                        }
                      ),
                    });
                  }}
                />
              </Grid>
            ))}
          </Grid>
          <Divider className={classes.divider} />
        </>
      )}
      <FormControlLabel
        control={<Switch color="primary" />}
        label="Is It Safe To Proceed?"
        checked={currentHazardAssessment.isItSafeToProceed}
        disabled={disabled}
        onChange={() => {
          updateHazardAssessment({
            ...currentHazardAssessment,
            isItSafeToProceed: !currentHazardAssessment.isItSafeToProceed,
          });
        }}
      />
      {!currentHazardAssessment.isItSafeToProceed && (
        <TextField
          label="Explanation"
          fullWidth
          helperText="Explain why it is not safe to proceed"
          variant="outlined"
          multiline
          rows={5}
          disabled={disabled}
          value={currentHazardAssessment.safeToProceedExplanation}
          onChange={evt => {
            updateHazardAssessment({
              ...currentHazardAssessment,
              safeToProceedExplanation: evt.target.value,
            });
          }}
        />
      )}
    </>
  );

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

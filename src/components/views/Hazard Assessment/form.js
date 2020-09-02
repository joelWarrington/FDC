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
  const { firebase, id, stepped, editable } = props;

  const [activeStep, updateActiveStep] = useState(0);
  const [steps, updateSteps] = useState([
    'Project Details',
    'Hazard Identification',
    'PPE',
  ]);
  const [projects, updateProjects] = useState(['Project 1', 'Project 2']);
  const [project, updateProject] = useState('');
  const [timeIn, updateTimeIn] = useState(
    moment().format('YYYY-MM-DD[T]HH:mm')
  );
  const [location, updateLocation] = useState({
    latitude: '',
    longitude: '',
  });
  const [ownerOnSite, updateOwnerOnSite] = useState(false);
  const [mitigationSteps, updateMitigationSteps] = useState('');
  const [hazards, updateHazards] = useState([
    { label: 'COVID-19', name: 'covid19', risk: 'N/A' },
    { label: 'Heights Over 3 Meters', name: 'heights', risk: 'N/A' },
    { label: 'Hot Materials', name: 'hot-materials', risk: 'N/A' },
    { label: 'Open Flame', name: 'open-flame', risk: 'N/A' },
    { label: 'Debris', name: 'debris', risk: 'N/A' },
    { label: 'Chemical Hazards', name: 'chemical', risk: 'N/A' },
    { label: 'Biological Hazards', name: 'biological', risk: 'N/A' },
    { label: 'Inadequate Lighting', name: 'lighting', risk: 'N/A' },
    { label: 'Confined Spaces', name: 'confined-spaces', risk: 'N/A' },
    { label: 'Weather Conditions', name: 'weather-conditions', risk: 'N/A' },
    { label: 'Moving Equipment', name: 'moving-equipment', risk: 'N/A' },
  ]);
  const [miscHazards, updateMiscHazards] = useState([
    { label: 'Natural Gas is on', checked: true },
    { label: 'Propane is on', checked: true },
    { label: 'Water is on', checked: true },
    { label: 'Structure is intact', checked: true },
    { label: 'Site is secure', checked: true },
  ]);
  const [PPE, updatePPE] = useState([
    { label: 'Hard Hat', checked: false },
    { label: 'Steel Toe Boots', checked: false },
    { label: 'High Visibility Vest', checked: false },
    { label: 'Eye Protection', checked: false },
  ]);
  const [specializedPPERequired, updateSpecializedPPERequired] = useState(
    false
  );
  const [specializedPPE, updateSpecializedPPE] = useState([
    { label: 'Tool Lanyards', checked: false },
    { label: 'Hearing (Ear Plugs or Muffs)', checked: false },
    { label: 'Respiratory', checked: false },
    { label: 'Hand Protection', checked: false },
    { label: 'Gas Monitors', checked: false },
  ]);
  const [isItSafeToProceed, updateIsItSafeToProceed] = useState(false);
  const [safeToProceedExplanation, updateSafeToProceedExplanation] = useState(
    ''
  );

  useEffect(() => {
    if (id !== null) {
      const hazardAssessmentRef = firebase.database().ref(`/JHA/${id}`);
      hazardAssessmentRef.once('value', snapshot => {
        const hazardAssessmentSnapshot = snapshot.val();
        if (hazardAssessmentSnapshot !== null) {
          updateProject(hazardAssessmentSnapshot.project);
          updateTimeIn(hazardAssessmentSnapshot.timeIn);
          updateLocation(hazardAssessmentSnapshot.location);
          updateOwnerOnSite(hazardAssessmentSnapshot.ownerOnSite);
          updateMitigationSteps(hazardAssessmentSnapshot.mitigationSteps);
          updateHazards(hazardAssessmentSnapshot.hazards);
          updateMiscHazards(hazardAssessmentSnapshot.miscHazards);
          updatePPE(hazardAssessmentSnapshot.PPE);
          updateSpecializedPPERequired(
            hazardAssessmentSnapshot.specializedPPERequired
          );
          updateSpecializedPPE(hazardAssessmentSnapshot.specializedPPE);
          updateIsItSafeToProceed(hazardAssessmentSnapshot.isItSafeToProceed);
          updateSafeToProceedExplanation(
            hazardAssessmentSnapshot.safeToProceedExplanation
          );
        }
      });
    }
  }, [id]);

  const formSubmission = () => {
    const currentUserID = firebase.auth().currentUser.uid;
    const newSubmissionID = uuidv4();
    firebase
      .database()
      .ref(`/JHA/${newSubmissionID}`)
      .set({
        user: currentUserID,
        project,
        timeIn,
        location,
        ownerOnSite,
        mitigationSteps,
        hazards,
        miscHazards,
        PPE,
        specializedPPERequired,
        specializedPPE,
        isItSafeToProceed,
        safeToProceedExplanation,
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
            value={project}
            onChange={evt => {
              updateProject(projects[evt.target.value]);
            }}
            disabled={!editable}
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
            value={timeIn}
            onChange={evt => {
              updateTimeIn(evt.target.value);
            }}
            disabled={!editable}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={<Switch color="primary" />}
            label="Client/Owner on Site"
            checked={ownerOnSite}
            disabled={!editable}
            onChange={() => {
              updateOwnerOnSite(!ownerOnSite);
            }}
          />
        </Grid>
      </Grid>
      <Divider variant="middle" className={classes.divider} />
      <Grid container spacing={2}>
        {editable && (
          <Grid item>
            <Button
              variant="outlined"
              color="primary"
              disabled={!editable}
              onClick={() => {
                navigator.geolocation.getCurrentPosition(position => {
                  updateLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
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
            value={location.longitude}
          />
        </Grid>
        <Grid item>
          <TextField
            disabled
            label="Latitude"
            variant="outlined"
            value={location.latitude}
          />
        </Grid>
      </Grid>
    </>
  );
  const hazardIdentificationSection = () => (
    <>
      <Grid container spacing={2}>
        {miscHazards.map((miscHazard, index) => (
          <Grid item xs={6} sm={3} key={miscHazard.label}>
            <FormControlLabel
              control={<Switch color="primary" />}
              label={miscHazard.label}
              checked={miscHazard.checked}
              disabled={!editable}
              onChange={() => {
                const newMiscHazards = [...miscHazards];
                newMiscHazards[index].checked = !newMiscHazards[index].checked;
                updateMiscHazards(newMiscHazards);
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Divider className={classes.divider} />
      <Grid container spacing={2} justify="space-between">
        {hazards.map((hazard, index) => (
          <Grid item key={hazard.name}>
            <FormControl component="fieldset" margin="normal">
              <FormLabel component="legend">{hazard.label}</FormLabel>
              <RadioGroup
                row
                aria-label={hazard.name}
                name={hazard.name}
                value={hazard.risk}
                onChange={evt => {
                  const newHazards = [...hazards];
                  newHazards[index].risk = evt.target.value;
                  updateHazards(newHazards);
                }}
              >
                <FormControlLabel
                  disabled={!editable}
                  value="N/A"
                  control={<OrangeRadio />}
                  label="N/A"
                />
                <FormControlLabel
                  disabled={!editable}
                  value="Minor"
                  control={<OrangeRadio />}
                  label="Minor"
                />
                <FormControlLabel
                  disabled={!editable}
                  value="Moderate"
                  control={<OrangeRadio />}
                  label="Moderate"
                />
                <FormControlLabel
                  disabled={!editable}
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
        disabled={!editable}
        fullWidth
        helperText="How will you mitigate the risks above"
        variant="outlined"
        multiline
        rows={5}
        value={mitigationSteps}
        onChange={evt => {
          updateMitigationSteps(evt.target.value);
        }}
      />
    </>
  );

  const PPESection = () => (
    <>
      <Grid container spacing={2} justify="space-between">
        {PPE.map((currentPPE, index) => (
          <Grid item xs={6} sm={3} key={currentPPE.label}>
            <FormControlLabel
              control={<Switch color="primary" />}
              label={currentPPE.label}
              checked={currentPPE.checked}
              disabled={!editable}
              onChange={() => {
                const newPPE = [...PPE];
                newPPE[index].checked = !PPE[index].checked;
                updatePPE(newPPE);
              }}
            />
          </Grid>
        ))}
      </Grid>
      <FormControlLabel
        control={<Switch color="primary" />}
        label="Is Specialized PPE Required?"
        checked={specializedPPERequired}
        disabled={!editable}
        onChange={() => {
          updateSpecializedPPERequired(!specializedPPERequired);
        }}
      />
      <Divider className={classes.divider} />
      {specializedPPERequired && (
        <>
          <Grid container spacing={2} justify="space-between">
            {specializedPPE.map((currentPPE, index) => (
              <Grid item xs={6} sm={3} key={currentPPE.label}>
                <FormControlLabel
                  control={<Switch color="primary" disabled={!editable} />}
                  label={currentPPE.label}
                  checked={currentPPE.checked}
                  onChange={() => {
                    const newPPE = [...specializedPPE];
                    newPPE[index].checked = !specializedPPE[index].checked;
                    updateSpecializedPPE(newPPE);
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
        checked={isItSafeToProceed}
        disabled={!editable}
        onChange={() => {
          updateIsItSafeToProceed(!isItSafeToProceed);
        }}
      />
      {!isItSafeToProceed && (
        <TextField
          label="Explanation"
          fullWidth
          helperText="Explain why it is not safe to proceed"
          variant="outlined"
          multiline
          rows={5}
          disabled={!editable}
          value={safeToProceedExplanation}
          onChange={evt => {
            updateSafeToProceedExplanation(evt.target.value);
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

HazardAssessmentForm.defaultProps = {
  id: null,
  stepped: false,
  editable: false,
};

HazardAssessmentForm.propTypes = {
  id: PropTypes.string,
  stepped: PropTypes.bool,
  editable: PropTypes.bool,
};

const mapStateToProps = (_state, ownProps) => ({ ...ownProps });

export default compose(
  connect(mapStateToProps),
  withFirebase
)(HazardAssessmentForm);

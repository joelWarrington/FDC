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
import { updateCurrentHazardAssessment } from '../../state/app';
import { hazardAssessmentDefaultValues } from '../../formDefaults';
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

  const isMobile = useMediaQuery('(max-width: 600px)');

  useEffect(() => {
    // Update the default form values if an id prop is supplied
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
      ...currentHazardAssessment,
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
        ...currentHazardAssessment,
      })
      .then(() => {
        navigate('/forms/ha');
      });
  };

  const projectSection = () => {
    const {
      submissionDate,
      project,
      station,
      location,
    } = currentHazardAssessment;
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

  const hazardIdentificationSection = () => (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={3}>
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
        {currentHazardAssessment.miscHazards?.map((miscHazard, index) => (
          <Grid item xs={6} sm={3} key={miscHazard.label}>
            <FormControlLabel
              control={<Switch color="primary" />}
              fullWidth
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
        {currentHazardAssessment.hazards.map((hazard, index) => (
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
      {!disabled && (
        <Grid container spacing={2} justify="space-between">
          <Grid item xs={12} md={4}>
            <Card variant="outlined" className={classes.card_item}>
              <CardContent className={classes.card_content}>
                <Typography variant="h6" gutterBottom>
                  Personal Protective Equipment
                </Typography>
                <Typography variant="body2" component="p">
                  Used as last line of protection against hazards. Not sure what
                  you should be wearing? Find out before getting on site.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  href="https://www.ccohs.ca/teach_tools/phys_hazards/ppe.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card variant="outlined" className={classes.card_item}>
              <CardContent className={classes.card_content}>
                <Typography variant="h6" gutterBottom>
                  Get Hurt?
                </Typography>
                <Typography variant="body2" component="p">
                  Seek medical attention and submit an incident report to
                  prevent future occurences.
                </Typography>
              </CardContent>
              <CardActions>
                {/* <Button size="small">Submit Form</Button> */}
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card variant="outlined" className={classes.card_item}>
              <CardContent className={classes.card_content}>
                <Typography variant="h6" gutterBottom>
                  Fall Protection
                </Typography>
                <Typography variant="body2" component="p">
                  Use of controls designed to protect personnel from falling or
                  in the event they do fall, to stop them without causing severe
                  injury. Be aware of your fall protection plan & procedures.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  href="https://www.ccohs.ca/oshanswers/hsprograms/fall%20protection_general.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      )}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" />
              <TableCell>Equipment</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentHazardAssessment?.PPE?.map((currentPPE, PPEIndex) => (
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={currentPPE.checked}
                    disabled={disabled}
                    onChange={() => {
                      updateHazardAssessment({
                        ...currentHazardAssessment,
                        PPE: currentHazardAssessment.PPE.map(
                          (currentPPEquipment, currentPPEIndex) => {
                            if (PPEIndex === currentPPEIndex) {
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
                </TableCell>
                <TableCell>{currentPPE.name}</TableCell>
                <TableCell>{currentPPE.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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

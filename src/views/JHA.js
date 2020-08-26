import React, { Component } from 'react'

import {
  Typography,
  Switch,
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
  FormGroup,
  Box,
  makeStyles,
  Grid,
  Divider,
} from '@material-ui/core'
import moment from 'moment'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { orange } from '@material-ui/core/colors'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/styles'
import { withFirebase } from '../components/FirebaseContext'

const useStyles = theme => ({
  root: {},
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
})

const OrangeRadio = withStyles({
  root: {
    color: orange[400],
    '&$checked': {
      color: orange[600],
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />)

class JHA extends Component {
  state = {
    activeStep: 0,
    steps: ['Project Details', 'Hazard Identification', 'PPE'],
    timeIn: '',
    ownerOnSite: false,
    location: {
      latitude: '',
      longitude: '',
    },
    mitigation: '',
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
      { label: 'Weather Conditions', name: 'weather-conditions', risk: 'N/A' },
      { label: 'Moving Equipment', name: 'moving-equipment', risk: 'N/A' },
    ],
    miscHazards: [
      { label: 'Natural Gas is on', checked: true },
      { label: 'Propane is on', checked: true },
      { label: 'Water is on', checked: true },
      { label: 'Structure is intact', checked: true },
      { label: 'Site is secure', checked: true },
    ],
  }

  getMiscHazards = () => {
    const { miscHazards } = this.state
    return miscHazards.map((miscHazard, index) => (
      <Grid item xs={6} sm={3}>
        <FormControlLabel
          control={<Switch color="primary" />}
          label={miscHazard.label}
          checked={miscHazard.checked}
          onChange={() => {
            const newMiscHazards = miscHazards
            newMiscHazards[index].checked = !newMiscHazards[index].checked
            this.setState({ miscHazards: newMiscHazards })
          }}
        />
      </Grid>
    ))
  }

  getHazards = () => {
    const { hazards } = this.state
    return hazards.map((hazard, index) => (
      <Grid item>
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">{hazard.label}</FormLabel>
          <RadioGroup
            row
            aria-label={hazard.name}
            name={hazard.name}
            value={hazard.risk}
            onChange={evt => {
              const newHazards = hazards
              newHazards[index].risk = evt.target.value
              this.setState({ hazards: newHazards })
            }}
          >
            <FormControlLabel
              value="N/A"
              control={<OrangeRadio />}
              label="N/A"
            />
            <FormControlLabel
              value="Minor"
              control={<OrangeRadio />}
              label="Minor"
            />
            <FormControlLabel
              value="Moderate"
              control={<OrangeRadio />}
              label="Moderate"
            />
            <FormControlLabel
              value="Severe"
              control={<OrangeRadio />}
              label="Severe"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
    ))
  }

  render() {
    const { classes } = this.props
    const { steps, activeStep, ownerOnSite, mitigation, location } = this.state
    return (
      <>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(section => (
            <Step>
              <StepLabel>{section}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <br />
        {steps[activeStep] === 'Project Details' && (
          <Paper className={classes.paper} square>
            <Grid container spacing={2} justify="space-between">
              <Grid item>
                <Autocomplete
                  id="combo-box-demo"
                  options={[
                    { title: 'Project 1' },
                    { title: 'Project 2' },
                    { title: 'Project 3' },
                  ]}
                  getOptionLabel={option => option.title}
                  style={{ width: 300 }}
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
                  defaultValue={moment().format('YYYY-MM-DD[T]HH:mm')}
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
                  onChange={() => {
                    this.setState({ ownerOnSite: !ownerOnSite })
                  }}
                />
              </Grid>
            </Grid>
            <Divider variant="middle" className={classes.divider} />
            <Grid container spacing={2}>
              <Grid item>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    navigator.geolocation.getCurrentPosition(position => {
                      this.setState({
                        location: {
                          latitude: position.coords.latitude,
                          longitude: position.coords.longitude,
                        },
                      })
                    })
                  }}
                >
                  Get Location
                </Button>
              </Grid>
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
          </Paper>
        )}
        {steps[activeStep] === 'Hazard Identification' && (
          <Paper className={classes.paper} square>
            <Grid container spacing={2}>
              {this.getMiscHazards()}
            </Grid>
            <Divider variant="middle" className={classes.divider} />
            <Grid container spacing={2} justify="space-between">
              {this.getHazards()}
            </Grid>

            <TextField
              label="Mitigation Steps"
              fullWidth
              helperText="How will you mitigate the risks above"
              variant="outlined"
              multiline
              rows={5}
              value={mitigation}
              onChange={evt => {
                this.setState({ mitigation: evt.target.value })
              }}
            />
          </Paper>
        )}
        {steps[activeStep] === 'PPE' && (
          <Paper className={classes.paper} square>
            <Grid container spacing={2} justify="space-between">
              Hard Hat Steel Toe Boots Vest Eye Protection Is specialized PPE
              required? Tool Lanyards Hearing Respiratory Hand Protection Gas
              Monitors Is It Safe To Proceed? Describe
            </Grid>
          </Paper>
        )}

        <Grid
          className={classes.stepperButtons}
          container
          justify="flex-end"
          spacing={1}
        >
          <Grid item>
            <Button
              onClick={() => {
                const newStep = activeStep - 1
                this.setState({ activeStep: newStep })
              }}
            >
              Back
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                const newStep = activeStep + 1
                this.setState({ activeStep: newStep })
              }}
            >
              {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </Grid>
        </Grid>
      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return { ...ownProps }
}

export default compose(
  connect(mapStateToProps),
  withFirebase,
  withStyles(useStyles)
)(JHA)

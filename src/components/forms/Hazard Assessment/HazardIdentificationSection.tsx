import React from 'react';
import PropTypes from 'prop-types';

import {
  TextField,
  Grid,
  Divider,
  FormControlLabel,
  Switch,
  FormControl,
  FormLabel,
  RadioGroup,
} from '@material-ui/core';

import OrangeRadio from '../../atoms/OrangeRadioButton';

const HazardIdentificationSection = props => {
  const {
    handleFormInputChange,
    ownerOnSite,
    hazards,
    miscHazards,
    mitigationSteps,
    disabled,
  } = props;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={3}>
          <FormControlLabel
            control={<Switch color="primary" />}
            label="Client/Owner on Site"
            checked={ownerOnSite}
            disabled={disabled}
            onChange={() => {
              handleFormInputChange('ownerOnSite', !ownerOnSite);
            }}
          />
        </Grid>
        {miscHazards &&
          miscHazards.map(
            (hazard: { label: string; checked: boolean }, index: number) => (
              <Grid item xs={6} sm={3} key={hazard.label}>
                <FormControlLabel
                  control={<Switch color="primary" />}
                  label={hazard.label}
                  checked={hazard.checked}
                  disabled={disabled}
                  onChange={() => {
                    const newHazards = miscHazards;
                    newHazards[index] = { ...hazard, checked: !hazard.checked };
                    handleFormInputChange('miscHazards', newHazards);
                  }}
                />
              </Grid>
            )
          )}
      </Grid>
      <Divider />
      <Grid container spacing={2} justify="space-between">
        {hazards &&
          hazards.map((hazard, index) => (
            <Grid item key={hazard.name}>
              <FormControl component="fieldset" margin="normal">
                <FormLabel component="legend">{hazard.label}</FormLabel>
                <RadioGroup
                  row
                  aria-label={hazard.name}
                  name={hazard.name}
                  value={hazard.risk}
                  onChange={evt => {
                    const newHazards = hazards;
                    newHazards[index] = { ...hazard, risk: evt.target.value };
                    handleFormInputChange('hazards', newHazards);
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
        id="mitigationSteps"
        fullWidth
        helperText="How will you mitigate the risks above"
        variant="outlined"
        multiline
        rows={5}
        value={mitigationSteps}
        onChange={evt => {
          handleFormInputChange('mitigationSteps', evt.target.value);
        }}
      />
    </>
  );
};

HazardIdentificationSection.defaultProps = {
  disabled: false,
};

HazardIdentificationSection.propTypes = {
  handleFormInputChange: PropTypes.func.isRequired,
  ownerOnSite: PropTypes.bool.isRequired,
  hazards: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, risk: PropTypes.string })
  ).isRequired,
  miscHazards: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, checked: PropTypes.bool })
  ).isRequired,
  mitigationSteps: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};
export default HazardIdentificationSection;

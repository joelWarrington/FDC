import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { TextField, Button, Grid, Divider } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { DateTimePicker } from '@material-ui/pickers';
import {
  LocationOn as LocationOnIcon,
  LocationOff as LocationOffIcon,
} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {},
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const ProjectDetailSection = props => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const projects = ['Project 1', 'Project 2', 'Project 3'];
  const stations = ['Station 1', 'Station 2'];

  const {
    handleFormInputChange,
    disabled,
    submissionDate,
    project,
    station,
    location,
  } = props;

  return (
    <>
      <Grid container spacing={2} justify="space-between">
        <Grid item xs={12}>
          <DateTimePicker
            label="Submission Date"
            inputVariant="outlined"
            autoOk
            disabled
            fullWidth
            value={submissionDate}
            onChange={evt => {
              handleFormInputChange('submissionDate', evt.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete
            options={projects}
            value={project}
            onChange={(evt, value) => {
              handleFormInputChange('project', value);
            }}
            disabled={disabled}
            renderInput={params => (
              <TextField {...params} label="Project" variant="outlined" />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete
            options={['station 1', 'station 2']}
            value={station}
            onChange={(evt, value) => {
              handleFormInputChange('station', value);
            }}
            disabled={disabled}
            getOptionLabel={option => option}
            renderInput={params => (
              <TextField {...params} label="Station" variant="outlined" />
            )}
          />
        </Grid>
      </Grid>
      <Divider variant="middle" className={classes.divider} />
      <Grid container spacing={2} justify="space-between">
        {!disabled && (
          <>
            <Grid item xs={12} md={6}>
              <Button
                variant="outlined"
                color="primary"
                disabled={disabled}
                fullWidth
                size="large"
                startIcon={<LocationOnIcon />}
                onClick={() => {
                  navigator.geolocation.getCurrentPosition(
                    currentRetrievedPosition => {
                      const {
                        latitude,
                        longitude,
                      } = currentRetrievedPosition.coords;
                      handleFormInputChange('location', {
                        latitude: latitude.toString(),
                        longitude: longitude.toString(),
                      });
                    }
                  );
                }}
              >
                Get Location
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              {(location?.latitude || location?.longitude) && (
                <Button
                  variant="outlined"
                  color="default"
                  disabled={disabled}
                  fullWidth
                  size="large"
                  startIcon={<LocationOffIcon />}
                  onClick={() => {
                    handleFormInputChange('location', {
                      latitude: '',
                      longitude: '',
                    });
                  }}
                >
                  Remove Location
                </Button>
              )}
            </Grid>
          </>
        )}
        <Grid item xs={6} md={6}>
          <TextField
            disabled
            fullWidth
            label="Longitude"
            variant="outlined"
            value={location?.longitude}
          />
        </Grid>
        <Grid item xs={6} md={6}>
          <TextField
            disabled
            fullWidth
            label="Latitude"
            variant="outlined"
            value={location?.latitude}
          />
        </Grid>
      </Grid>
    </>
  );
};

ProjectDetailSection.defaultProps = {
  disabled: false,
};

ProjectDetailSection.propTypes = {
  handleFormInputChange: PropTypes.func.isRequired,
  submissionDate: PropTypes.string.isRequired,
  project: PropTypes.string.isRequired,
  station: PropTypes.string.isRequired,
  location: PropTypes.shape({
    longitude: PropTypes.string,
    latitude: PropTypes.string,
  }).isRequired,
  disabled: PropTypes.bool,
};

export default ProjectDetailSection;

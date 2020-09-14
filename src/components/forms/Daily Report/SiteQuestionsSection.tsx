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

// Site Activities
// Type
// Description

const SiteQuestionsSection = props => {
  const { handleFormInputChange, disabled } = props;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={3}></Grid>
      </Grid>
    </>
  );
};

SiteQuestionsSection.defaultProps = {
  disabled: false,
};

SiteQuestionsSection.propTypes = {
  handleFormInputChange: PropTypes.func.isRequired,
  siteAcitivities: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      description: PropTypes.string,
    })
  ).isRequired,
  weather: PropTypes.arrayOf(PropTypes.string).isRequired,
  temperature: PropTypes.number.isRequired,
  contractorDelayed: PropTypes.bool.isRequired,
  milestoneAffected: PropTypes.bool.isRequired,
  changeOrderActive: PropTypes.bool.isRequired,
  reworkRequired: PropTypes.bool.isRequired,
  redlinesUpdated: PropTypes.bool.isRequired,
  constructionRecordsUpdated: PropTypes.bool.isRequired,
  protestors: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
};
export default SiteQuestionsSection;

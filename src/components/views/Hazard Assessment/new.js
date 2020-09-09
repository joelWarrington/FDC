import React from 'react';
import { Container, Button } from '@material-ui/core';
import { KeyboardBackspace as BackIcon } from '@material-ui/icons';
import { makeStyles, useTheme } from '@material-ui/styles';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withFirebase } from '../../containers/FirebaseContext';
import HazardAssessmentForm from '../../containers/HazardAssessmentForm';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
}));

const HazardAssessmentNewForm = props => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Container maxWidth="md" className={classes.root}>
      <Button
        variant="contained"
        color="default"
        startIcon={<BackIcon />}
        onClick={() => {
          if (window) {
            window.history.back();
          }
        }}
      >
        Go Back
      </Button>
      <HazardAssessmentForm stepped />
    </Container>
  );
};

const mapStateToProps = (_state, ownProps) => ({ ...ownProps });

export default compose(
  connect(mapStateToProps),
  withFirebase
)(HazardAssessmentNewForm);

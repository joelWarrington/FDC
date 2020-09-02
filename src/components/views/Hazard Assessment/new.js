import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withFirebase } from '../../containers/FirebaseContext';
import HazardAssessmentForm from './form';

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

const HazardAssessmentNewForm = props => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Container maxWidth="md" className={classes.root}>
      <HazardAssessmentForm editable stepped />
    </Container>
  );
};

const mapStateToProps = (_state, ownProps) => ({ ...ownProps });

export default compose(
  connect(mapStateToProps),
  withFirebase
)(HazardAssessmentNewForm);

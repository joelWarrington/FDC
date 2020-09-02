import React, { useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import {
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  Fab,
} from '@material-ui/core';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, useTheme } from '@material-ui/styles';
import moment from 'moment';
import { withFirebase } from '../../containers/FirebaseContext';
import { selectHazardAssessment } from '../../../state/app';
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
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const HazardAssessmentList = props => {
  const { firebase, selectAHazardAssessment, state } = props;
  const theme = useTheme();
  const classes = useStyles(theme);
  const [hazardAssessments, updateHazardAssessments] = useState({});
  const [indexedAssessments, setIndexedAssessments] = useState([]);

  useEffect(() => {
    const hazardAssessmentListRef = firebase.database().ref('JHA');
    hazardAssessmentListRef.on('value', snapshot => {
      const hazardAssessmentsObj = snapshot.val();
      updateHazardAssessments(hazardAssessmentsObj);
      setIndexedAssessments(
        Object.keys(hazardAssessmentsObj).sort((a, b) => {
          const timeInA = hazardAssessmentsObj[a].timeIn;
          const timeInB = hazardAssessmentsObj[b].timeIn;
          if (timeInA > timeInB) {
            return -1;
          }
          if (timeInA < timeInB) {
            return 1;
          }
          return 0;
        })
      );
    });
  }, []);
  return (
    <Container maxWidth="md" className={classes.root}>
      <Paper>
        <List dense>
          {indexedAssessments.map(key => (
            <ListItem
              button
              key={key}
              onClick={() => {
                selectAHazardAssessment(key);
              }}
            >
              <ListItemText
                primary={hazardAssessments[key]?.project}
                secondary={moment(hazardAssessments[key]?.timeIn).fromNow()}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
      <HazardAssessmentForm id={state.selectedHA} />
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={() => {
          navigate('/forms/ha/new');
        }}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
};

const mapStateToProps = (_state, ownProps) => ({
  ...ownProps,
  state: _state.app,
});

const mapDispatchToProps = dispatch => ({
  selectAHazardAssessment: payload => dispatch(selectHazardAssessment(payload)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFirebase
)(HazardAssessmentList);

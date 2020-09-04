import React, { useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import {
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  Fab,
  Button,
  Grid,
  Typography,
} from '@material-ui/core';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import {
  Add as AddIcon,
  KeyboardBackspace as BackIcon,
  Edit as EditIcon,
} from '@material-ui/icons';
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
    position: 'fixed',
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
  const [editable, updateEditable] = useState(false);

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
      {!state.selectedHA ? (
        <>
          <Paper>
            {indexedAssessments.length > 1 ? (
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
                      secondary={moment(
                        hazardAssessments[key]?.timeIn
                      ).fromNow()}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body1" component="p">
                There aren&apos;t any Hazard Assessment Forms
              </Typography>
            )}
          </Paper>
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
        </>
      ) : (
        <Grid container justify="flex-start" spacing={1}>
          <Grid item>
            <Button
              variant="contained"
              color="default"
              startIcon={<BackIcon />}
              onClick={() => {
                selectAHazardAssessment(null);
                updateEditable(false);
              }}
            >
              Go Back
            </Button>
          </Grid>

          {!editable && (
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={() => {
                  updateEditable(true);
                }}
              >
                Edit
              </Button>
            </Grid>
          )}
          <HazardAssessmentForm id={state.selectedHA} editable={editable} />
        </Grid>
      )}
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

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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Avatar,
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
import HazardAssessmentForm from '../../forms/Hazard Assessment';

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
  tableRow: {
    cursor: 'pointer',
  },
}));

const HazardAssessmentList = props => {
  const { firebase, selectAHazardAssessment, state } = props;
  const theme = useTheme();
  const classes = useStyles(theme);
  const [hazardAssessments, updateHazardAssessments] = useState({});
  const [indexedAssessments, setIndexedAssessments] = useState([]);
  const [disabled, updateDisabled] = useState(true);
  const [users, updateUsers] = useState({});

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
    firebase
      .database()
      .ref(`users/`)
      .once('value', snapshot => {
        updateUsers(snapshot.val());
      });
  }, []);
  return (
    <Container maxWidth="md" className={classes.root}>
      {!state.selectedHA ? (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Project</TableCell>
                  <TableCell>Station</TableCell>
                  <TableCell>Submitted By</TableCell>
                  <TableCell>Submission Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {indexedAssessments.map(key => {
                  const {
                    project,
                    station,
                    user,
                    submissionDate,
                  } = hazardAssessments[key];
                  return (
                    <TableRow
                      key={key}
                      hover
                      className={classes.tableRow}
                      onClick={() => {
                        selectAHazardAssessment(key);
                      }}
                    >
                      <TableCell>{project}</TableCell>
                      <TableCell>{station}</TableCell>
                      <TableCell>
                        <Grid
                          container
                          spacing={2}
                          direction="row"
                          alignItems="center"
                        >
                          {user in users && (
                            <>
                              <Grid item>
                                <Avatar src={users[user].photoURL} />
                              </Grid>
                              <Grid item>{users[user].displayName}</Grid>
                            </>
                          )}
                        </Grid>
                      </TableCell>
                      <TableCell>{moment(submissionDate).fromNow()}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
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
                updateDisabled(true);
              }}
            >
              Go Back
            </Button>
          </Grid>

          {disabled && (
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={() => {
                  updateDisabled(false);
                }}
              >
                Edit
              </Button>
            </Grid>
          )}
          <HazardAssessmentForm id={state.selectedHA} disabled={disabled} />
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

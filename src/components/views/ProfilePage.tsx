import React from 'react';
import { Container, Typography, Button, Paper, Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { navigate } from '@reach/router';
import Avatar, { Piece } from 'avataaars';
import { withFirebase } from '../containers/FirebaseContext';

const useStyles = makeStyles(theme => {
  return {
    root: {},
    avatar: {
      verticalAlign: 'middle',
      margin: theme.spacing(2),
      width: 200,
      height: 200,
      borderRadius: '50%',
    },
    paper: {
      padding: theme.spacing(2),
    },
  };
});

const ProfilePage = props => {
  const { firebase } = props;
  const theme = useTheme();
  const classes = useStyles(theme);
  const { displayName, email, photoURL } = firebase.auth().currentUser;
  return (
    <Container maxWidth="md" className={classes.root}>
      <br />
      <Grid container direction="column" alignItems="center">
        <Paper className={classes.paper}>
          <Grid container direction="column" alignItems="center">
            <img src={photoURL} className={classes.avatar} />
            <Typography variant="h6">{displayName}</Typography>
          </Grid>
        </Paper>
      </Grid>
    </Container>
  );
};

export default withFirebase(ProfilePage);

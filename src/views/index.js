import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import {
  Typography,
  Grid,
  Container,
  Button,
  Paper,
  Card,
  CardContent,
  CardActions,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Footer from '../components/Footer';

import DataIllustration from '../images/data-illustration.svg';
import FormIllustration from '../images/form-illustration.svg';
import MobileIllustration from '../images/mobile-illustration.svg';
import HeroIllustration from '../images/index-hero.svg';
import { withFirebase } from '../components/FirebaseContext';

const useStyles = makeStyles(theme => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      '& svg': {
        width: '100%',
        height: 'auto',
      },
    },
    paper: {
      padding: theme.spacing(2),
    },
    hero: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
    header: {
      fontWeight: 'bolder',
    },
    subheader: {
      color: theme.palette.primary.main,
      fontWeight: 'bold',
    },
    constrast: {
      color: theme.palette.primary.main,
    },
    grid_item: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
    card_grid: {
      marginTop: theme.spacing(12),
      marginBottom: theme.spacing(12),
    },
  };
});

const Index = props => {
  const { firebase } = props;
  const theme = useTheme();
  const classes = useStyles(theme);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        setAuthenticated(false);
      } else {
        setAuthenticated(true);
      }
    });
  });

  return (
    <div className={classes.root}>
      <Container maxWidth="md" className={classes.hero}>
        <Grid container justify="center" spacing={4} alignItems="center">
          <Grid item xs={6} className={classes.grid_item}>
            <HeroIllustration />
          </Grid>
          <Grid item xs={6} className={classes.grid_item}>
            <Typography variant="h4" className={classes.header} gutterBottom>
              Capture the <span className={classes.constrast}>data</span> that
              matters to <span className={classes.constrast}>you</span>.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                if (authenticated) {
                  navigate('/dashboard');
                } else {
                  navigate('/signin');
                }
              }}
            >
              Get Started
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="md">
        <Grid container justify="center" spacing={4} alignItems="center">
          <Grid item xs={6} className={classes.grid_item}>
            <FormIllustration />
          </Grid>
          <Grid item xs={6} className={classes.grid_item}>
            <Typography variant="h5" gutterBottom className={classes.subheader}>
              Forget paper forms
            </Typography>
            <Typography variant="body1" gutterBottom>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Typography>
          </Grid>
          <Grid item xs={6} className={classes.grid_item}>
            <Typography variant="h5" gutterBottom className={classes.subheader}>
              View real-time reporting
            </Typography>
            <Typography variant="body1" gutterBottom>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Typography>
          </Grid>
          <Grid item xs={6} className={classes.grid_item}>
            <DataIllustration />
          </Grid>
          <Grid item xs={6} className={classes.grid_item}>
            <MobileIllustration />
          </Grid>
          <Grid item xs={6} className={classes.grid_item}>
            <Typography variant="h5" gutterBottom className={classes.subheader}>
              Mobile friendly
            </Typography>
            <Typography variant="body1" gutterBottom>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="md">
        <Grid
          container
          justify="center"
          spacing={2}
          alignItems="stretch"
          className={classes.card_grid}
        >
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Request For Information
                </Typography>
                <Typography variant="body2" component="p">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Hazard Assessment
                </Typography>
                <Typography variant="body2" component="p">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Daily Report
                </Typography>
                <Typography variant="body2" component="p">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default withFirebase(Index);

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
import Footer from '../containers/Footer';

import DataIllustration from '../../images/data-illustration.svg';
import FormIllustration from '../../images/form-illustration.svg';
import MobileIllustration from '../../images/mobile-illustration.svg';
import HeroIllustration from '../../images/index-hero.svg';
import { withFirebase } from '../containers/FirebaseContext';

const useStyles = makeStyles(theme => ({
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
  card_item: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  card_content: {
    flexGrow: '1',
  },
}));

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
              Digital data collection is the future and will connect your
              workforce. Now your entire team can capture accurate data from any
              device.
            </Typography>
          </Grid>
          <Grid item xs={6} className={classes.grid_item}>
            <Typography variant="h5" gutterBottom className={classes.subheader}>
              View real-time reporting
            </Typography>
            <Typography variant="body1" gutterBottom>
              Form submissions and data can be seen in real time to provide you
              the most insight.
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
              Forms & Features have been purposefuly built for a mobile
              experience.
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="md">
        <Grid
          container
          direction="row"
          justify="center"
          spacing={2}
          alignItems="stretch"
          className={classes.card_grid}
        >
          <Grid item xs>
            <Card className={classes.card_item}>
              <CardContent className={classes.card_content}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Request For Information
                </Typography>
                <Typography variant="body2" component="p">
                  Used when a project&apos;s construction documentation lacks
                  information that is required to proceed with any given scope
                  of work.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => {
                    navigate('/forms/rfi');
                  }}
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs>
            <Card className={classes.card_item}>
              <CardContent className={classes.card_content}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Hazard Assessment
                </Typography>
                <Typography variant="body2" component="p">
                  Process identify, assess, and control workplace hazards and
                  the risks to worker health and safety. The assessment is an
                  essential part of an organization’s safety culture and safety
                  management system.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => {
                    navigate('/forms/ha');
                  }}
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs>
            <Card className={classes.card_item}>
              <CardContent className={classes.card_content}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Daily Report
                </Typography>
                <Typography variant="body2" component="p">
                  Construction daily reports document all on-site work done for
                  a construction project in a given day. Daily reports provide
                  transparency, reduce communication issues and safety risks,
                  and protect you during lawsuits.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => {
                    navigate('/forms/dr');
                  }}
                >
                  Learn More
                </Button>
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

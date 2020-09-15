import React from 'react';
import { Container, Button, Typography, Grid } from '@material-ui/core/styles';
import { KeyboardBackspace as BackIcon } from '@material-ui/icons';
import { makeStyles, useTheme } from '@material-ui/styles';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withFirebase } from '../../containers/FirebaseContext';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  center: {
    textAlign: 'center',
  },
  header: {
    fontWeight: 'bold',
  },
}));

const DailyReportList = props => {
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
      <Grid
        container
        direction="column"
        alignContent="center"
        className={classes.center}
      >
        <Grid item>
          <Typography variant="h4" component="h2" className={classes.header}>
            Coming soon!
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" component="p">
            Check back later for when this form is live!
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (_state, ownProps) => ({ ...ownProps });

export default compose(connect(mapStateToProps), withFirebase)(DailyReportList);

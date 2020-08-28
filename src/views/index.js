import React, { useEffect } from 'react';
import { Link } from 'gatsby';

import { Typography, Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import DataIllustration from '../images/data-illustration.svg';
import FormIllustration from '../images/form-illustration.svg';
import MobileIllustration from '../images/mobile-illustration.svg';

const useStyles = makeStyles(theme => {
  return {
    root: {
      '& svg': {
        width: '100%',
        height: 'auto',
      },
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
      margin: '25px 0',
    },
  };
});

const Index = props => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <>
      <div>
        <Typography variant="h4" className={classes.header}>
          Capture the <span className={classes.constrast}>data</span> that
          matters to <span className={classes.constrast}>you</span>.
        </Typography>
      </div>
      <Grid
        container
        justify="center"
        spacing={4}
        alignItems="center"
        className={classes.root}
      >
        <Grid item xs={6} className={classes.grid_item}>
          <FormIllustration />
        </Grid>
        <Grid item xs={6} className={classes.grid_item}>
          <Typography variant="h5" gutterBottom className={classes.subheader}>
            Forget paper forms
          </Typography>
          <Typography variant="body1" gutterBottom>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Typography>
        </Grid>
        <Grid item xs={6} className={classes.grid_item}>
          <Typography variant="h5" gutterBottom className={classes.subheader}>
            View real-time reporting
          </Typography>
          <Typography variant="body1" gutterBottom>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
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
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Index;

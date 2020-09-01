import React, { useState } from 'react';
import { Container, Paper, Typography, Button } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import NotFoundIllustration from '../images/not-found.svg';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import { navigate } from '@reach/router';

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
    container: {
      flexGrow: 1,
      marginTop: theme.spacing(12),
      marginBottom: theme.spacing(12),
    },
    hero: {
      textAlign: 'center',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      '& h1': {
        fontWeight: 'bolder',
      },
    },
  };
});

const NotFoundPage = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <div className={classes.root}>
      <Container maxWidth="md" className={classes.container}>
        <NotFoundIllustration />
        <div className={classes.hero}>
          <Typography variant="h1" component="h1">
            404
          </Typography>
          <Typography variant="h6" component="p" gutterBottom>
            Error: Not Found
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate('/');
            }}
          >
            Home
          </Button>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default NotFoundPage;

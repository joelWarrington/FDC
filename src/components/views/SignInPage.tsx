/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import { compose } from 'recompose';
import { orange } from '@material-ui/core/colors';
import LogoIcon from '../../images/logo.svg';

import { getUiConfig } from '../../firebase';
import { withFirebase } from '../containers/FirebaseContext';

const useStyles = theme => {
  return {
    root: {},
    header: {
      fontWeight: 'bold',
    },
    icon: {
      padding: 12,
      width: 64,
      margin: 'auto',
      backgroundColor: orange[400],
      borderRadius: '50%',
      '&> svg': {
        width: 64,
        height: 64,
      },
    },
    paper: {
      backgroundColor: 'rgba(255,255,255,0.8)',
      margin: 'auto',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: 600,
      padding: '28px 14px',
      textAlign: 'center',
    },
    bg_image: {
      height: '100vh',
      '& img': {
        objectFit: 'cover',
      },
    },
  };
};

class SignIn extends Component {
  render() {
    const { classes, firebase } = this.props;
    return (
      <div className={classes.root}>
        <StaticQuery
          query={graphql`
            query {
              signInBG: file(relativePath: { eq: "signup-bg.jpg" }) {
                childImageSharp {
                  fluid(maxWidth: 5000) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          `}
          render={data => (
            <>
              <Img
                className={classes.bg_image}
                fluid={data.signInBG.childImageSharp.fluid}
              />
              <Paper className={classes.paper}>
                <div className={classes.icon}>
                  <LogoIcon />
                </div>
                <Typography
                  variant="h6"
                  component="h2"
                  gutterBottom
                  className={classes.header}
                >
                  Field Data Capture
                </Typography>
                <StyledFirebaseAuth
                  uiConfig={getUiConfig(firebase)}
                  firebaseAuth={firebase.auth()}
                />
              </Paper>
            </>
          )}
        />
      </div>
    );
  }
}

export default compose(withFirebase, withStyles(useStyles))(SignIn);

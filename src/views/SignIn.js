/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import '../components/styles.css';
import { withStyles } from '@material-ui/styles';
import { Paper, Typography } from '@material-ui/core';
import { compose } from 'recompose';
import { orange } from '@material-ui/core/colors';

import { getUiConfig } from '../firebase';
import { withFirebase } from '../components/FirebaseContext';

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
    },
    paper: {
      position: 'absolute',
      backgroundColor: 'rgba(255,255,255,0.8)',
      margin: 'auto',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: 600,
      padding: 14,
      textAlign: 'center',
    },
    bg_image: {
      height: '100vh',
      img: {
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
              icon: file(relativePath: { eq: "worker.png" }) {
                childImageSharp {
                  fluid(maxWidth: 64) {
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
                  <Img fluid={data.icon.childImageSharp.fluid} />
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

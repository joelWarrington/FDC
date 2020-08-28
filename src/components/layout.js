import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import { orange, deepPurple } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import AppBar from '../containers/AppBar';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: orange,
    secondary: deepPurple,
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        color: '#FFF',
      },
    },
  },
});

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Helmet title={data.site.siteMetadata.title} meta={[]}>
            <html lang="en" />
          </Helmet>
          <AppBar />
          {children}
        </ThemeProvider>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

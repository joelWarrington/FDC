const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'Field Data Capture',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`),
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /images/,
        },
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Field Data Capture',
        short_name: 'FDC',
        start_url: '/',
        background_color: '#ffb200',
        theme_color: '#663399',
        display: 'standalone',
        icon: 'src/images/logo.png',
      },
    },
    'gatsby-plugin-layout',
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        precachePages: [`/forms/*`, `/dashboard/`, `/signin/`],
      },
    },
  ],
};

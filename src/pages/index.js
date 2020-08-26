import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SignOut from '../containers/SignOut';
import JHA from '../views/JHA';

const IndexPage = () => (
  <Layout>
    <br />
    <JHA />
    {/* <SignOut /> */}
  </Layout>
);

export default IndexPage;

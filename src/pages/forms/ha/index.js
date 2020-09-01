import React from 'react';
import Layout from '../../../components/containers/Layout';
import HazardAssessmentList from '../../../components/views/hazardAssessmentList';
import HazardAssessmentForm from '../../../components/views/hazardAssessmentForm';

const DailyReportPage = () => (
  <Layout>
    <HazardAssessmentList />
    <HazardAssessmentForm />
  </Layout>
);

export default DailyReportPage;

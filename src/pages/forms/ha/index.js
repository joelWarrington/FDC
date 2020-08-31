import React from 'react';
import Layout from '../../../components/Layout';
import HazardAssessmentList from '../../../views/hazardAssessmentList';
import HazardAssessmentForm from '../../../views/hazardAssessmentForm';

const DailyReportPage = () => (
  <Layout>
    <HazardAssessmentList />
    <HazardAssessmentForm />
  </Layout>
);

export default DailyReportPage;

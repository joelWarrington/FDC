import React from 'react';
import Layout from '../../../components/containers/Layout';
import HazardAssessmentList from '../../../components/views/Hazard Assessment/list';
import HazardAssessmentEdit from '../../../components/views/Hazard Assessment/edit';

const DailyReportPage = () => (
  <Layout>
    <HazardAssessmentList />
    <HazardAssessmentEdit />
  </Layout>
);

export default DailyReportPage;

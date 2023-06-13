import { MetaTags } from '@redwoodjs/web';

import InterviewStats from 'src/components/InterviewStats/InterviewStats';

const DashboardHomePage = () => {
  return (
    <>
      <MetaTags title="DashboardHome" description="DashboardHome page" />
      <InterviewStats />
    </>
  );
};

export default DashboardHomePage;

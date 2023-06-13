import { FC } from 'react';

import { MetaTags } from '@redwoodjs/web';

import SchedulerDashboardCandidatesCell from 'src/components/Scheduler/Dashboard/Candidates/SchedulerDashboardCandidatesCell';
import SchedulerDashboardInterviewEventsCell from 'src/components/Scheduler/Dashboard/InterviewEvents/DashboardInterviewEventsCell';
import SchedulerDashboardRequisitionsCell from 'src/components/Scheduler/Dashboard/Requisitions/DashboardRequisitionsCell';

const SchedulerHomePage: FC = () => {
  return (
    <>
      <MetaTags
        title="Interview Scheduler"
        description="Interview Scheduler page"
      />
      <div className="mx-4 flex flex-col gap-4">
        <SchedulerDashboardCandidatesCell />
        <SchedulerDashboardRequisitionsCell />
        <SchedulerDashboardInterviewEventsCell />
      </div>
    </>
  );
};

export default SchedulerHomePage;

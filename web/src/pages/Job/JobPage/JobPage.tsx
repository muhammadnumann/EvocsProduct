import { FC } from 'react';

import JobCell from 'src/components/Job/JobCell';

type JobPageProps = {
  id: number;
};

const JobPage: FC<JobPageProps> = ({ id }) => {
  return <JobCell id={id} />;
};

export default JobPage;

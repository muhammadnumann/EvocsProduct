import { FC, SVGProps } from 'react';

import { CalendarProvider } from 'types/graphql';

import { assertUnreachable } from 'src/utils/types';

import AzureADLogoIcon from '../AzureADLogoIcon/AzureADLogoIcon';
import GoogleGLogoIcon from '../GoogleGLogoIcon/GoogleGLogoIcon';

type Props = {
  provider: CalendarProvider;
};
const InterviewSchedulerProviderLogoIcon: FC<
  Props & SVGProps<SVGSVGElement>
> = ({ provider, ...props }) => {
  switch (provider) {
    case 'GOOGLE':
      return <GoogleGLogoIcon {...props} />;
    case 'OFFICE365':
      return <AzureADLogoIcon {...props} />;
    default:
      assertUnreachable(provider);
  }
};

export default InterviewSchedulerProviderLogoIcon;

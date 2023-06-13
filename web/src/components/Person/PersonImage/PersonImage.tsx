import { FC, useEffect, useState } from 'react';

import { UserCircleIcon } from '@heroicons/react/24/outline';

import { retrieveMSGraphProfileImages } from 'src/components/InterviewAttendees/retrieveMSGraphProfileImages';
import { useProductRunnerClient } from 'src/components/ProductRunnerContext/ProductRunnerContext';
import { FormAttendee } from 'src/utils/interviewscheduler/types';

const DefaultAttendeeImage: FC<{ attendee: FormAttendee }> = ({ attendee }) => {
  return attendee.avatarURL ? (
    <img
      src={attendee.avatarURL}
      alt=""
      className="xs:h-8 xs:w-8 flex-none rounded-full object-contain xl:h-10 xl:w-10"
    />
  ) : (
    <UserCircleIcon className="xs:h-8 xs:w-8 flex-none rounded-full object-contain xl:h-10 xl:w-10" />
  );
};

const MSGraphAttendeeImage: FC<{ attendee: FormAttendee }> = ({ attendee }) => {
  const client = useProductRunnerClient();
  const [avatarURL, setAvatarURL] = useState(attendee.avatarURL);
  const [fetchDisabled, setFetchDisabled] = useState(false);
  const shouldFetch = !avatarURL && !fetchDisabled;

  useEffect(() => {
    setAvatarURL(attendee.avatarURL);
    setFetchDisabled(false);
  }, [attendee]);

  useEffect(() => {
    const fetchMSGraphProfileImages = async () => {
      const { attendeeImages, failedIDs } = await retrieveMSGraphProfileImages(
        client,
        [attendee],
        new Set()
      );
      if (!attendeeImages && !failedIDs) {
        return;
      }
      if (failedIDs.size) {
        setFetchDisabled(true);
        return;
      }

      setAvatarURL(attendeeImages[attendee.attendeeURI]);
    };

    if (shouldFetch) {
      fetchMSGraphProfileImages();
    }
  }, [shouldFetch, client, attendee]);

  return <DefaultAttendeeImage attendee={{ ...attendee, avatarURL }} />;
};

export const AttendeeImage: FC<{ attendee: FormAttendee }> = ({ attendee }) => {
  const { calendarProvider } = attendee;

  if (calendarProvider === 'OFFICE365') {
    return <MSGraphAttendeeImage attendee={attendee} />;
  }

  return <DefaultAttendeeImage attendee={attendee} />;
};

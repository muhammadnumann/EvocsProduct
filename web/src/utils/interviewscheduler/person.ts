import { Person as GooglePerson } from '@buf/bufbuild_connect-web_evocs_commonschema/external/googleapidefs/people/v1/people_pb';
import { SearchPeopleResponse } from '@buf/bufbuild_connect-web_evocs_commonschema/products/v1/interviewscheduler_pb';
import { UpdateInterviewSchedulerEventInput } from 'types/graphql';

import { ArrayElement } from '../types';

import { FormAttendee } from './types';

export const personDisplayName = (p: GooglePerson): string => {
  if (!p) {
    return '';
  }
  if (!p.names?.length) {
    if (p.emailAddresses?.length) {
      return p.emailAddresses[0].value;
    }
  }

  return p.names?.length ? p.names[0].displayName ?? '--' : '--';
};

export const personEmailAddress = (p: GooglePerson): string => {
  const email = p.emailAddresses?.find(({ value }) => !!value);

  return email?.value;
};

export const personPhotoURL = (p: GooglePerson): string => {
  const photo = p.photos?.find(({ url }) => !!url);

  return photo?.url;
};

export const normalizeAPIPeopleSearch = (
  resp: SearchPeopleResponse
): FormAttendee[] => {
  switch (resp.peopleResponse.case) {
    case 'googlePeople':
      return resp.peopleResponse.value.people.map((p) => ({
        attendeeURI: p.resourceName,
        name: personDisplayName(p),
        email: personEmailAddress(p),
        inviteStatus: 'PENDING',
        avatarURL: personPhotoURL(p),
        calendarProvider: 'GOOGLE',
      }));
    case 'msgraphPeople':
      return resp.peopleResponse.value.people.map((p) => ({
        attendeeURI: p.id,
        name: p.displayName,
        email: p.scoredEmailAddresses[0].address,
        inviteStatus: 'PENDING',
        avatarURL: null,
        calendarProvider: 'OFFICE365',
      }));
  }
};

export const sanitizeAttendeeForEventSubmit = <A extends FormAttendee>({
  attendeeURI,
  name,
  email,
  inviteStatus,
  avatarURL,
}: A): ArrayElement<UpdateInterviewSchedulerEventInput['attendees']> => ({
  attendeeURI,
  name,
  inviteStatus,
  email,
  avatarURL: avatarURL?.startsWith('http') ? avatarURL : null,
});

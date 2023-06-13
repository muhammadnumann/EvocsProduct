import { APIService } from '@buf/bufbuild_connect-web_evocs_commonschema/api/v1/defs_connectweb';
import { GetMSGraphProfilePictureResponse } from '@buf/bufbuild_connect-web_evocs_commonschema/products/v1/interviewscheduler_pb';
import { PromiseClient } from '@bufbuild/connect-web';

import { FormAttendee } from 'src/utils/interviewscheduler/types';

const sessionStoreImages = (attendees: FormAttendee[], images: Blob[]) => {
  for (const [i, { attendeeURI }] of attendees.entries()) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      sessionStorage.setItem(attendeeURI, reader.result as string);
    });
    reader.readAsDataURL(images[i]);
  }
};

const getSessionCachedImages = (attendees: FormAttendee[]): FormAttendee[] =>
  attendees.map((a) => ({
    ...a,
    avatarURL: sessionStorage.getItem(a.attendeeURI),
  }));

type MSGraphProfileImageResp = {
  attendeeImages: Record<string, string>;
  failedIDs: Set<string>;
};

export const retrieveMSGraphProfileImages = async (
  client: PromiseClient<typeof APIService>,
  attendees: FormAttendee[],
  doNotFetch: Set<string>
): Promise<MSGraphProfileImageResp> => {
  const toRetrieve = attendees.filter(
    (a) =>
      a.calendarProvider === 'OFFICE365' &&
      a.avatarURL == null &&
      !doNotFetch.has(a.attendeeURI)
  );
  if (!toRetrieve || !toRetrieve.length) {
    return {
      attendeeImages: null,
      failedIDs: null,
    };
  }

  const cached = getSessionCachedImages(toRetrieve);
  const cachedImages = cached
    .filter(({ avatarURL }) => avatarURL)
    .reduce(
      (acc, { attendeeURI, avatarURL }) => ({
        [attendeeURI]: avatarURL,
      }),
      {} as Record<string, string>
    );
  const msAttendees = cached.filter(({ avatarURL }) => !avatarURL);

  const imageResults = await Promise.allSettled(
    msAttendees.map(({ attendeeURI }) =>
      client.getMSGraphProfilePicture({
        msGraphId: attendeeURI,
        dimensions: { x: 48, y: 48 },
      })
    )
  );
  const failedIDs: Set<string> = imageResults.reduce(
    (acc, { status }, i) =>
      status === 'rejected'
        ? new Set<string>([...acc, msAttendees[i].attendeeURI])
        : acc,
    new Set<string>()
  );

  const images = imageResults
    .filter(
      (
        resp
      ): resp is PromiseFulfilledResult<GetMSGraphProfilePictureResponse> =>
        resp.status === 'fulfilled'
    )
    .map(({ value }) => value);

  const blobs = images.map(({ image }) => new Blob([image]));
  sessionStoreImages(
    msAttendees.filter(({ attendeeURI }) => !failedIDs.has(attendeeURI)),
    blobs
  );

  const fetchedImages = msAttendees
    .filter(({ attendeeURI }) => !failedIDs.has(attendeeURI))
    .reduce(
      (acc, { attendeeURI }, i) => ({
        ...acc,
        [attendeeURI]: URL.createObjectURL(blobs[i]),
      }),
      {} as Record<string, string>
    );
  const attendeeImages = { ...fetchedImages, ...cachedImages };

  return {
    attendeeImages,
    failedIDs,
  };
};

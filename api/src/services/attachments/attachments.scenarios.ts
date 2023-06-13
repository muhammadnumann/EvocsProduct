import type { Prisma, Attachment } from '@prisma/client';

import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.AttachmentCreateArgs>({
  attachment: {
    one: {
      data: {
        title: 'String',
        url: 'String1378815',
        updatedAt: '2023-03-31T00:19:55.784Z',
      },
    },
    two: {
      data: {
        title: 'String',
        url: 'String5787131',
        updatedAt: '2023-03-31T00:19:55.784Z',
      },
    },
  },
});

export type StandardScenario = ScenarioData<Attachment, 'attachment'>;

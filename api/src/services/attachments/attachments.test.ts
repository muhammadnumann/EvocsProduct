import type { Attachment } from '@prisma/client';

import {
  attachments,
  attachment,
  createAttachment,
  updateAttachment,
  deleteAttachment,
} from './attachments';
import type { StandardScenario } from './attachments.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('attachments', () => {
  scenario('returns all attachments', async (scenario: StandardScenario) => {
    const result = await attachments();

    expect(result.length).toEqual(Object.keys(scenario.attachment).length);
  });

  scenario(
    'returns a single attachment',
    async (scenario: StandardScenario) => {
      const result = await attachment({ id: scenario.attachment.one.id });

      expect(result).toEqual(scenario.attachment.one);
    }
  );

  scenario('creates a attachment', async () => {
    const result = await createAttachment({
      input: {
        title: 'String',
        url: 'String5444624',
        updatedAt: '2023-03-31T00:19:55.768Z',
      },
    });

    expect(result.title).toEqual('String');
    expect(result.url).toEqual('String5444624');
    expect(result.updatedAt).toEqual(new Date('2023-03-31T00:19:55.768Z'));
  });

  scenario('updates a attachment', async (scenario: StandardScenario) => {
    const original = (await attachment({
      id: scenario.attachment.one.id,
    })) as Attachment;
    const result = await updateAttachment({
      id: original.id,
      input: { title: 'String2' },
    });

    expect(result.title).toEqual('String2');
  });

  scenario('deletes a attachment', async (scenario: StandardScenario) => {
    const original = (await deleteAttachment({
      id: scenario.attachment.one.id,
    })) as Attachment;
    const result = await attachment({ id: original.id });

    expect(result).toEqual(null);
  });
});

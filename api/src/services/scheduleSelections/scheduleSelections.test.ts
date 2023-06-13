import type { ScheduleSelection } from '@prisma/client';

import { scheduleSelections } from './scheduleSelections';
import type { StandardScenario } from './scheduleSelections.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('scheduleSelections', () => {
  scenario(
    'returns all scheduleSelections',
    async (scenario: StandardScenario) => {
      const result = await scheduleSelections();

      expect(result.length).toEqual(
        Object.keys(scenario.scheduleSelection).length
      );
    }
  );
});

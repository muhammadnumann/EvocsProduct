import type { Prisma, ScheduleSelection } from '@prisma/client';

import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.ScheduleSelectionCreateArgs>({
  scheduleSelection: {
    one: {
      data: {
        startTime: '2023-02-11T17:53:37.387Z',
        endTime: '2023-02-11T17:53:37.387Z',
        updatedAt: '2023-02-11T17:53:37.387Z',
      },
    },
    two: {
      data: {
        startTime: '2023-02-11T17:53:37.387Z',
        endTime: '2023-02-11T17:53:37.387Z',
        updatedAt: '2023-02-11T17:53:37.387Z',
      },
    },
  },
});

export type StandardScenario = ScenarioData<
  ScheduleSelection,
  'scheduleSelection'
>;

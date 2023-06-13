import type { Prisma, Requisition } from '@prisma/client';

import type { ScenarioData } from '@redwoodjs/testing/api';

export const standard = defineScenario<Prisma.RequisitionCreateArgs>({
  requisition: {
    one: {
      data: {
        owningUserID: 2133751,
        title: 'String',
        requisitionID: 7420427,
        status: 'String',
        updatedAt: '2023-02-11T22:10:50.925Z',
        Customer: {
          create: {
            name: 'String6753469',
            vaultKey: 'String',
            updatedAt: '2023-02-11T22:10:50.925Z',
            status: 'PENDING',
          },
        },
      },
    },
    two: {
      data: {
        owningUserID: 7804860,
        title: 'String',
        requisitionID: 9159693,
        status: 'String',
        updatedAt: '2023-02-11T22:10:50.925Z',
        Customer: {
          create: {
            name: 'String7851671',
            vaultKey: 'String',
            updatedAt: '2023-02-11T22:10:50.925Z',
            status: 'PENDING',
          },
        },
      },
    },
  },
});

export type StandardScenario = ScenarioData<Requisition, 'requisition'>;

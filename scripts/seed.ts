import type { Prisma } from '@prisma/client';
import { db } from 'api/src/lib/db';

export default async () => {
  try {
    //
    // Manually seed via `yarn rw prisma db seed`
    // Seeds automatically with `yarn rw prisma migrate dev` and `yarn rw prisma migrate reset`
    //
    // Update "const data = []" to match your data model and seeding needs
    //

    const addHoursToDate = (date: Date, hours: number): Date => {
      const d = new Date(date);
      const fut = d.setHours(date.getHours() + hours);
      return new Date(fut);
    };

    const addDaysToNow = (days: number): Date => {
      const now = new Date();
      const fut = now.setDate(now.getDate() + days);
      return new Date(fut);
    };

    const customers: Prisma.CustomerCreateArgs[] = [
      {
        data: {
          auth0ID: 'org_Ij86iZSnHeSggo5u',
          name: 'evocs',
          displayName: 'Evocs',
          status: 'ACTIVE',
          vaultKey: 'abc',
        },
      },
    ];
    const users: Prisma.UserCreateArgs[] = [
      {
        data: {
          auth0ID: 'google-apps|spencer@evocs.tech',
          name: 'Spencer Murray',
          email: 'spencer@evocs.tech',
          customer: {
            connect: {
              name: 'evocs',
            },
          },
          status: 'ACTIVE',
          avatarURL:
            'https://lh3.googleusercontent.com/a/AGNmyxYoKip01Gk8UJ5zbhwwScRSpR8lW7SKEmkp2JCV=s96-c',
        },
      },
      {
        data: {
          auth0ID: 'google-apps|roy@evocs.tech',
          name: 'Roy Tan',
          email: 'roy@evocs.tech',
          customer: {
            connect: {
              name: 'evocs',
            },
          },
          status: 'ACTIVE',
        },
      },
      {
        data: {
          auth0ID: 'google-apps|muhammad.bilal@evocs.tech',
          name: 'Muhammad Bilal',
          email: 'muhammad.bilal@evocs.tech',
          customer: {
            connect: {
              name: 'evocs',
            },
          },
          status: 'ACTIVE',
        },
      },
      {
        data: {
          auth0ID: '8ZoJoUwbI7GL99T9Om5cl8OwVAtL9XCW@clients',
          name: 'job_service_worker',
          email: '',
          status: 'ACTIVE',
          customer: {
            connect: {
              name: 'evocs',
            },
          },
        },
      },
    ];
    const products: Prisma.ProductCreateArgs[] = [
      {
        data: {
          title: 'Interview Scheduler',
          description: 'Schedule interviews for candidates from within workday',
          config: { calendarProvider: 'google' },
          published: true,
        },
      },
    ];

    const customerProducts = (
      customerID: number,
      productID: number
    ): Prisma.CustomerProductCreateArgs[] => {
      return [
        {
          data: {
            productID,
            customerID,
            config: { calendarProvider: 'google' },
            requiredOAuth: {
              create: {
                google: true,
                zoom: true,
                azureAD: false,
                adFS: false,
                ping: false,
                adLDAP: false,
              },
            },
          },
        },
      ];
    };

    const candidates = (
      owningCustomerID: number,
      addedByUserID: number
    ): Prisma.CandidateCreateArgs[] => [
      {
        data: {
          owningCustomerID,
          addedByUserID,
          firstName: 'Daniel',
          lastName: 'Russo',
          preferredName: 'Dannyboyyyyyyy',
          email: 'dan@evocs.tech',
          homePhone: '404-444-6688',
          mobilePhone: '678-999-0101',
          wdCandidateID: 'abc',
          profilePictureURL:
            'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
        },
      },
      {
        data: {
          owningCustomerID,
          addedByUserID,
          firstName: 'Roy',
          lastName: 'Tan',
          email: 'roy@evocs.tech',
          homePhone: '404-444-6688',
          mobilePhone: '678-999-0101',
          wdCandidateID: 'def',
          profilePictureURL:
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
        },
      },
    ];

    const requisitions = (
      owningCustomerID: number,
      owningUserID: number
    ): Prisma.RequisitionCreateArgs[] => [
      {
        data: {
          owningCustomerID,
          owningUserID,
          title: 'Data Entry',
          summary: 'Contract position at $15/hr',
          wdRequisitionID: 98134589,
          status: 'open',
          positionType: 'CONTRACT',
        },
      },
      {
        data: {
          owningCustomerID,
          owningUserID,
          title: 'Senior SWE II',
          summary: 'Remote role',
          wdRequisitionID: 37,
          status: 'open',
          positionType: 'FULLTIME',
        },
      },
    ];

    const interviewStages = (
      requisitionIDs: number[]
    ): Prisma.InterviewStageCreateArgs[] =>
      requisitionIDs.flatMap((requisitionID) => [
        {
          data: {
            requisitionID,
            title: 'Phone Screen',
            pipelinePosition: 0,
          },
        },
        {
          data: {
            requisitionID,
            title: 'Onsite technical screen',
            pipelinePosition: 1,
          },
        },
      ]);

    const candidateScheduleRequests = (
      candidateID: number,
      candidateRequisitionID: number,
      interviewStageID: number,
      initiatingUserID: number,
      candidateScheduleID: number
    ): Prisma.CandidateScheduleRequestCreateArgs => ({
      data: {
        candidateID,
        candidateRequisitionID,
        interviewStageID,
        initiatingUserID,
        candidateScheduleID,
        emailSentFromName: 'Evocs User',
        emailSentFromAddressAlias: 'scheduling@evocsproducts.com',
        emailSubject: 'Please schedule your interview',
        emailBody: 'Click here',
        emailServiceMessageID: '123',
        startTime: addDaysToNow(2),
        endTime: addDaysToNow(9),
      },
    });
    // const data: Prisma.UserCreateArgs['data'][] = [
    // To try this example data with the UserExample model in schema.prisma,
    // uncomment the lines below and run 'yarn rw prisma migrate dev'
    //
    // { name: 'alice', email: 'alice@example.com' },
    // { name: 'mark', email: 'mark@example.com' },
    // { name: 'jackie', email: 'jackie@example.com' },
    // { name: 'bob', email: 'bob@example.com' },
    // ];
    console.log(
      "\nUsing the default './scripts/seed.{js,ts}' template\nEdit the file to add seed data\n"
    );

    // Note: if using PostgreSQL, using `createMany` to insert multiple records is much faster
    // @see: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
    const [{ id: customerID }, ..._customerRest] = await Promise.all(
      customers.map(async (data) => {
        const record = await db.customer.create(data);
        console.log(record);
        return record;
      })
    );

    const createdUsers = await Promise.all(
      users.map(async (data: Prisma.UserCreateArgs) => {
        const record = await db.user.create(data);
        console.log(record);
        return record;
      })
    );
    const userID = createdUsers.find(
      ({ auth0ID }) => auth0ID === 'google-apps|spencer@evocs.tech'
    ).id;

    const [{ id: productID }, ..._productRest] = await Promise.all(
      products.map(async (data: Prisma.ProductCreateArgs) => {
        const record = await db.product.create(data);
        console.log(record);
        return record;
      })
    );

    await Promise.all(
      customerProducts(customerID, productID).map(
        async (data: Prisma.CustomerProductCreateArgs) => {
          const record = await db.customerProduct.create(data);
          console.log(record);
          return record;
        }
      )
    );

    const createdCandidates = await Promise.all(
      candidates(customerID, userID).map(
        async (data: Prisma.CandidateCreateArgs) => {
          const record = await db.candidate.create(data);
          console.log(record);
          return record;
        }
      )
    );

    const createdRequisitions = await Promise.all(
      requisitions(customerID, userID).map(
        async (data: Prisma.RequisitionCreateArgs) => {
          const record = await db.requisition.create(data);
          console.log(record);
          return record;
        }
      )
    );

    const createdCandidateRequisitions = await Promise.all(
      createdCandidates.map(async ({ id: candidateID }, i) => {
        const { id: requisitionID } = createdRequisitions[i];
        const record = await db.candidateRequisition.create({
          data: {
            candidateID,
            requisitionID,
            status: 'open',
          },
        });
        console.log(record);
        return record;
      })
    );

    const createdInterviewStages = await Promise.all(
      interviewStages(createdRequisitions.map(({ id }) => id)).map(
        async (data: Prisma.InterviewStageCreateArgs) => {
          const record = await db.interviewStage.create(data);
          console.log(record);
          return record;
        }
      )
    );

    const createdCandidateSchedules = await Promise.all(
      createdCandidateRequisitions.map(
        async ({ id: candidateRequisitionID }, i) => {
          const startTimeOne = addDaysToNow(1);
          const startTimeTwo = addDaysToNow(2);
          const { id: interviewStageID } = createdInterviewStages[i];
          const record = await db.candidateSchedule.create({
            data: {
              candidateRequisitionID,
              interviewStageID,
              scheduleSelections: {
                create: [
                  {
                    startTime: startTimeOne,
                    endTime: addHoursToDate(startTimeOne, 1),
                  },
                  {
                    startTime: startTimeTwo,
                    endTime: addHoursToDate(startTimeTwo, 3),
                  },
                ],
              },
            },
          });
          console.log(record);
          return record;
        }
      )
    );

    await Promise.all(
      createdCandidateSchedules.map(
        async ({ id, interviewStageID, candidateRequisitionID }) => {
          const { candidateID } = createdCandidateRequisitions.find(
            ({ id }) => id === candidateRequisitionID
          );
          const { addedByUserID } = createdCandidates.find(
            ({ id }) => id === candidateID
          );
          const data = candidateScheduleRequests(
            candidateID,
            candidateRequisitionID,
            interviewStageID,
            addedByUserID,
            id
          );
          const record = await db.candidateScheduleRequest.create(data);
          console.log(record);
          return record;
        }
      )
    );
  } catch (error) {
    console.warn('Please define your seed data.');
    console.error(error);
  }
};

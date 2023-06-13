/*
  Warnings:

  - You are about to drop the `InterviewSchedulerEvents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "InterviewSchedulerEvents" DROP CONSTRAINT "InterviewSchedulerEvents_customerID_fkey";

-- DropForeignKey
ALTER TABLE "InterviewSchedulerEvents" DROP CONSTRAINT "InterviewSchedulerEvents_userID_fkey";

-- DropTable
DROP TABLE "InterviewSchedulerEvents";

-- CreateTable
CREATE TABLE "InterviewSchedulerEvent" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "customerID" INTEGER NOT NULL,
    "attendees" TEXT[],
    "calendarProvider" "CalendarProvider" NOT NULL,
    "conferencingProvider" "ConferencingProvider",
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startTime" TIMESTAMPTZ NOT NULL,
    "endTime" TIMESTAMPTZ NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterviewSchedulerEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InterviewSchedulerEvent" ADD CONSTRAINT "InterviewSchedulerEvent_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewSchedulerEvent" ADD CONSTRAINT "InterviewSchedulerEvent_customerID_fkey" FOREIGN KEY ("customerID") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

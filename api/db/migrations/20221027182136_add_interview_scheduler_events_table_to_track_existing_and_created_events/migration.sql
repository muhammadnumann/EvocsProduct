-- CreateEnum
CREATE TYPE "CalendarProvider" AS ENUM ('GOOGLE', 'OFFICE365');

-- CreateEnum
CREATE TYPE "ConferencingProvider" AS ENUM ('GOOGLEHANGOUTS', 'ZOOM', 'TEAMS');

-- CreateTable
CREATE TABLE "InterviewSchedulerEvents" (
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

    CONSTRAINT "InterviewSchedulerEvents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InterviewSchedulerEvents" ADD CONSTRAINT "InterviewSchedulerEvents_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewSchedulerEvents" ADD CONSTRAINT "InterviewSchedulerEvents_customerID_fkey" FOREIGN KEY ("customerID") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

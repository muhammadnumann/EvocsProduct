/*
  Warnings:

  - You are about to drop the column `attendees` on the `InterviewSchedulerEvent` table. All the data in the column will be lost.
  - You are about to drop the `SchedulerGoogleAuth` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "CalendarInviteStatus" AS ENUM ('PENDING', 'DECLINED', 'MAYBE', 'ACCEPTED');

-- DropForeignKey
ALTER TABLE "SchedulerGoogleAuth" DROP CONSTRAINT "SchedulerGoogleAuth_customerID_fkey";

-- AlterTable
ALTER TABLE "InterviewSchedulerEvent" DROP COLUMN "attendees";

-- DropTable
DROP TABLE "SchedulerGoogleAuth";

-- CreateTable
CREATE TABLE "InterviewSchedulerEventAttendee" (
    "id" SERIAL NOT NULL,
    "eventID" INTEGER NOT NULL,
    "attendeeURI" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "inviteStatus" "CalendarInviteStatus" NOT NULL,
    "avatarURL" TEXT,

    CONSTRAINT "InterviewSchedulerEventAttendee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InterviewSchedulerEventAttendee_eventID_attendeeURI_key" ON "InterviewSchedulerEventAttendee"("eventID", "attendeeURI");

-- CreateIndex
CREATE UNIQUE INDEX "InterviewSchedulerEventAttendee_eventID_email_key" ON "InterviewSchedulerEventAttendee"("eventID", "email");

-- AddForeignKey
ALTER TABLE "InterviewSchedulerEventAttendee" ADD CONSTRAINT "InterviewSchedulerEventAttendee_eventID_fkey" FOREIGN KEY ("eventID") REFERENCES "InterviewSchedulerEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

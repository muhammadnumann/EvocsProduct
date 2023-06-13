/*
  Warnings:

  - Added the required column `wdRequisitionID` to the `InterviewSchedulerEvent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "InterviewSchedulerEventAttendee" DROP CONSTRAINT "InterviewSchedulerEventAttendee_eventID_fkey";

-- AlterTable
ALTER TABLE "InterviewSchedulerEvent" ADD COLUMN     "wdRequisitionID" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "InterviewSchedulerEventAttendee" ADD CONSTRAINT "InterviewSchedulerEventAttendee_eventID_fkey" FOREIGN KEY ("eventID") REFERENCES "InterviewSchedulerEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

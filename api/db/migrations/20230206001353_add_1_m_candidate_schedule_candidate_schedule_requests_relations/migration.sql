/*
  Warnings:

  - Added the required column `candidateID` to the `CandidateScheduleRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scheduleID` to the `CandidateScheduleRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CandidateScheduleRequest" ADD COLUMN     "candidateID" INTEGER NOT NULL,
ADD COLUMN     "scheduleID" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "CandidateScheduleRequest" ADD CONSTRAINT "CandidateScheduleRequest_candidateID_fkey" FOREIGN KEY ("candidateID") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateScheduleRequest" ADD CONSTRAINT "CandidateScheduleRequest_scheduleID_fkey" FOREIGN KEY ("scheduleID") REFERENCES "CandidateSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

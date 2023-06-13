/*
  Warnings:

  - You are about to drop the column `scheduleID` on the `CandidateScheduleRequest` table. All the data in the column will be lost.
  - Added the required column `candidateScheduleID` to the `CandidateScheduleRequest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CandidateScheduleRequest" DROP CONSTRAINT "CandidateScheduleRequest_scheduleID_fkey";

-- AlterTable
ALTER TABLE "CandidateScheduleRequest" DROP COLUMN "scheduleID",
ADD COLUMN     "candidateScheduleID" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "CandidateScheduleRequest" ADD CONSTRAINT "CandidateScheduleRequest_candidateScheduleID_fkey" FOREIGN KEY ("candidateScheduleID") REFERENCES "CandidateSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

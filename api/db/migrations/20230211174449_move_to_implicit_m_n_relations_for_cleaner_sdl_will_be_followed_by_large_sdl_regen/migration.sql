/*
  Warnings:

  - You are about to drop the column `wdRequisitionID` on the `CandidateSchedule` table. All the data in the column will be lost.
  - You are about to drop the `CandidateScheduleSelection` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wdCandidateID` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requisitionID` to the `CandidateSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CandidateSchedule" DROP CONSTRAINT "CandidateSchedule_candidateID_fkey";

-- DropForeignKey
ALTER TABLE "CandidateScheduleRequest" DROP CONSTRAINT "CandidateScheduleRequest_candidateID_fkey";

-- DropForeignKey
ALTER TABLE "CandidateScheduleRequest" DROP CONSTRAINT "CandidateScheduleRequest_candidateScheduleID_fkey";

-- DropForeignKey
ALTER TABLE "CandidateScheduleRequestReminder" DROP CONSTRAINT "CandidateScheduleRequestReminder_candidateScheduleRequestI_fkey";

-- DropForeignKey
ALTER TABLE "CandidateScheduleSelection" DROP CONSTRAINT "CandidateScheduleSelection_candidateScheduleID_fkey";

-- DropForeignKey
ALTER TABLE "CandidateScheduleSelection" DROP CONSTRAINT "CandidateScheduleSelection_scheduleSelectionID_fkey";

-- DropIndex
DROP INDEX "CandidateSchedule_wdRequisitionID_key";

-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "wdCandidateID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CandidateSchedule" DROP COLUMN "wdRequisitionID",
ADD COLUMN     "candidateId" INTEGER,
ADD COLUMN     "requisitionID" INTEGER NOT NULL;

-- DropTable
DROP TABLE "CandidateScheduleSelection";

-- CreateTable
CREATE TABLE "Requisition" (
    "id" SERIAL NOT NULL,
    "owningCustomerID" INTEGER NOT NULL,
    "owningUserID" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT,
    "wdRequisitionID" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Requisition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CandidateToRequisition" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CandidateScheduleToScheduleSelection" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CandidateToRequisition_AB_unique" ON "_CandidateToRequisition"("A", "B");

-- CreateIndex
CREATE INDEX "_CandidateToRequisition_B_index" ON "_CandidateToRequisition"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CandidateScheduleToScheduleSelection_AB_unique" ON "_CandidateScheduleToScheduleSelection"("A", "B");

-- CreateIndex
CREATE INDEX "_CandidateScheduleToScheduleSelection_B_index" ON "_CandidateScheduleToScheduleSelection"("B");

-- CreateIndex
CREATE INDEX "CandidateSchedule_candidateID_idx" ON "CandidateSchedule"("candidateID");

-- CreateIndex
CREATE INDEX "CandidateScheduleRequest_candidateScheduleID_idx" ON "CandidateScheduleRequest"("candidateScheduleID");

-- CreateIndex
CREATE INDEX "CandidateScheduleRequestReminder_candidateScheduleRequestID_idx" ON "CandidateScheduleRequestReminder"("candidateScheduleRequestID");

-- AddForeignKey
ALTER TABLE "CandidateSchedule" ADD CONSTRAINT "CandidateSchedule_candidateID_fkey" FOREIGN KEY ("candidateID") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateSchedule" ADD CONSTRAINT "CandidateSchedule_requisitionID_fkey" FOREIGN KEY ("requisitionID") REFERENCES "Requisition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateScheduleRequest" ADD CONSTRAINT "CandidateScheduleRequest_candidateID_fkey" FOREIGN KEY ("candidateID") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateScheduleRequest" ADD CONSTRAINT "CandidateScheduleRequest_candidateScheduleID_fkey" FOREIGN KEY ("candidateScheduleID") REFERENCES "CandidateSchedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateScheduleRequestReminder" ADD CONSTRAINT "CandidateScheduleRequestReminder_candidateScheduleRequestI_fkey" FOREIGN KEY ("candidateScheduleRequestID") REFERENCES "CandidateScheduleRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateToRequisition" ADD CONSTRAINT "_CandidateToRequisition_A_fkey" FOREIGN KEY ("A") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateToRequisition" ADD CONSTRAINT "_CandidateToRequisition_B_fkey" FOREIGN KEY ("B") REFERENCES "Requisition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateScheduleToScheduleSelection" ADD CONSTRAINT "_CandidateScheduleToScheduleSelection_A_fkey" FOREIGN KEY ("A") REFERENCES "CandidateSchedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateScheduleToScheduleSelection" ADD CONSTRAINT "_CandidateScheduleToScheduleSelection_B_fkey" FOREIGN KEY ("B") REFERENCES "ScheduleSelection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

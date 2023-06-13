/*
  Warnings:

  - You are about to drop the column `candidateID` on the `CandidateSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `requisitionID` on the `CandidateSchedule` table. All the data in the column will be lost.
  - You are about to drop the `_CandidateToRequisition` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `candidateRequisitionID` to the `CandidateSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CandidateSchedule" DROP CONSTRAINT "CandidateSchedule_candidateID_fkey";

-- DropForeignKey
ALTER TABLE "CandidateSchedule" DROP CONSTRAINT "CandidateSchedule_requisitionID_fkey";

-- DropForeignKey
ALTER TABLE "_CandidateToRequisition" DROP CONSTRAINT "_CandidateToRequisition_A_fkey";

-- DropForeignKey
ALTER TABLE "_CandidateToRequisition" DROP CONSTRAINT "_CandidateToRequisition_B_fkey";

-- DropIndex
DROP INDEX "CandidateSchedule_candidateID_idx";

-- AlterTable
ALTER TABLE "CandidateSchedule" DROP COLUMN "candidateID",
DROP COLUMN "requisitionID",
ADD COLUMN     "candidateId" INTEGER,
ADD COLUMN     "candidateRequisitionID" INTEGER NOT NULL,
ADD COLUMN     "requisitionId" INTEGER;

-- DropTable
DROP TABLE "_CandidateToRequisition";

-- CreateTable
CREATE TABLE "CandidateRequisition" (
    "id" SERIAL NOT NULL,
    "candidateID" INTEGER NOT NULL,
    "requisitionID" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "candidateScheduleId" INTEGER,

    CONSTRAINT "CandidateRequisition_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CandidateRequisition_candidateID_idx" ON "CandidateRequisition"("candidateID");

-- CreateIndex
CREATE INDEX "CandidateRequisition_requisitionID_idx" ON "CandidateRequisition"("requisitionID");

-- CreateIndex
CREATE UNIQUE INDEX "CandidateRequisition_candidateID_requisitionID_key" ON "CandidateRequisition"("candidateID", "requisitionID");

-- CreateIndex
CREATE INDEX "CandidateSchedule_candidateRequisitionID_idx" ON "CandidateSchedule"("candidateRequisitionID");

-- AddForeignKey
ALTER TABLE "CandidateRequisition" ADD CONSTRAINT "CandidateRequisition_candidateID_fkey" FOREIGN KEY ("candidateID") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateRequisition" ADD CONSTRAINT "CandidateRequisition_requisitionID_fkey" FOREIGN KEY ("requisitionID") REFERENCES "Requisition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateSchedule" ADD CONSTRAINT "CandidateSchedule_candidateRequisitionID_fkey" FOREIGN KEY ("candidateRequisitionID") REFERENCES "CandidateRequisition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateSchedule" ADD CONSTRAINT "CandidateSchedule_requisitionId_fkey" FOREIGN KEY ("requisitionId") REFERENCES "Requisition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateSchedule" ADD CONSTRAINT "CandidateSchedule_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

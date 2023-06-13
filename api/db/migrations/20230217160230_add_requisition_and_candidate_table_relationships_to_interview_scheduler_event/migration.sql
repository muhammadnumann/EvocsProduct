/*
  Warnings:

  - You are about to drop the column `wdRequisitionID` on the `InterviewSchedulerEvent` table. All the data in the column will be lost.
  - Added the required column `candidateID` to the `InterviewSchedulerEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requisitionID` to the `InterviewSchedulerEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InterviewSchedulerEvent" DROP COLUMN "wdRequisitionID",
ADD COLUMN     "candidateID" INTEGER NOT NULL,
ADD COLUMN     "requisitionID" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "InterviewSchedulerEvent" ADD CONSTRAINT "InterviewSchedulerEvent_requisitionID_fkey" FOREIGN KEY ("requisitionID") REFERENCES "Requisition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewSchedulerEvent" ADD CONSTRAINT "InterviewSchedulerEvent_candidateID_fkey" FOREIGN KEY ("candidateID") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

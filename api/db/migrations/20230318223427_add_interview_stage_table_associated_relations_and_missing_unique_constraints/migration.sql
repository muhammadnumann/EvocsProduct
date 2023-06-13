/*
  Warnings:

  - You are about to drop the column `candidateId` on the `CandidateSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `requisitionId` on the `CandidateSchedule` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[candidateRequisitionID,interviewStageID]` on the table `CandidateSchedule` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `interviewStageID` to the `CandidateSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `candidateRequisitionID` to the `CandidateScheduleRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interviewStageID` to the `CandidateScheduleRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `candidateRequisitionID` to the `InterviewSchedulerEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interviewStageID` to the `InterviewSchedulerEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CandidateSchedule" DROP COLUMN "candidateId",
DROP COLUMN "requisitionId",
ADD COLUMN     "interviewStageID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CandidateScheduleRequest" ADD COLUMN     "candidateRequisitionID" INTEGER NOT NULL,
ADD COLUMN     "interviewStageID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "InterviewSchedulerEvent" ADD COLUMN     "candidateRequisitionID" INTEGER NOT NULL,
ADD COLUMN     "interviewStageID" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "InterviewStage" (
    "id" SERIAL NOT NULL,
    "requisitionID" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "pipelinePosition" INTEGER NOT NULL,

    CONSTRAINT "InterviewStage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "InterviewStage_requisitionID_idx" ON "InterviewStage"("requisitionID");

-- CreateIndex
CREATE UNIQUE INDEX "InterviewStage_requisitionID_pipelinePosition_key" ON "InterviewStage"("requisitionID", "pipelinePosition");

-- CreateIndex
CREATE UNIQUE INDEX "CandidateSchedule_candidateRequisitionID_interviewStageID_key" ON "CandidateSchedule"("candidateRequisitionID", "interviewStageID");

-- CreateIndex
CREATE INDEX "InterviewSchedulerEvent_candidateID_idx" ON "InterviewSchedulerEvent"("candidateID");

-- CreateIndex
CREATE INDEX "InterviewSchedulerEvent_requisitionID_idx" ON "InterviewSchedulerEvent"("requisitionID");

-- CreateIndex
CREATE INDEX "InterviewSchedulerEvent_candidateRequisitionID_idx" ON "InterviewSchedulerEvent"("candidateRequisitionID");

-- CreateIndex
CREATE INDEX "InterviewSchedulerEvent_interviewStageID_idx" ON "InterviewSchedulerEvent"("interviewStageID");

-- AddForeignKey
ALTER TABLE "InterviewSchedulerEvent" ADD CONSTRAINT "InterviewSchedulerEvent_interviewStageID_fkey" FOREIGN KEY ("interviewStageID") REFERENCES "InterviewStage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewSchedulerEvent" ADD CONSTRAINT "InterviewSchedulerEvent_candidateRequisitionID_fkey" FOREIGN KEY ("candidateRequisitionID") REFERENCES "CandidateRequisition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewStage" ADD CONSTRAINT "InterviewStage_requisitionID_fkey" FOREIGN KEY ("requisitionID") REFERENCES "Requisition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateSchedule" ADD CONSTRAINT "CandidateSchedule_interviewStageID_fkey" FOREIGN KEY ("interviewStageID") REFERENCES "InterviewStage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateScheduleRequest" ADD CONSTRAINT "CandidateScheduleRequest_candidateRequisitionID_fkey" FOREIGN KEY ("candidateRequisitionID") REFERENCES "CandidateRequisition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateScheduleRequest" ADD CONSTRAINT "CandidateScheduleRequest_interviewStageID_fkey" FOREIGN KEY ("interviewStageID") REFERENCES "InterviewStage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

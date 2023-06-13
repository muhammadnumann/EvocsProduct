/*
  Warnings:

  - Added the required column `status` to the `InterviewSchedulerEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "profilePictureURL" TEXT;

-- AlterTable
ALTER TABLE "InterviewSchedulerEvent" ADD COLUMN     "status" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_InterviewSchedulerEventToNote" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_InterviewSchedulerEventToNote_AB_unique" ON "_InterviewSchedulerEventToNote"("A", "B");

-- CreateIndex
CREATE INDEX "_InterviewSchedulerEventToNote_B_index" ON "_InterviewSchedulerEventToNote"("B");

-- AddForeignKey
ALTER TABLE "_InterviewSchedulerEventToNote" ADD CONSTRAINT "_InterviewSchedulerEventToNote_A_fkey" FOREIGN KEY ("A") REFERENCES "InterviewSchedulerEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InterviewSchedulerEventToNote" ADD CONSTRAINT "_InterviewSchedulerEventToNote_B_fkey" FOREIGN KEY ("B") REFERENCES "Note"("id") ON DELETE CASCADE ON UPDATE CASCADE;

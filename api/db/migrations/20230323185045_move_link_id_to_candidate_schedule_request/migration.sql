/*
  Warnings:

  - You are about to drop the column `linkID` on the `CandidateSchedule` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[linkID]` on the table `CandidateScheduleRequest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `endTime` to the `CandidateScheduleRequest` table without a default value. This is not possible if the table is not empty.
  - The required column `linkID` was added to the `CandidateScheduleRequest` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `startTime` to the `CandidateScheduleRequest` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "CandidateSchedule_linkID_key";

-- AlterTable
ALTER TABLE "CandidateSchedule" DROP COLUMN "linkID";

-- AlterTable
ALTER TABLE "CandidateScheduleRequest" ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "linkID" TEXT NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CandidateScheduleRequest_linkID_key" ON "CandidateScheduleRequest"("linkID");

/*
  Warnings:

  - A unique constraint covering the columns `[wdCandidateID]` on the table `Candidate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Candidate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_wdCandidateID_key" ON "Candidate"("wdCandidateID");

-- CreateIndex
CREATE INDEX "Candidate_owningCustomerID_idx" ON "Candidate"("owningCustomerID");

-- CreateIndex
CREATE INDEX "Candidate_addedByUserID_idx" ON "Candidate"("addedByUserID");

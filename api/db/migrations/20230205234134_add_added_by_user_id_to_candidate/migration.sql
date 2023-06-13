/*
  Warnings:

  - Added the required column `addedByUserID` to the `Candidate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "addedByUserID" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_addedByUserID_fkey" FOREIGN KEY ("addedByUserID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

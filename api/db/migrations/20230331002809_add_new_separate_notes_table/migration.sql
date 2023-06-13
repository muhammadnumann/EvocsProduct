/*
  Warnings:

  - You are about to drop the column `notes` on the `Candidate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "notes",
ADD COLUMN     "about" TEXT;

-- CreateTable
CREATE TABLE "Note" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "addedByUserID" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CandidateToNote" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CandidateRequisitionToNote" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CandidateToNote_AB_unique" ON "_CandidateToNote"("A", "B");

-- CreateIndex
CREATE INDEX "_CandidateToNote_B_index" ON "_CandidateToNote"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CandidateRequisitionToNote_AB_unique" ON "_CandidateRequisitionToNote"("A", "B");

-- CreateIndex
CREATE INDEX "_CandidateRequisitionToNote_B_index" ON "_CandidateRequisitionToNote"("B");

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_addedByUserID_fkey" FOREIGN KEY ("addedByUserID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateToNote" ADD CONSTRAINT "_CandidateToNote_A_fkey" FOREIGN KEY ("A") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateToNote" ADD CONSTRAINT "_CandidateToNote_B_fkey" FOREIGN KEY ("B") REFERENCES "Note"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateRequisitionToNote" ADD CONSTRAINT "_CandidateRequisitionToNote_A_fkey" FOREIGN KEY ("A") REFERENCES "CandidateRequisition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidateRequisitionToNote" ADD CONSTRAINT "_CandidateRequisitionToNote_B_fkey" FOREIGN KEY ("B") REFERENCES "Note"("id") ON DELETE CASCADE ON UPDATE CASCADE;

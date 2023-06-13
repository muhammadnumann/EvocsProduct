/*
  Warnings:

  - Added the required column `owningCustomerID` to the `Attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uploadedByUserID` to the `Attachment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attachment" ADD COLUMN     "owningCustomerID" INTEGER NOT NULL,
ADD COLUMN     "uploadedByUserID" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Attachment_uploadedByUserID_idx" ON "Attachment"("uploadedByUserID");

-- CreateIndex
CREATE INDEX "Attachment_owningCustomerID_idx" ON "Attachment"("owningCustomerID");

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_uploadedByUserID_fkey" FOREIGN KEY ("uploadedByUserID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_owningCustomerID_fkey" FOREIGN KEY ("owningCustomerID") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

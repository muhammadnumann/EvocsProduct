/*
  Warnings:

  - You are about to drop the column `customerID` on the `GoogleAuth` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userID,customerProductID]` on the table `GoogleAuth` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userID` to the `GoogleAuth` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GoogleAuth" DROP CONSTRAINT "GoogleAuth_customerID_fkey";

-- DropIndex
DROP INDEX "GoogleAuth_customerID_customerProductID_key";

-- DropIndex
DROP INDEX "GoogleAuth_customerID_idx";

-- DropIndex
DROP INDEX "GoogleAuth_customerID_key";

-- AlterTable
ALTER TABLE "GoogleAuth" DROP COLUMN "customerID",
ADD COLUMN     "userID" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "GoogleAuth_userID_idx" ON "GoogleAuth" USING HASH ("userID");

-- CreateIndex
CREATE UNIQUE INDEX "GoogleAuth_userID_customerProductID_key" ON "GoogleAuth"("userID", "customerProductID");

-- AddForeignKey
ALTER TABLE "GoogleAuth" ADD CONSTRAINT "GoogleAuth_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

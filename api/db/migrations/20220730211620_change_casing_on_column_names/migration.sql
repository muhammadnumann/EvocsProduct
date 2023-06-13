/*
  Warnings:

  - You are about to drop the column `customerId` on the `CustomerProduct` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `CustomerProduct` table. All the data in the column will be lost.
  - Added the required column `customerID` to the `CustomerProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productID` to the `CustomerProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CustomerProduct" DROP CONSTRAINT "CustomerProduct_customerId_fkey";

-- DropForeignKey
ALTER TABLE "CustomerProduct" DROP CONSTRAINT "CustomerProduct_productId_fkey";

-- AlterTable
ALTER TABLE "CustomerProduct" DROP COLUMN "customerId",
DROP COLUMN "productId",
ADD COLUMN     "customerID" INTEGER NOT NULL,
ADD COLUMN     "productID" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "CustomerProduct" ADD CONSTRAINT "CustomerProduct_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerProduct" ADD CONSTRAINT "CustomerProduct_customerID_fkey" FOREIGN KEY ("customerID") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

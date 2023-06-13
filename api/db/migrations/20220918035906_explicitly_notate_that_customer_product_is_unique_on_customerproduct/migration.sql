/*
  Warnings:

  - A unique constraint covering the columns `[customerID,productID]` on the table `CustomerProduct` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CustomerProduct_customerID_productID_key" ON "CustomerProduct"("customerID", "productID");

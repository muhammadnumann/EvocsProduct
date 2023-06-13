/*
  Warnings:

  - Added the required column `vaultKey` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "vaultKey" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "CustomerTenants" (
    "id" SERIAL NOT NULL,
    "customerID" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "vaultKey" TEXT,

    CONSTRAINT "CustomerTenants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CustomerTenants_customerID_idx" ON "CustomerTenants"("customerID");

-- AddForeignKey
ALTER TABLE "CustomerTenants" ADD CONSTRAINT "CustomerTenants_customerID_fkey" FOREIGN KEY ("customerID") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

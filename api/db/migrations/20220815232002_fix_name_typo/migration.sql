/*
  Warnings:

  - You are about to drop the `CustomerTenants` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CustomerTenants" DROP CONSTRAINT "CustomerTenants_customerID_fkey";

-- DropTable
DROP TABLE "CustomerTenants";

-- CreateTable
CREATE TABLE "CustomerTenant" (
    "id" SERIAL NOT NULL,
    "customerID" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "vaultKey" TEXT,

    CONSTRAINT "CustomerTenant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CustomerTenant_customerID_idx" ON "CustomerTenant"("customerID");

-- AddForeignKey
ALTER TABLE "CustomerTenant" ADD CONSTRAINT "CustomerTenant_customerID_fkey" FOREIGN KEY ("customerID") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

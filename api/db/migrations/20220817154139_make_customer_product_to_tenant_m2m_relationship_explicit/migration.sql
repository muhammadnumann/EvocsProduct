/*
  Warnings:

  - You are about to drop the `_CustomerProductToCustomerTenant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CustomerProductToCustomerTenant" DROP CONSTRAINT "_CustomerProductToCustomerTenant_A_fkey";

-- DropForeignKey
ALTER TABLE "_CustomerProductToCustomerTenant" DROP CONSTRAINT "_CustomerProductToCustomerTenant_B_fkey";

-- DropTable
DROP TABLE "_CustomerProductToCustomerTenant";

-- CreateTable
CREATE TABLE "CustomerProductEnabledTenants" (
    "id" SERIAL NOT NULL,
    "customerProductID" INTEGER NOT NULL,
    "customerTenantID" INTEGER NOT NULL,

    CONSTRAINT "CustomerProductEnabledTenants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CustomerProductEnabledTenants_customerProductID_customerTen_idx" ON "CustomerProductEnabledTenants"("customerProductID", "customerTenantID");

-- AddForeignKey
ALTER TABLE "CustomerProductEnabledTenants" ADD CONSTRAINT "CustomerProductEnabledTenants_customerProductID_fkey" FOREIGN KEY ("customerProductID") REFERENCES "CustomerProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerProductEnabledTenants" ADD CONSTRAINT "CustomerProductEnabledTenants_customerTenantID_fkey" FOREIGN KEY ("customerTenantID") REFERENCES "CustomerTenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

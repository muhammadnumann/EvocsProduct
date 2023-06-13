/*
  Warnings:

  - You are about to drop the `CustomerProductEnabledTenants` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CustomerProductEnabledTenants" DROP CONSTRAINT "CustomerProductEnabledTenants_customerProductID_fkey";

-- DropForeignKey
ALTER TABLE "CustomerProductEnabledTenants" DROP CONSTRAINT "CustomerProductEnabledTenants_customerTenantID_fkey";

-- DropTable
DROP TABLE "CustomerProductEnabledTenants";

-- CreateTable
CREATE TABLE "CustomerProductEnabledTenant" (
    "id" SERIAL NOT NULL,
    "customerProductID" INTEGER NOT NULL,
    "customerTenantID" INTEGER NOT NULL,

    CONSTRAINT "CustomerProductEnabledTenant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CustomerProductEnabledTenant_customerProductID_customerTena_idx" ON "CustomerProductEnabledTenant"("customerProductID", "customerTenantID");

-- AddForeignKey
ALTER TABLE "CustomerProductEnabledTenant" ADD CONSTRAINT "CustomerProductEnabledTenant_customerProductID_fkey" FOREIGN KEY ("customerProductID") REFERENCES "CustomerProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerProductEnabledTenant" ADD CONSTRAINT "CustomerProductEnabledTenant_customerTenantID_fkey" FOREIGN KEY ("customerTenantID") REFERENCES "CustomerTenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

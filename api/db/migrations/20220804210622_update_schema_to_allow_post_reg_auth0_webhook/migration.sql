/*
  Warnings:

  - A unique constraint covering the columns `[auth0ID]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "auth0ID" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_auth0ID_key" ON "Customer"("auth0ID");

-- CreateIndex
CREATE INDEX "Job_status_initiatingUserID_idx" ON "Job"("status", "initiatingUserID");

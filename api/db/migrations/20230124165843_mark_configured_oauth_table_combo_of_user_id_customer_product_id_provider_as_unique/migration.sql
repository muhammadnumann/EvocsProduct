/*
  Warnings:

  - A unique constraint covering the columns `[userID,customerProductID,provider]` on the table `ConfiguredOAuth` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ConfiguredOAuth_userID_customerProductID_key";

-- CreateIndex
CREATE UNIQUE INDEX "ConfiguredOAuth_userID_customerProductID_provider_key" ON "ConfiguredOAuth"("userID", "customerProductID", "provider");

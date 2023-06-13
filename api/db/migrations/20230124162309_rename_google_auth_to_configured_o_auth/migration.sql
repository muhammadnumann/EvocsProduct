/*
  Warnings:

  - You are about to drop the `GoogleAuth` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "OAuthProvider" AS ENUM ('GOOGLE_WORKSPACE', 'AZURE_AD', 'ZOOM');

-- DropForeignKey
ALTER TABLE "GoogleAuth" DROP CONSTRAINT "GoogleAuth_customerProductID_fkey";

-- DropForeignKey
ALTER TABLE "GoogleAuth" DROP CONSTRAINT "GoogleAuth_userID_fkey";

-- DropTable
DROP TABLE "GoogleAuth";

-- CreateTable
CREATE TABLE "ConfiguredOAuth" (
    "id" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,
    "customerProductID" INTEGER NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "provider" "OAuthProvider" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConfiguredOAuth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ConfiguredOAuth_userID_idx" ON "ConfiguredOAuth" USING HASH ("userID");

-- CreateIndex
CREATE UNIQUE INDEX "ConfiguredOAuth_userID_customerProductID_key" ON "ConfiguredOAuth"("userID", "customerProductID");

-- AddForeignKey
ALTER TABLE "ConfiguredOAuth" ADD CONSTRAINT "ConfiguredOAuth_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConfiguredOAuth" ADD CONSTRAINT "ConfiguredOAuth_customerProductID_fkey" FOREIGN KEY ("customerProductID") REFERENCES "CustomerProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

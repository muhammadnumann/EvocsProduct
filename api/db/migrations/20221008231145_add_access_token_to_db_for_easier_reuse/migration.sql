/*
  Warnings:

  - Added the required column `accessToken` to the `GoogleAuth` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GoogleAuth" ADD COLUMN     "accessToken" TEXT NOT NULL;

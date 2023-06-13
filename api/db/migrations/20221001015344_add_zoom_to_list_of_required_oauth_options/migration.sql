/*
  Warnings:

  - Added the required column `zoom` to the `RequiredOAuth` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RequiredOAuth" ADD COLUMN     "zoom" BOOLEAN NOT NULL;

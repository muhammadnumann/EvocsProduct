/*
  Warnings:

  - Added the required column `positionType` to the `Requisition` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PositionType" AS ENUM ('CONTRACT', 'FULLTIME');

-- AlterTable
ALTER TABLE "Requisition" ADD COLUMN     "positionType" "PositionType" NOT NULL;

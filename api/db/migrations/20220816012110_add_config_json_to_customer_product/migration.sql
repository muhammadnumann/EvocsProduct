/*
  Warnings:

  - Added the required column `config` to the `CustomerProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CustomerProduct" ADD COLUMN     "config" JSONB NOT NULL;

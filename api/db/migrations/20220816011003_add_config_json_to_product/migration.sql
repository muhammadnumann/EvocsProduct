/*
  Warnings:

  - Added the required column `config` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "config" JSONB NOT NULL;

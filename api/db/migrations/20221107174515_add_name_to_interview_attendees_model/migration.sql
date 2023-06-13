/*
  Warnings:

  - Added the required column `name` to the `InterviewSchedulerEventAttendee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InterviewSchedulerEventAttendee" ADD COLUMN     "name" TEXT NOT NULL;

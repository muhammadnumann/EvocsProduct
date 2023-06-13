-- DropForeignKey
ALTER TABLE "CandidateScheduleRequest" DROP CONSTRAINT "CandidateScheduleRequest_reminderForRequestID_fkey";

-- CreateTable
CREATE TABLE "CandidateScheduleRequestReminder" (
    "id" SERIAL NOT NULL,
    "candidateScheduleRequestID" INTEGER NOT NULL,
    "emailServiceMessageID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CandidateScheduleRequestReminder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CandidateScheduleRequestReminder" ADD CONSTRAINT "CandidateScheduleRequestReminder_candidateScheduleRequestI_fkey" FOREIGN KEY ("candidateScheduleRequestID") REFERENCES "CandidateScheduleRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

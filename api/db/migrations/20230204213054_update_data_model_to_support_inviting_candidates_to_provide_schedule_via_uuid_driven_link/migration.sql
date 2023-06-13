-- CreateTable
CREATE TABLE "Candidate" (
    "id" SERIAL NOT NULL,
    "owningCustomerID" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "preferredName" TEXT,
    "email" TEXT NOT NULL,
    "homePhone" TEXT,
    "mobilePhone" TEXT,
    "notes" TEXT,

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidateSchedule" (
    "id" SERIAL NOT NULL,
    "candidateID" INTEGER NOT NULL,
    "wdRequisitionID" INTEGER NOT NULL,
    "linkID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CandidateSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidateScheduleRequest" (
    "id" SERIAL NOT NULL,
    "initiatingUserID" INTEGER NOT NULL,
    "emailSentFromName" TEXT NOT NULL,
    "emailSentFromAddressAlias" TEXT NOT NULL,
    "emailSubject" TEXT NOT NULL,
    "emailBody" TEXT NOT NULL,
    "emailServiceMessageID" TEXT NOT NULL,
    "linkClickedAt" TIMESTAMP(3),
    "reminderForRequestID" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CandidateScheduleRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidateScheduleSelection" (
    "id" SERIAL NOT NULL,
    "candidateScheduleID" INTEGER NOT NULL,
    "scheduleSelectionID" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CandidateScheduleSelection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScheduleSelection" (
    "id" SERIAL NOT NULL,
    "startTime" TIMESTAMPTZ NOT NULL,
    "endTime" TIMESTAMPTZ NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScheduleSelection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CandidateSchedule_wdRequisitionID_key" ON "CandidateSchedule"("wdRequisitionID");

-- CreateIndex
CREATE UNIQUE INDEX "CandidateSchedule_linkID_key" ON "CandidateSchedule"("linkID");

-- CreateIndex
CREATE UNIQUE INDEX "CandidateScheduleSelection_scheduleSelectionID_key" ON "CandidateScheduleSelection"("scheduleSelectionID");

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_owningCustomerID_fkey" FOREIGN KEY ("owningCustomerID") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateSchedule" ADD CONSTRAINT "CandidateSchedule_candidateID_fkey" FOREIGN KEY ("candidateID") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateScheduleRequest" ADD CONSTRAINT "CandidateScheduleRequest_reminderForRequestID_fkey" FOREIGN KEY ("reminderForRequestID") REFERENCES "CandidateScheduleRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateScheduleRequest" ADD CONSTRAINT "CandidateScheduleRequest_initiatingUserID_fkey" FOREIGN KEY ("initiatingUserID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateScheduleSelection" ADD CONSTRAINT "CandidateScheduleSelection_candidateScheduleID_fkey" FOREIGN KEY ("candidateScheduleID") REFERENCES "CandidateSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateScheduleSelection" ADD CONSTRAINT "CandidateScheduleSelection_scheduleSelectionID_fkey" FOREIGN KEY ("scheduleSelectionID") REFERENCES "ScheduleSelection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

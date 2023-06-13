-- CreateTable
CREATE TABLE "Attachment" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AttachmentToCandidate" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AttachmentToRequisition" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Attachment_key_key" ON "Attachment"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Attachment_url_key" ON "Attachment"("url");

-- CreateIndex
CREATE UNIQUE INDEX "_AttachmentToCandidate_AB_unique" ON "_AttachmentToCandidate"("A", "B");

-- CreateIndex
CREATE INDEX "_AttachmentToCandidate_B_index" ON "_AttachmentToCandidate"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AttachmentToRequisition_AB_unique" ON "_AttachmentToRequisition"("A", "B");

-- CreateIndex
CREATE INDEX "_AttachmentToRequisition_B_index" ON "_AttachmentToRequisition"("B");

-- AddForeignKey
ALTER TABLE "_AttachmentToCandidate" ADD CONSTRAINT "_AttachmentToCandidate_A_fkey" FOREIGN KEY ("A") REFERENCES "Attachment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttachmentToCandidate" ADD CONSTRAINT "_AttachmentToCandidate_B_fkey" FOREIGN KEY ("B") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttachmentToRequisition" ADD CONSTRAINT "_AttachmentToRequisition_A_fkey" FOREIGN KEY ("A") REFERENCES "Attachment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AttachmentToRequisition" ADD CONSTRAINT "_AttachmentToRequisition_B_fkey" FOREIGN KEY ("B") REFERENCES "Requisition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

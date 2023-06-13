-- CreateTable
CREATE TABLE "SchedulerGoogleAuth" (
    "id" SERIAL NOT NULL,
    "customerID" INTEGER NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SchedulerGoogleAuth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SchedulerGoogleAuth_customerID_key" ON "SchedulerGoogleAuth"("customerID");

-- CreateIndex
CREATE INDEX "SchedulerGoogleAuth_customerID_idx" ON "SchedulerGoogleAuth"("customerID");

-- CreateIndex
CREATE INDEX "RequiredOAuth_customerProductID_idx" ON "RequiredOAuth"("customerProductID");

-- AddForeignKey
ALTER TABLE "SchedulerGoogleAuth" ADD CONSTRAINT "SchedulerGoogleAuth_customerID_fkey" FOREIGN KEY ("customerID") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

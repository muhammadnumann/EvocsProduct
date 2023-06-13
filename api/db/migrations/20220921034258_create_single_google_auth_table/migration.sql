-- CreateTable
CREATE TABLE "GoogleAuth" (
    "id" SERIAL NOT NULL,
    "customerID" INTEGER NOT NULL,
    "customerProductID" INTEGER NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GoogleAuth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GoogleAuth_customerID_key" ON "GoogleAuth"("customerID");

-- CreateIndex
CREATE INDEX "GoogleAuth_customerID_idx" ON "GoogleAuth" USING HASH ("customerID");

-- CreateIndex
CREATE UNIQUE INDEX "GoogleAuth_customerID_customerProductID_key" ON "GoogleAuth"("customerID", "customerProductID");

-- AddForeignKey
ALTER TABLE "GoogleAuth" ADD CONSTRAINT "GoogleAuth_customerID_fkey" FOREIGN KEY ("customerID") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoogleAuth" ADD CONSTRAINT "GoogleAuth_customerProductID_fkey" FOREIGN KEY ("customerProductID") REFERENCES "CustomerProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

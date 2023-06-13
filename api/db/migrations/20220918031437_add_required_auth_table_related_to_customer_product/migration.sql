-- CreateTable
CREATE TABLE "RequiredOAuth" (
    "id" SERIAL NOT NULL,
    "customerProductID" INTEGER NOT NULL,
    "google" BOOLEAN NOT NULL,
    "azureAD" BOOLEAN NOT NULL,
    "adFS" BOOLEAN NOT NULL,
    "ping" BOOLEAN NOT NULL,
    "adLDAP" BOOLEAN NOT NULL,

    CONSTRAINT "RequiredOAuth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RequiredOAuth_customerProductID_key" ON "RequiredOAuth"("customerProductID");

-- AddForeignKey
ALTER TABLE "RequiredOAuth" ADD CONSTRAINT "RequiredOAuth_customerProductID_fkey" FOREIGN KEY ("customerProductID") REFERENCES "CustomerProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

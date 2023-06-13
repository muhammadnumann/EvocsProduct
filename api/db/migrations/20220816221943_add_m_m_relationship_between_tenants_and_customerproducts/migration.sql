-- CreateTable
CREATE TABLE "_CustomerProductToCustomerTenant" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CustomerProductToCustomerTenant_AB_unique" ON "_CustomerProductToCustomerTenant"("A", "B");

-- CreateIndex
CREATE INDEX "_CustomerProductToCustomerTenant_B_index" ON "_CustomerProductToCustomerTenant"("B");

-- AddForeignKey
ALTER TABLE "_CustomerProductToCustomerTenant" ADD CONSTRAINT "_CustomerProductToCustomerTenant_A_fkey" FOREIGN KEY ("A") REFERENCES "CustomerProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerProductToCustomerTenant" ADD CONSTRAINT "_CustomerProductToCustomerTenant_B_fkey" FOREIGN KEY ("B") REFERENCES "CustomerTenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requisition" ADD CONSTRAINT "Requisition_owningCustomerID_fkey" FOREIGN KEY ("owningCustomerID") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

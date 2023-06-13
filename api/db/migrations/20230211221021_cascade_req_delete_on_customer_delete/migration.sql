-- DropForeignKey
ALTER TABLE "Requisition" DROP CONSTRAINT "Requisition_owningCustomerID_fkey";

-- AddForeignKey
ALTER TABLE "Requisition" ADD CONSTRAINT "Requisition_owningCustomerID_fkey" FOREIGN KEY ("owningCustomerID") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

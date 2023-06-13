-- AddForeignKey
ALTER TABLE "Requisition" ADD CONSTRAINT "Requisition_owningUserID_fkey" FOREIGN KEY ("owningUserID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateIndex
CREATE INDEX "transactions_created_at_ref_id_user_updated_at_idx" ON "transactions"("created_at", "ref_id_user", "updated_at");

-- CreateIndex
CREATE INDEX "transactions_created_at_ref_id_user_idx" ON "transactions"("created_at", "ref_id_user");

-- CreateIndex
CREATE INDEX "transactions_created_at_idx" ON "transactions"("created_at");

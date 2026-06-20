-- CreateTable
CREATE TABLE "initial_salary" (
    "ref_id_user" UUID NOT NULL,
    "ref_id_transaction" TEXT NOT NULL,
    "salary_income" INTEGER NOT NULL,
    "salary_remaining" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "initial_salary_ref_id_transaction_key" ON "initial_salary"("ref_id_transaction");

-- AddForeignKey
ALTER TABLE "initial_salary" ADD CONSTRAINT "initial_salary_ref_id_user_fkey" FOREIGN KEY ("ref_id_user") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "initial_salary" ADD CONSTRAINT "initial_salary_ref_id_transaction_fkey" FOREIGN KEY ("ref_id_transaction") REFERENCES "transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

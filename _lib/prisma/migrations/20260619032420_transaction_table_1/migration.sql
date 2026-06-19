-- CreateTable
CREATE TABLE "transactions" (
    "ref_id" UUID NOT NULL,
    "id" TEXT NOT NULL,
    "name_transaction" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "value_transaction" (
    "ref_id" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "image" TEXT,
    "information" VARCHAR(255),
    "nominal" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3)
);

-- CreateIndex
CREATE UNIQUE INDEX "transactions_id_key" ON "transactions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "value_transaction_id_key" ON "value_transaction"("id");

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_ref_id_fkey" FOREIGN KEY ("ref_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "value_transaction" ADD CONSTRAINT "value_transaction_ref_id_fkey" FOREIGN KEY ("ref_id") REFERENCES "transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "TransactionModel" AS ENUM ('INCOME', 'NORMAL');

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "transaction_model" "TransactionModel" NOT NULL DEFAULT 'NORMAL';

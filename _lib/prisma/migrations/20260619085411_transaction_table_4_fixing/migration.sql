-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "created_at" DROP DEFAULT,
ALTER COLUMN "created_at" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "value_transaction" ALTER COLUMN "created_at" DROP DEFAULT,
ALTER COLUMN "created_at" SET DATA TYPE DATE,
ALTER COLUMN "updated_at" SET DATA TYPE DATE;

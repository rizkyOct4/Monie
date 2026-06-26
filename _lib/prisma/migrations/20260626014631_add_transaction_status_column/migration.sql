-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('AVAILABLE', 'DELETED');

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "status" "TransactionStatus" NOT NULL DEFAULT 'AVAILABLE';

-- DropEnum
DROP TYPE "TransactionType";

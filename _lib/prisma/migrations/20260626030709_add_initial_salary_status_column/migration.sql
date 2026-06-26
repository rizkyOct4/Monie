-- CreateEnum
CREATE TYPE "IdStatus" AS ENUM ('ACTIVE', 'FINISH');

-- AlterTable
ALTER TABLE "initial_salary" ADD COLUMN     "status" "IdStatus" NOT NULL DEFAULT 'ACTIVE';

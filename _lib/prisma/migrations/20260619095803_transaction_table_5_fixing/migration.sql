/*
  Warnings:

  - You are about to drop the column `id` on the `value_transaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ref_id]` on the table `value_transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "value_transaction_images" DROP CONSTRAINT "value_transaction_images_ref_id_fkey";

-- DropIndex
DROP INDEX "value_transaction_id_key";

-- AlterTable
ALTER TABLE "value_transaction" DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "value_transaction_ref_id_key" ON "value_transaction"("ref_id");

-- AddForeignKey
ALTER TABLE "value_transaction_images" ADD CONSTRAINT "value_transaction_images_ref_id_fkey" FOREIGN KEY ("ref_id") REFERENCES "value_transaction"("ref_id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - The primary key for the `value_transaction_images` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `value_transaction_images` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `value_transaction_images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "value_transaction_images" DROP CONSTRAINT "value_transaction_images_pkey",
ADD COLUMN     "id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "value_transaction_images_id_key" ON "value_transaction_images"("id");

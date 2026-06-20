/*
  Warnings:

  - You are about to drop the `value_transaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `value_transaction_images` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `nominal` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "value_transaction" DROP CONSTRAINT "value_transaction_ref_id_fkey";

-- DropForeignKey
ALTER TABLE "value_transaction_images" DROP CONSTRAINT "value_transaction_images_ref_id_fkey";

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "information" VARCHAR(255),
ADD COLUMN     "nominal" INTEGER NOT NULL,
ADD COLUMN     "updated_at" DATE;

-- DropTable
DROP TABLE "value_transaction";

-- DropTable
DROP TABLE "value_transaction_images";

-- CreateTable
CREATE TABLE "transaction_images" (
    "ref_id" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "image_id" TEXT NOT NULL,
    "image_name" TEXT NOT NULL,
    "image_url" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "transaction_images_id_key" ON "transaction_images"("id");

-- AddForeignKey
ALTER TABLE "transaction_images" ADD CONSTRAINT "transaction_images_ref_id_fkey" FOREIGN KEY ("ref_id") REFERENCES "transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

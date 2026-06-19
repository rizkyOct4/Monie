/*
  Warnings:

  - You are about to drop the column `image_id` on the `value_transaction` table. All the data in the column will be lost.
  - You are about to drop the column `image_name` on the `value_transaction` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `value_transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "value_transaction" DROP COLUMN "image_id",
DROP COLUMN "image_name",
DROP COLUMN "image_url";

-- CreateTable
CREATE TABLE "value_transaction_images" (
    "ref_id" TEXT NOT NULL,
    "image_id" TEXT NOT NULL,
    "image_name" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "value_transaction_images_pkey" PRIMARY KEY ("image_id")
);

-- AddForeignKey
ALTER TABLE "value_transaction_images" ADD CONSTRAINT "value_transaction_images_ref_id_fkey" FOREIGN KEY ("ref_id") REFERENCES "value_transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

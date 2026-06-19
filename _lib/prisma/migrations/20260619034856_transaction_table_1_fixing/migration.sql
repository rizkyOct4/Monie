/*
  Warnings:

  - You are about to drop the column `image` on the `value_transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "value_transaction" DROP COLUMN "image",
ADD COLUMN     "image_id" TEXT,
ADD COLUMN     "image_name" TEXT,
ADD COLUMN     "image_url" TEXT;

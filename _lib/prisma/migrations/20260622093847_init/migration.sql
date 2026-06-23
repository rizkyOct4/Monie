-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('REGULAR', 'PREMIUM');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('INCOME', 'EXPENSE');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "public_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" VARCHAR(255),
    "user_type" "UserType" NOT NULL DEFAULT 'REGULAR',
    "image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "balance" BIGINT NOT NULL DEFAULT 0,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "initial_salary" (
    "ref_id_user" UUID NOT NULL,
    "id" TEXT NOT NULL,
    "initial_name" VARCHAR(255) NOT NULL,
    "salary_income" INTEGER NOT NULL,
    "salary_remaining" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "initial_salary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "ref_id_user" UUID NOT NULL,
    "ref_id" TEXT NOT NULL,
    "name_transaction" VARCHAR(255) NOT NULL,
    "information" VARCHAR(255),
    "nominal" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction_images" (
    "ref_id" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "image_id" TEXT NOT NULL,
    "image_name" TEXT NOT NULL,
    "image_url" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_public_id_key" ON "users"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_id_key" ON "accounts"("id");

-- CreateIndex
CREATE INDEX "accounts_user_id_idx" ON "accounts"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "transaction_images_id_key" ON "transaction_images"("id");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "initial_salary" ADD CONSTRAINT "initial_salary_ref_id_user_fkey" FOREIGN KEY ("ref_id_user") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_ref_id_user_fkey" FOREIGN KEY ("ref_id_user") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_ref_id_fkey" FOREIGN KEY ("ref_id") REFERENCES "initial_salary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_images" ADD CONSTRAINT "transaction_images_ref_id_fkey" FOREIGN KEY ("ref_id") REFERENCES "transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - A unique constraint covering the columns `[trendeingScore]` on the table `posts` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "trendeingScore" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "posts_trendeingScore_key" ON "posts"("trendeingScore");

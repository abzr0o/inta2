/*
  Warnings:

  - A unique constraint covering the columns `[datepost]` on the table `likes` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "likes" ALTER COLUMN "datepost" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "datepost" SET DATA TYPE TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "likes_datepost_key" ON "likes"("datepost");

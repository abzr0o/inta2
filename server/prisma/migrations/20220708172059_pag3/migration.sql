/*
  Warnings:

  - A unique constraint covering the columns `[datepost]` on the table `comments` will be added. If there are existing duplicate values, this will fail.
  - Made the column `datepost` on table `comments` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "datepost" SET NOT NULL,
ALTER COLUMN "datepost" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "datepost" SET DATA TYPE TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "comments_datepost_key" ON "comments"("datepost");

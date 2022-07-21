/*
  Warnings:

  - You are about to drop the column `src` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "src",
ADD COLUMN     "imgsId" INTEGER,
ALTER COLUMN "body" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_imgsId_fkey" FOREIGN KEY ("imgsId") REFERENCES "imgs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

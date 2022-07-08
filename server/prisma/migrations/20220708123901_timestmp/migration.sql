-- DropIndex
DROP INDEX "posts_datepost_key";

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "cratedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

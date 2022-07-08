/*
  Warnings:

  - Added the required column `type` to the `imgs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "imgs" ADD COLUMN     "type" TEXT NOT NULL;

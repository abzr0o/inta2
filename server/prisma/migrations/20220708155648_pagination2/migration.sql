/*
  Warnings:

  - A unique constraint covering the columns `[Date]` on the table `Activity` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Activity_Date_key" ON "Activity"("Date");

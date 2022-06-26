/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profile" ADD COLUMN     "username" VARCHAR(30) NOT NULL;

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "msg" TEXT,
    "profileid" INTEGER,
    "postid" INTEGER,
    "datepost" DATE,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likes" (
    "id" SERIAL NOT NULL,
    "profileid" INTEGER,
    "postid" INTEGER,
    "datepost" DATE,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "src" VARCHAR(200) NOT NULL,
    "profileid" INTEGER,
    "datepost" DATE,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_username_key" ON "profile"("username");

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_profileid_fkey" FOREIGN KEY ("profileid") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_postid_fkey" FOREIGN KEY ("postid") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_profileid_fkey" FOREIGN KEY ("profileid") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_postid_fkey" FOREIGN KEY ("postid") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_profileid_fkey" FOREIGN KEY ("profileid") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

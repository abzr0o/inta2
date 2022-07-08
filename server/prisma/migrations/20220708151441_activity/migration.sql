-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_postid_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_profileid_fkey";

-- DropForeignKey
ALTER TABLE "follow" DROP CONSTRAINT "follow_followerid_fkey";

-- DropForeignKey
ALTER TABLE "follow" DROP CONSTRAINT "follow_userid_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_postid_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_profileid_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_profileid_fkey";

-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "profile_userid_fkey";

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "trendeingScore" INTEGER NOT NULL DEFAULT 10;

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "profileID" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    "Date" DATE NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_followerid_fkey" FOREIGN KEY ("followerid") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_userid_fkey" FOREIGN KEY ("userid") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_profileid_fkey" FOREIGN KEY ("profileid") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_postid_fkey" FOREIGN KEY ("postid") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_profileid_fkey" FOREIGN KEY ("profileid") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_postid_fkey" FOREIGN KEY ("postid") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_profileid_fkey" FOREIGN KEY ("profileid") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_profileID_fkey" FOREIGN KEY ("profileID") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

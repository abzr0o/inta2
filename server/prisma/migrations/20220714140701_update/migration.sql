-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_profileid_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_profileid_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_profileid_fkey";

-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "profile_userid_fkey";

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_profileid_fkey" FOREIGN KEY ("profileid") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_profileid_fkey" FOREIGN KEY ("profileid") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_profileid_fkey" FOREIGN KEY ("profileid") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

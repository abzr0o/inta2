-- DropForeignKey
ALTER TABLE "follow" DROP CONSTRAINT "follow_followerid_fkey";

-- DropForeignKey
ALTER TABLE "follow" DROP CONSTRAINT "follow_userid_fkey";

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_followerid_fkey" FOREIGN KEY ("followerid") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_userid_fkey" FOREIGN KEY ("userid") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

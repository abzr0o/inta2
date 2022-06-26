-- CreateIndex
CREATE INDEX "comments_postid_idx" ON "comments"("postid");

-- CreateIndex
CREATE INDEX "likes_postid_idx" ON "likes"("postid");

-- CreateIndex
CREATE INDEX "posts_profileid_idx" ON "posts"("profileid");

-- CreateIndex
CREATE INDEX "profile_userid_idx" ON "profile"("userid");

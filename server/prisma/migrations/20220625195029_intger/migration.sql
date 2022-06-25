-- CreateTable
CREATE TABLE "follow" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER,
    "followerid" INTEGER,
    "followdate" DATE,

    CONSTRAINT "follow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER,
    "bio" TEXT,
    "imgurl" VARCHAR(200),

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "password" VARCHAR(120) NOT NULL,
    "email" VARCHAR(80) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_userid_key" ON "profile"("userid");

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_followerid_fkey" FOREIGN KEY ("followerid") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

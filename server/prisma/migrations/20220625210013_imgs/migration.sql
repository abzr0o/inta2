-- CreateTable
CREATE TABLE "imgs" (
    "id" SERIAL NOT NULL,
    "imgurl" TEXT NOT NULL,

    CONSTRAINT "imgs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "imgs_imgurl_key" ON "imgs"("imgurl");

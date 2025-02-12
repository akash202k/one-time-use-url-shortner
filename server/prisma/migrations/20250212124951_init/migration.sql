-- CreateTable
CREATE TABLE "urls" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "short_url" TEXT NOT NULL,

    CONSTRAINT "urls_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "urls_url_key" ON "urls"("url");

-- CreateIndex
CREATE UNIQUE INDEX "urls_short_url_key" ON "urls"("short_url");

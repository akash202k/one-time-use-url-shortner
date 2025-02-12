/*
  Warnings:

  - You are about to drop the column `url` on the `urls` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[longurl]` on the table `urls` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `longurl` to the `urls` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "urls_url_key";

-- AlterTable
ALTER TABLE "urls" DROP COLUMN "url",
ADD COLUMN     "longurl" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "urls_longurl_key" ON "urls"("longurl");

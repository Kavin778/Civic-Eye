/*
  Warnings:

  - You are about to drop the `Confirmation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Dispute` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `beforeImage` on table `Report` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "VoteType" AS ENUM ('upvote', 'downvote');

-- DropForeignKey
ALTER TABLE "Confirmation" DROP CONSTRAINT "Confirmation_reportId_fkey";

-- DropForeignKey
ALTER TABLE "Confirmation" DROP CONSTRAINT "Confirmation_userId_fkey";

-- DropForeignKey
ALTER TABLE "Dispute" DROP CONSTRAINT "Dispute_reportId_fkey";

-- DropForeignKey
ALTER TABLE "Dispute" DROP CONSTRAINT "Dispute_userId_fkey";

-- AlterTable
ALTER TABLE "Report" ALTER COLUMN "beforeImage" SET NOT NULL;

-- DropTable
DROP TABLE "Confirmation";

-- DropTable
DROP TABLE "Dispute";

-- CreateTable
CREATE TABLE "Votes" (
    "id" TEXT NOT NULL,
    "type" "VoteType" NOT NULL,
    "userId" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,

    CONSTRAINT "Votes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ipAddress" TEXT,
    "replacedBy" TEXT,
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Votes_reportId_userId_key" ON "Votes"("reportId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_token_key" ON "Session"("token");

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

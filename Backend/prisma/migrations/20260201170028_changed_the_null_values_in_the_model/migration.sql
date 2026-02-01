-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('open', 'in_progress', 'resolved', 'closed');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" "ReportStatus" NOT NULL DEFAULT 'open',
    "isMocked" BOOLEAN NOT NULL DEFAULT false,
    "accuracy" DOUBLE PRECISION,
    "userConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "remarks" TEXT[],
    "streetName" TEXT,
    "streetNumber" TEXT,
    "city" TEXT,
    "region" TEXT,
    "isoCountryCode" TEXT,
    "postalCode" TEXT,
    "formattedAddress" TEXT,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longtitude" DOUBLE PRECISION NOT NULL,
    "beforeImage" TEXT,
    "afterImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Confirmation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,

    CONSTRAINT "Confirmation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dispute" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,

    CONSTRAINT "Dispute_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Confirmation_reportId_userId_key" ON "Confirmation"("reportId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Dispute_reportId_userId_key" ON "Dispute"("reportId", "userId");

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Confirmation" ADD CONSTRAINT "Confirmation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Confirmation" ADD CONSTRAINT "Confirmation_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dispute" ADD CONSTRAINT "Dispute_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dispute" ADD CONSTRAINT "Dispute_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

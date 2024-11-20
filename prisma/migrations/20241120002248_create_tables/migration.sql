-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('GENERIC', 'FEDERAL', 'ESTADUAL', 'MUNICIPAL', 'DIVERSOS');

-- CreateTable
CREATE TABLE "attachments" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "type" "FileType" NOT NULL DEFAULT 'GENERIC',
    "url" TEXT NOT NULL,
    "tag" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "attachments_pkey" PRIMARY KEY ("id")
);

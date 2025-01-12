-- AlterTable
ALTER TABLE "announcements" ADD COLUMN     "pin" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "pin" BOOLEAN DEFAULT false;

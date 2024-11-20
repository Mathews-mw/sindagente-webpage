/*
  Warnings:

  - A unique constraint covering the columns `[file_name]` on the table `attachments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "attachments_file_name_key" ON "attachments"("file_name");

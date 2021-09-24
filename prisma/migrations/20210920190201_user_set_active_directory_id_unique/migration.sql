/*
  Warnings:

  - A unique constraint covering the columns `[activeDirectoryId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
CREATE UNIQUE INDEX [User_activeDirectoryId_key] ON [dbo].[User]([activeDirectoryId]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

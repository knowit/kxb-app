/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `JobOffer` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[JobOffer] ADD [uuid] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [JobOffer_uuid_df] DEFAULT NEWID();

-- CreateIndex
CREATE UNIQUE INDEX [JobOffer_uuid_key] ON [dbo].[JobOffer]([uuid]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

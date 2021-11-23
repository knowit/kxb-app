/*
  Warnings:

  - You are about to alter the column `date` on the `UserFeedback` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `DateTime2`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[UserFeedback] ALTER COLUMN [date] DATETIME2 NOT NULL;
ALTER TABLE [dbo].[UserFeedback] ADD CONSTRAINT [UserFeedback_date_df] DEFAULT CURRENT_TIMESTAMP FOR [date];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[User] ADD [workHours] DECIMAL(5,2) NOT NULL CONSTRAINT [User_workHours_df] DEFAULT 7.5;

-- AlterTable
ALTER TABLE [dbo].[UserWorkDayDetail] DROP CONSTRAINT [UserWorkDayDetail_sickDays_df];
ALTER TABLE [dbo].[UserWorkDayDetail] ADD CONSTRAINT [UserWorkDayDetail_sickDay_df] DEFAULT 0 FOR [sickDay];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

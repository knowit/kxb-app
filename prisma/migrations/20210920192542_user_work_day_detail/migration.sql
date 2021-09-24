BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[UserWorkDayDetail] (
    [id] INT NOT NULL IDENTITY(1,1),
    [date] NVARCHAR(1000) NOT NULL,
    [nonCommissionedHours] DECIMAL(5,2) NOT NULL CONSTRAINT [UserWorkDayDetail_nonCommissionedHours_df] DEFAULT 0,
    [extraHours] DECIMAL(5,2) NOT NULL CONSTRAINT [UserWorkDayDetail_extraHours_df] DEFAULT 0,
    [userId] INT NOT NULL,
    CONSTRAINT [UserWorkDayDetail_pkey] PRIMARY KEY ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[UserWorkDayDetail] ADD CONSTRAINT [UserWorkDayDetail_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

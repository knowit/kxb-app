BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[UserFeedback] (
    [id] INT NOT NULL IDENTITY(1,1),
    [date] NVARCHAR(1000) NOT NULL,
    [userId] INT NOT NULL,
    [feedback] NVARCHAR(2000) NOT NULL,
    [reaction] INT NOT NULL,
    CONSTRAINT [UserFeedback_pkey] PRIMARY KEY ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[UserFeedback] ADD CONSTRAINT [UserFeedback_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

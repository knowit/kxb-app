BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[JobOffer] (
    [id] INT NOT NULL IDENTITY(1,1),
    [created] DATETIME2 NOT NULL CONSTRAINT [JobOffer_created_df] DEFAULT CURRENT_TIMESTAMP,
    [updated] DATETIME2 NOT NULL CONSTRAINT [JobOffer_updated_df] DEFAULT CURRENT_TIMESTAMP,
    [sent] BIT NOT NULL CONSTRAINT [JobOffer_sent_df] DEFAULT 0,
    [firstName] NVARCHAR(1000) NOT NULL,
    [lastName] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [phone] NVARCHAR(1000) NOT NULL,
    [hourlyRate] INT NOT NULL CONSTRAINT [JobOffer_hourlyRate_df] DEFAULT 1200,
    [commission] DECIMAL(5,2) NOT NULL CONSTRAINT [JobOffer_commission_df] DEFAULT 0.40,
    CONSTRAINT [JobOffer_pkey] PRIMARY KEY ([id]),
    CONSTRAINT [JobOffer_email_key] UNIQUE ([email])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

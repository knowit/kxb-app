BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [email] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000),
    [activeDirectoryId] NVARCHAR(1000) NOT NULL,
    [refreshToken] NVARCHAR(1000) NOT NULL,
    [hourlyRate] INT NOT NULL CONSTRAINT [User_hourlyRate_df] DEFAULT 1000,
    [commission] DECIMAL(5,2) NOT NULL CONSTRAINT [User_commission_df] DEFAULT 0.40,
    [tax] DECIMAL(5,2) NOT NULL CONSTRAINT [User_tax_df] DEFAULT 0.35,
    [created] DATETIME2 NOT NULL CONSTRAINT [User_created_df] DEFAULT CURRENT_TIMESTAMP,
    [updated] DATETIME2 NOT NULL CONSTRAINT [User_updated_df] DEFAULT CURRENT_TIMESTAMP,
    [isAdmin] BIT NOT NULL CONSTRAINT [User_isAdmin_df] DEFAULT 0,
    [isSpecialist] BIT NOT NULL CONSTRAINT [User_isSpecialist_df] DEFAULT 0,
    CONSTRAINT [User_pkey] PRIMARY KEY ([id]),
    CONSTRAINT [User_email_key] UNIQUE ([email])
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

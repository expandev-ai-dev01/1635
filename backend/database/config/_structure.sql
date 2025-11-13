/**
 * @schema config
 * Contains system-wide configuration, settings, and utility objects.
 */
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'config')
BEGIN
    EXEC('CREATE SCHEMA config');
END
GO

-- Placeholder for configuration tables.
-- Example:
/*
CREATE TABLE [config].[settings] (
  [idSetting] INT IDENTITY(1,1) NOT NULL,
  [key] NVARCHAR(100) NOT NULL,
  [value] NVARCHAR(MAX) NOT NULL,
  [description] NVARCHAR(500) NULL
);

ALTER TABLE [config].[settings]
ADD CONSTRAINT [pkSettings] PRIMARY KEY CLUSTERED ([idSetting]);

CREATE UNIQUE NONCLUSTERED INDEX [uqSettings_Key]
ON [config].[settings]([key]);
*/
